import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { z } from 'zod'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(3, 'Subject must be at least 3 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    
    // Validate input
    const validatedData = contactSchema.parse(body)

    // 1. Save to Supabase
    console.log('Attempting to save to Supabase...')
    const { data: supabaseData, error: supabaseError } = await supabase
      .from('contact_leads')
      .insert([
        {
          name: validatedData.name,
          email: validatedData.email,
          subject: validatedData.subject,
          message: validatedData.message,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (supabaseError) {
      console.error('Supabase error details:', {
        message: supabaseError.message,
        details: supabaseError.details,
        hint: supabaseError.hint,
        code: supabaseError.code,
      })
      return NextResponse.json(
        {
          success: false,
          message: 'Failed to save message to database',
          error: supabaseError.message,
          details: supabaseError.details,
        },
        { status: 500 }
      )
    }
    
    console.log('Supabase save successful!', supabaseData)

    // 2. Send email notification using Resend
    try {
      const emailData = await resend.emails.send({
        from: process.env.EMAIL_FROM || 'noreply@yourdomain.com',
        to: process.env.EMAIL_TO || 'your-email@example.com',
        subject: `Portfolio Contact: ${validatedData.subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">New Contact Form Message</h2>
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Subject:</strong> ${validatedData.subject}</p>
              <hr style="border: 1px solid #d1d5db; margin: 15px 0;" />
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap;">${validatedData.message}</p>
            </div>
            <p style="color: #6b7280; font-size: 12px;">
              This email was sent from your portfolio contact form.
            </p>
          </div>
        `,
      })

      console.log('Email sent successfully:', emailData)
    } catch (emailError) {
      console.error('Email error:', emailError)
      // Don't throw error here - message is saved to DB, email is secondary
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully',
        data: supabaseData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Contact form error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace')

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
        errorType: error instanceof Error ? error.constructor.name : typeof error,
      },
      { status: 500 }
    )
  }
}


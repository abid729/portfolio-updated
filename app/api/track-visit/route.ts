import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Get location from IP using multiple free services with fallbacks
async function getLocationFromIP(ip: string) {
  // Handle localhost
  if (ip === 'unknown' || ip.startsWith('127.') || ip.startsWith('192.168.') || ip === '::1') {
    return { country: 'Local', city: 'Localhost' }
  }

  // Try multiple services (fallback chain)
  const services = [
    // Service 1: ip-api.com (free, no key needed, 45 req/min)
    async () => {
      const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`)
      const data = await response.json()
      if (data.status === 'success') {
        return { country: data.country, city: data.city }
      }
      throw new Error('ip-api failed')
    },
    
    // Service 2: ipapi.co (free, 1000 req/day)
    async () => {
      const response = await fetch(`https://ipapi.co/${ip}/json/`)
      const data = await response.json()
      return { country: data.country_name, city: data.city }
    },
    
    // Service 3: ipwhois.app (free, unlimited)
    async () => {
      const response = await fetch(`https://ipwho.is/${ip}`)
      const data = await response.json()
      if (data.success) {
        return { country: data.country, city: data.city }
      }
      throw new Error('ipwhois failed')
    },
  ]

  // Try each service
  for (const service of services) {
    try {
      const location = await service()
      if (location.country && location.city) {
        return location
      }
    } catch (error) {
      continue // Try next service
    }
  }

  // All services failed
  console.warn(`Could not detect location for IP: ${ip}`)
  return { country: null, city: null }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Get IP address from headers
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const ip = forwarded ? forwarded.split(',')[0].trim() : realIp || 'unknown'
    const normalizedIp = (ip === '::1' || ip === '0:0:0:0:0:0:0:1') ? '127.0.0.1' : ip

    // Check if this session already logged today (prevent duplicates)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
   const { data: existingLogs, error: checkError } = await supabase
  .from('visitor_logs')
  .select('id, visited_at')
  .eq('session_id', body.sessionId)
  .gte('visited_at', today.toISOString())
  .limit(1)

if (checkError) {
  console.error('Error checking existing log:', checkError)
}

if (existingLogs && existingLogs.length > 0) {
  return NextResponse.json(
    { 
      success: true, 
      message: 'Already logged today',
      data: existingLogs[0] 
    },
    { status: 200 }
  )
}
    
    // Get location from IP (server-side)
    const location = await getLocationFromIP(ip)
    
    // Save new visitor data
    const { data, error } = await supabase
      .from('visitor_logs')
      .insert([
        {
          session_id: body.sessionId,
          ip_address: normalizedIp,
          user_agent: body.userAgent,
          country: location.country,
          city: location.city,
          device_type: body.deviceType,
          browser: body.browser,
          os: body.os,
          referrer: body.referrer,
          landing_page: body.landingPage,
          screen_resolution: body.screenResolution,
          language: body.language,
          timezone: body.timezone,
          visited_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Error saving visitor log:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, data, message: 'New visit logged' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Track visit error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}


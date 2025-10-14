import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  try {
    // Fetch all visitor logs
    const { data: visitors, error } = await supabase
      .from('visitor_logs')
      .select('*')
      .order('visited_at', { ascending: false })

    if (error) {
      throw error
    }

    // Calculate statistics
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

    const stats = {
      total_visits: visitors.length,
      unique_visitors: new Set(visitors.map(v => v.session_id)).size,
      today_visits: visitors.filter(v => new Date(v.visited_at) >= today).length,
      week_visits: visitors.filter(v => new Date(v.visited_at) >= weekAgo).length,
      month_visits: visitors.filter(v => new Date(v.visited_at) >= monthAgo).length,
      countries: [...new Set(visitors.map(v => v.country).filter(Boolean))],
      devices: {
        mobile: visitors.filter(v => v.device_type === 'mobile').length,
        desktop: visitors.filter(v => v.device_type === 'desktop').length,
        tablet: visitors.filter(v => v.device_type === 'tablet').length,
      },
      browsers: visitors.reduce((acc: any, v) => {
        acc[v.browser] = (acc[v.browser] || 0) + 1
        return acc
      }, {}),
      topReferrers: [...new Set(visitors.map(v => v.referrer).filter(Boolean))].slice(0, 10),
    }

    return NextResponse.json({
      success: true,
      stats,
    })
  } catch (error) {
    console.error('Error fetching visitor stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}


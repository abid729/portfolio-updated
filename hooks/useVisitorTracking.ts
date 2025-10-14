'use client'

import { useEffect } from 'react'

// Generate unique session ID
const getSessionId = () => {
  const key = 'portfolio_session_id'
  let sessionId = sessionStorage.getItem(key)
  
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    sessionStorage.setItem(key, sessionId)
  }
  
  return sessionId
}

// Detect device type
const getDeviceType = () => {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

// Detect browser
const getBrowser = () => {
  const ua = navigator.userAgent
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  if (ua.includes('Edge')) return 'Edge'
  if (ua.includes('Opera')) return 'Opera'
  return 'Unknown'
}

// Detect OS
const getOS = () => {
  const ua = navigator.userAgent
  if (ua.includes('Win')) return 'Windows'
  if (ua.includes('Mac')) return 'MacOS'
  if (ua.includes('Linux')) return 'Linux'
  if (ua.includes('Android')) return 'Android'
  if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS'
  return 'Unknown'
}

export default function useVisitorTracking() {
  useEffect(() => {
    // Track visit on mount
    const trackVisit = async () => {
      try {
        const visitorData = {
          sessionId: getSessionId(),
          userAgent: navigator.userAgent,
          deviceType: getDeviceType(),
          browser: getBrowser(),
          os: getOS(),
          referrer: document.referrer || 'direct',
          landingPage: window.location.pathname,
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          // country & city will be detected from IP on server-side
        }

        await fetch('/api/track-visit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(visitorData),
        })
      } catch (error) {
        console.error('Error tracking visit:', error)
      }
    }

    // Track after 2 seconds (avoid blocking initial render)
    const timer = setTimeout(trackVisit, 2000)

    return () => clearTimeout(timer)
  }, [])
}


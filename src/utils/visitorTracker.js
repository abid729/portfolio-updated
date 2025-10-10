/**
 * Visitor Tracking Utility
 * Automatically tracks visitor data when they visit the website
 * 
 * زائرین کی معلومات automatically track کرتا ہے
 */

/**
 * Get visitor's browser and system information
 */
const getVisitorInfo = () => {
  const nav = navigator;
  const screen = window.screen;
  
  return {
    pageUrl: window.location.href,
    referrer: document.referrer || 'Direct',
    screenResolution: `${screen.width}x${screen.height}`,
    language: nav.language || nav.userLanguage,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    userAgent: nav.userAgent,
    sessionId: getSessionId()
  };
};

/**
 * Generate or retrieve session ID from localStorage
 */
const getSessionId = () => {
  const storageKey = 'visitor_session_id';
  let sessionId = localStorage.getItem(storageKey);
  
  if (!sessionId) {
    // Generate new session ID
    sessionId = generateUniqueId();
    localStorage.setItem(storageKey, sessionId);
  }
  
  return sessionId;
};

/**
 * Generate unique ID
 */
const generateUniqueId = () => {
  return 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

/**
 * Check if visit was already tracked recently
 */
const isRecentlyTracked = () => {
  const lastTracked = localStorage.getItem('last_visit_tracked');
  
  if (!lastTracked) return false;
  
  const lastTrackedTime = new Date(lastTracked);
  const now = new Date();
  const diffInHours = (now - lastTrackedTime) / (1000 * 60 * 60);
  
  // Return true if tracked within last 2 hours
  return diffInHours < 2;
};

/**
 * Mark visit as tracked
 */
const markAsTracked = () => {
  localStorage.setItem('last_visit_tracked', new Date().toISOString());
};

/**
 * Track visitor - send data to backend
 */
export const trackVisitor = async () => {
  try {
    // Check if already tracked recently (prevent duplicates)
    if (isRecentlyTracked()) {
      console.log('Visit already tracked recently');
      return { success: true, duplicate: true };
    }
    
    // Get visitor information
    const visitorInfo = getVisitorInfo();
      console.log('Visitor tracked:', visitorInfo);
    
    // Send to backend API
    const response = await fetch('/api/track-visit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorInfo)
    });
    
    const data = await response.json();
    
    if (data.success && !data.duplicate) {
      console.log('Visitor tracked:', visitorInfo);
      // Mark as tracked to prevent duplicates
      markAsTracked();
      console.log('Visitor tracked successfully:', data);
    }
    
    return data;
    
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Track page view (for SPA navigation)
 */
export const trackPageView = async (url) => {
  try {
    const visitorInfo = {
      ...getVisitorInfo(),
      pageUrl: url || window.location.href
    };
    
    // Only track if more than 5 seconds since last page view
    const lastPageView = localStorage.getItem('last_page_view');
    if (lastPageView) {
      const diff = Date.now() - parseInt(lastPageView);
      if (diff < 5000) return; // Skip if less than 5 seconds
    }
    
    localStorage.setItem('last_page_view', Date.now().toString());
    
    // Note: You might want to create a separate endpoint for page views
    // For now, we'll use the same endpoint
    await fetch('/api/track-visit.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visitorInfo)
    });
    
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Get visitor statistics (optional - if you want to display them)
 */
export const getVisitorStats = async () => {
  try {
    const response = await fetch('/api/get-visitor-stats.php');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return null;
  }
};

export default trackVisitor;


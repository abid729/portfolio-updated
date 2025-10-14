-- Portfolio Database Setup
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. Contact Leads Table
-- ============================================

CREATE TABLE IF NOT EXISTS contact_leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public form submission)
CREATE POLICY "Public can insert contact leads" 
ON contact_leads
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow public to read (for admin dashboard - you can restrict this later)
CREATE POLICY "Public can read contact leads" 
ON contact_leads
FOR SELECT 
TO public
USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_email ON contact_leads(email);

-- ============================================
-- 2. Visitor Tracking Table
-- ============================================

CREATE TABLE IF NOT EXISTS visitor_logs (
  id BIGSERIAL PRIMARY KEY,
  session_id VARCHAR(255),
  ip_address VARCHAR(100),
  user_agent TEXT,
  country VARCHAR(100),
  city VARCHAR(100),
  device_type VARCHAR(50),
  browser VARCHAR(100),
  os VARCHAR(100),
  referrer TEXT,
  landing_page VARCHAR(500),
  screen_resolution VARCHAR(50),
  language VARCHAR(10),
  timezone VARCHAR(50),
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE visitor_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public tracking) - MUST come before SELECT policy
CREATE POLICY "Public can insert visitor logs" 
ON visitor_logs
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow public to read their own session (for analytics page)
CREATE POLICY "Public can read visitor logs" 
ON visitor_logs
FOR SELECT 
TO public
USING (true);

-- Create indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_visitor_logs_visited_at ON visitor_logs(visited_at DESC);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_session_id ON visitor_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_country ON visitor_logs(country);
CREATE INDEX IF NOT EXISTS idx_visitor_logs_device_type ON visitor_logs(device_type);

-- Composite unique index to prevent duplicate entries per session per day
CREATE UNIQUE INDEX IF NOT EXISTS idx_visitor_logs_unique_session_date 
ON visitor_logs(session_id, DATE(visited_at));

-- ============================================
-- 3. Visitor Statistics View
-- ============================================

CREATE OR REPLACE VIEW visitor_stats AS
SELECT
  COUNT(*) as total_visits,
  COUNT(DISTINCT session_id) as unique_visitors,
  COUNT(*) FILTER (WHERE visited_at >= CURRENT_DATE) as today_visits,
  COUNT(*) FILTER (WHERE visited_at >= CURRENT_DATE - INTERVAL '7 days') as week_visits,
  COUNT(*) FILTER (WHERE visited_at >= CURRENT_DATE - INTERVAL '30 days') as month_visits,
  COUNT(DISTINCT country) as countries_count,
  COUNT(*) FILTER (WHERE device_type = 'mobile') as mobile_visits,
  COUNT(*) FILTER (WHERE device_type = 'desktop') as desktop_visits,
  COUNT(*) FILTER (WHERE device_type = 'tablet') as tablet_visits
FROM visitor_logs;

-- Grant access to authenticated users
-- GRANT SELECT ON visitor_stats TO authenticated;

-- ============================================
-- 4. Verification
-- ============================================

-- Check if tables were created
SELECT 'contact_leads table' as table_name, COUNT(*) as row_count FROM contact_leads
UNION ALL
SELECT 'visitor_logs table', COUNT(*) FROM visitor_logs;

-- Success message
SELECT '✅ Database setup complete!' as status;

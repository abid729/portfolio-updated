/**
 * Supabase Database Setup Script
 * 
 * یہ SQL script Supabase میں چلائیں
 * Run this SQL script in Supabase SQL Editor
 * 
 * Dashboard > SQL Editor > New Query > Paste this code > Run
 */

-- ============================================
-- 1. Create contact_leads table
-- ============================================

CREATE TABLE IF NOT EXISTS contact_leads (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'closed')),
  notes TEXT
);

-- ============================================
-- 2. Create indexes for better performance
-- ============================================

-- Index on email for faster email searches
CREATE INDEX IF NOT EXISTS idx_contact_leads_email 
ON contact_leads(email);

-- Index on created_at for faster date-based queries
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at 
ON contact_leads(created_at DESC);

-- Index on status for faster filtering
CREATE INDEX IF NOT EXISTS idx_contact_leads_status 
ON contact_leads(status);

-- Composite index for filtering by status and date
CREATE INDEX IF NOT EXISTS idx_contact_leads_status_date 
ON contact_leads(status, created_at DESC);

-- ============================================
-- 3. Enable Row Level Security (RLS)
-- ============================================

ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (public form submission)
-- کوئی بھی form submit کر سکتا ہے
CREATE POLICY "Anyone can insert contact leads" 
ON contact_leads
FOR INSERT 
WITH CHECK (true);

-- Policy: Only authenticated users can read
-- صرف authenticated users پڑھ سکتے ہیں (admin dashboard)
CREATE POLICY "Authenticated users can read contact leads" 
ON contact_leads
FOR SELECT 
USING (auth.role() = 'authenticated');

-- Policy: Only authenticated users can update
-- صرف authenticated users update کر سکتے ہیں
CREATE POLICY "Authenticated users can update contact leads" 
ON contact_leads
FOR UPDATE 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only authenticated users can delete
-- صرف authenticated users delete کر سکتے ہیں
CREATE POLICY "Authenticated users can delete contact leads" 
ON contact_leads
FOR DELETE 
USING (auth.role() = 'authenticated');

-- ============================================
-- 4. Create function to update updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 5. Create trigger for auto-updating updated_at
-- ============================================

DROP TRIGGER IF EXISTS update_contact_leads_updated_at ON contact_leads;

CREATE TRIGGER update_contact_leads_updated_at
BEFORE UPDATE ON contact_leads
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 6. Create analytics table (optional)
-- ============================================

CREATE TABLE IF NOT EXISTS contact_analytics (
  id BIGSERIAL PRIMARY KEY,
  event_type VARCHAR(50) NOT NULL,
  event_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address VARCHAR(50),
  user_agent TEXT
);

-- Enable RLS for analytics
ALTER TABLE contact_analytics ENABLE ROW LEVEL SECURITY;

-- Anyone can insert analytics events
CREATE POLICY "Anyone can insert analytics" 
ON contact_analytics
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can read analytics
CREATE POLICY "Authenticated users can read analytics" 
ON contact_analytics
FOR SELECT 
USING (auth.role() = 'authenticated');

-- ============================================
-- 7. Create backup table
-- ============================================

CREATE TABLE IF NOT EXISTS contact_leads_backup (
  id BIGINT,
  name VARCHAR(255),
  email VARCHAR(255),
  subject VARCHAR(500),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE,
  ip_address VARCHAR(50),
  user_agent TEXT,
  status VARCHAR(20),
  notes TEXT,
  backup_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 8. Create function for email notifications
-- ============================================

CREATE OR REPLACE FUNCTION notify_new_lead()
RETURNS TRIGGER AS $$
BEGIN
  -- Send notification via pg_notify
  PERFORM pg_notify(
    'new_lead',
    json_build_object(
      'id', NEW.id,
      'name', NEW.name,
      'email', NEW.email,
      'subject', NEW.subject,
      'created_at', NEW.created_at
    )::text
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 9. Create trigger for new lead notifications
-- ============================================

DROP TRIGGER IF EXISTS on_new_contact_lead ON contact_leads;

CREATE TRIGGER on_new_contact_lead
AFTER INSERT ON contact_leads
FOR EACH ROW
EXECUTE FUNCTION notify_new_lead();

-- ============================================
-- 10. Create view for lead statistics
-- ============================================

CREATE OR REPLACE VIEW contact_lead_stats AS
SELECT
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE status = 'new') as new_leads,
  COUNT(*) FILTER (WHERE status = 'contacted') as contacted_leads,
  COUNT(*) FILTER (WHERE status = 'closed') as closed_leads,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE) as today_leads,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '7 days') as week_leads,
  COUNT(*) FILTER (WHERE created_at >= CURRENT_DATE - INTERVAL '30 days') as month_leads
FROM contact_leads;

-- Grant access to authenticated users
GRANT SELECT ON contact_lead_stats TO authenticated;

-- ============================================
-- 11. Insert sample data (for testing - optional)
-- ============================================

-- Uncomment to insert test data
/*
INSERT INTO contact_leads (name, email, subject, message, status) VALUES
('Ahmed Khan', 'ahmed@example.com', 'Website Development', 'I need a website for my business.', 'new'),
('Fatima Ali', 'fatima@example.com', 'Mobile App', 'Looking for mobile app developer.', 'contacted'),
('Hassan Raza', 'hassan@example.com', 'UI/UX Design', 'Need modern UI design for app.', 'new');
*/

-- ============================================
-- 12. Create function to cleanup old leads (optional)
-- ============================================

CREATE OR REPLACE FUNCTION cleanup_old_closed_leads()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  -- Delete closed leads older than 1 year
  WITH deleted AS (
    DELETE FROM contact_leads
    WHERE status = 'closed'
    AND created_at < NOW() - INTERVAL '1 year'
    RETURNING *
  )
  SELECT COUNT(*) INTO deleted_count FROM deleted;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 13. Create scheduled backup (using pg_cron extension)
-- ============================================

-- Note: pg_cron extension must be enabled in Supabase
-- Database > Extensions > Enable pg_cron

-- Uncomment if pg_cron is available
/*
SELECT cron.schedule(
  'daily-contact-backup',
  '0 2 * * *', -- Run at 2 AM daily
  $$
  INSERT INTO contact_leads_backup
  SELECT *, NOW() as backup_date
  FROM contact_leads
  WHERE created_at >= CURRENT_DATE - INTERVAL '1 day';
  $$
);
*/

-- ============================================
-- 14. Verification queries
-- ============================================

-- Check if table was created successfully
SELECT 'contact_leads table created' as status,
       COUNT(*) as row_count
FROM contact_leads;

-- Check indexes
SELECT 
    indexname,
    indexdef
FROM pg_indexes
WHERE tablename = 'contact_leads';

-- Check RLS policies
SELECT 
    policyname,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE tablename = 'contact_leads';

-- ============================================
-- Setup Complete! ✅
-- ============================================

-- Next Steps:
-- 1. Copy your Supabase URL and anon key
-- 2. Add them to .env.local file
-- 3. Install @supabase/supabase-js: npm install @supabase/supabase-js
-- 4. Test the connection
-- 5. Deploy to Vercel!

-- اگلے قدم:
-- 1. اپنا Supabase URL اور anon key copy کریں
-- 2. .env.local file میں add کریں
-- 3. npm install @supabase/supabase-js
-- 4. Connection test کریں
-- 5. Vercel پر deploy کریں!


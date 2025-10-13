/**
 * Supabase Client Configuration
 * 
 * یہ file Supabase database سے connection بناتی ہے
 * This file creates a connection to Supabase database
 */

import { createClient } from '@supabase/supabase-js'

// Environment variables سے Supabase credentials لیں
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Validation - اگر credentials نہیں ہیں تو error دیں
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase credentials missing!')
  console.log('📝 Please add these to your .env.local file:')
  console.log('VITE_SUPABASE_URL=your-project-url')
  console.log('VITE_SUPABASE_ANON_KEY=your-anon-key')
}

// Supabase client بنائیں
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

/**
 * Helper function: Insert contact lead
 * @param {Object} leadData - Contact form data
 * @returns {Promise} Supabase response
 */
export const insertContactLead = async (leadData) => {
  try {
    // Get user's IP address (optional)
    let ipAddress = null
    try {
      const ipResponse = await fetch('https://api.ipify.org?format=json')
      const ipData = await ipResponse.json()
      ipAddress = ipData.ip
    } catch (error) {
      console.warn('Could not fetch IP address:', error)
    }

    // Insert data into Supabase
    const { data, error } = await supabase
      .from('contact_leads')
      .insert([
        {
          name: leadData.name,
          email: leadData.email,
          subject: leadData.subject,
          message: leadData.message,
          ip_address: ipAddress,
          user_agent: navigator.userAgent,
          status: 'new'
        }
      ])
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error inserting lead:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Helper function: Get all leads (for admin dashboard)
 * @param {string} status - Filter by status (optional)
 * @returns {Promise} Array of leads
 */
export const getContactLeads = async (status = null) => {
  try {
    let query = supabase
      .from('contact_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error fetching leads:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Helper function: Update lead status
 * @param {number} id - Lead ID
 * @param {string} newStatus - New status value
 * @returns {Promise} Supabase response
 */
export const updateLeadStatus = async (id, newStatus) => {
  try {
    const { data, error } = await supabase
      .from('contact_leads')
      .update({ status: newStatus })
      .eq('id', id)
      .select()

    if (error) throw error

    return { success: true, data }
  } catch (error) {
    console.error('Error updating status:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Helper function: Delete a lead
 * @param {number} id - Lead ID
 * @returns {Promise} Supabase response
 */
export const deleteLead = async (id) => {
  try {
    const { error } = await supabase
      .from('contact_leads')
      .delete()
      .eq('id', id)

    if (error) throw error

    return { success: true }
  } catch (error) {
    console.error('Error deleting lead:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Helper function: Export leads to CSV
 * @param {Array} leads - Array of lead objects
 * @returns {void} Downloads CSV file
 */
export const exportLeadsToCSV = (leads) => {
  // CSV headers
  const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Date', 'Status', 'IP Address']
  
  // CSV data
  const csvData = leads.map(lead => [
    lead.id,
    lead.name,
    lead.email,
    lead.subject,
    lead.message.replace(/\n/g, ' '), // Remove line breaks
    new Date(lead.created_at).toLocaleString(),
    lead.status,
    lead.ip_address || 'N/A'
  ])

  // Create CSV string
  const csv = [
    headers.join(','),
    ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n')

  // Create blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `contact_leads_${new Date().toISOString().split('T')[0]}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}

/**
 * Helper function: Check Supabase connection
 * @returns {Promise<boolean>} Connection status
 */
export const checkSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_leads')
      .select('count')
      .limit(1)

    if (error) throw error

    console.log('✅ Supabase connection successful!')
    return true
  } catch (error) {
    console.error('❌ Supabase connection failed:', error)
    return false
  }
}

export default supabase


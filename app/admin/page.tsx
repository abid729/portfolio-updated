'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { FaEnvelope, FaEye, FaGlobe, FaMobile, FaDesktop, FaTablet, FaDownload, FaSync } from 'react-icons/fa'

interface Lead {
  id: number
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

interface VisitorLog {
  id: number
  session_id: string
  ip_address: string
  user_agent: string
  country: string
  city: string
  device_type: string
  browser: string
  os: string
  referrer: string
  landing_page: string
  visited_at: string
}

interface Stats {
  total_visits: number
  unique_visitors: number
  today_visits: number
  week_visits: number
  month_visits: number
  countries_count: number
  mobile_visits: number
  desktop_visits: number
  tablet_visits: number
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [visitors, setVisitors] = useState<VisitorLog[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'leads' | 'visitors'>('leads')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      // Fetch leads
      const { data: leadsData } = await supabase
        .from('contact_leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (leadsData) setLeads(leadsData)

      // Fetch visitors
      const { data: visitorsData } = await supabase
        .from('visitor_logs')
        .select('*')
        .order('visited_at', { ascending: false })
        .limit(100)

      if (visitorsData) setVisitors(visitorsData)

      // Calculate stats
      if (visitorsData) {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

        setStats({
          total_visits: visitorsData.length,
          unique_visitors: new Set(visitorsData.map(v => v.session_id)).size,
          today_visits: visitorsData.filter(v => new Date(v.visited_at) >= today).length,
          week_visits: visitorsData.filter(v => new Date(v.visited_at) >= weekAgo).length,
          month_visits: visitorsData.filter(v => new Date(v.visited_at) >= monthAgo).length,
          countries_count: new Set(visitorsData.map(v => v.country).filter(Boolean)).size,
          mobile_visits: visitorsData.filter(v => v.device_type === 'mobile').length,
          desktop_visits: visitorsData.filter(v => v.device_type === 'desktop').length,
          tablet_visits: visitorsData.filter(v => v.device_type === 'tablet').length,
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = (type: 'leads' | 'visitors') => {
    if (type === 'leads') {
      const headers = ['ID', 'Name', 'Email', 'Subject', 'Message', 'Date']
      const csvData = leads.map(lead => [
        lead.id,
        lead.name,
        lead.email,
        lead.subject,
        lead.message,
        new Date(lead.created_at).toLocaleString()
      ])

      const csv = [
        headers.join(','),
        ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      downloadCSV(csv, 'contact_leads')
    } else {
      const headers = ['ID', 'Session', 'IP', 'Country', 'City', 'Device', 'Browser', 'OS', 'Referrer', 'Date']
      const csvData = visitors.map(v => [
        v.id,
        v.session_id,
        v.ip_address,
        v.country || 'N/A',
        v.city || 'N/A',
        v.device_type,
        v.browser,
        v.os,
        v.referrer,
        new Date(v.visited_at).toLocaleString()
      ])

      const csv = [
        headers.join(','),
        ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n')

      downloadCSV(csv, 'visitor_logs')
    }
  }

  const downloadCSV = (csv: string, filename: string) => {
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage leads and track visitors</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchData}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <FaSync /> Refresh
              </button>
              <a
                href="/"
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                ← Back to Site
              </a>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{leads.length}</div>
                <div className="text-blue-100 text-sm">Contact Leads</div>
              </div>
              <FaEnvelope className="text-4xl opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{stats?.total_visits || 0}</div>
                <div className="text-green-100 text-sm">Total Visits</div>
              </div>
              <FaEye className="text-4xl opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{stats?.unique_visitors || 0}</div>
                <div className="text-purple-100 text-sm">Unique Visitors</div>
              </div>
              <FaGlobe className="text-4xl opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">{stats?.today_visits || 0}</div>
                <div className="text-orange-100 text-sm">Today</div>
              </div>
              <FaEye className="text-4xl opacity-50" />
            </div>
          </div>
        </div>

        {/* Device Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center gap-3">
                <FaMobile className="text-blue-600 text-2xl" />
                <div>
                  <div className="text-2xl font-bold">{stats.mobile_visits}</div>
                  <div className="text-gray-600 text-sm">Mobile</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center gap-3">
                <FaDesktop className="text-green-600 text-2xl" />
                <div>
                  <div className="text-2xl font-bold">{stats.desktop_visits}</div>
                  <div className="text-gray-600 text-sm">Desktop</div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow">
              <div className="flex items-center gap-3">
                <FaTablet className="text-purple-600 text-2xl" />
                <div>
                  <div className="text-2xl font-bold">{stats.tablet_visits}</div>
                  <div className="text-gray-600 text-sm">Tablet</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('leads')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'leads'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Contact Leads ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('visitors')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'visitors'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Visitor Logs ({visitors.length})
            </button>
          </div>

          <div className="p-6">
            {/* Export Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => exportToCSV(activeTab)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <FaDownload /> Export CSV
              </button>
            </div>

            {/* Contact Leads Table */}
            {activeTab === 'leads' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Message</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {leads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800">{lead.name}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-800">{lead.subject}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{lead.message}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(lead.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {leads.length === 0 && (
                  <div className="text-center py-12 text-gray-600">
                    No contact leads yet
                  </div>
                )}
              </div>
            )}

            {/* Visitor Logs Table */}
            {activeTab === 'visitors' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">IP</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Device</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Browser</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">OS</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Referrer</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {visitors.map((visitor) => (
                      <tr key={visitor.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-800 font-mono">{visitor.ip_address}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {visitor.country && visitor.city 
                            ? `${visitor.city}, ${visitor.country}`
                            : visitor.country || 'Unknown'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            visitor.device_type === 'mobile' ? 'bg-blue-100 text-blue-800' :
                            visitor.device_type === 'desktop' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {visitor.device_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{visitor.browser}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{visitor.os}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {visitor.referrer === 'direct' ? 'Direct' : visitor.referrer}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(visitor.visited_at).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {visitors.length === 0 && (
                  <div className="text-center py-12 text-gray-600">
                    No visitor logs yet
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

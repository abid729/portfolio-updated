/**
 * Admin Dashboard for Contact Leads
 * 
 * یہ dashboard آپ کو contact leads manage کرنے دیتا ہے
 * This dashboard allows you to manage contact leads
 */

import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaCalendar, 
  FaUser, 
  FaDownload, 
  FaSync, 
  FaTrash,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaGlobe,
  FaDesktop
} from 'react-icons/fa';
import { 
  getContactLeads, 
  updateLeadStatus, 
  deleteLead,
  exportLeadsToCSV 
} from '../utils/supabaseClient';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [filteredLeads, setFilteredLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    closed: 0
  });

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter leads when filter or search changes
  useEffect(() => {
    filterLeads();
  }, [filter, searchTerm, leads]);

  // Calculate statistics
  useEffect(() => {
    calculateStats();
  }, [leads]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const result = await getContactLeads();
      
      if (result.success) {
        setLeads(result.data);
      } else {
        console.error('Failed to fetch leads:', result.error);
        alert('❌ Leads لانے میں خرابی: ' + result.error);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLeads = () => {
    let filtered = [...leads];

    // Filter by status
    if (filter !== 'all') {
      filtered = filtered.filter(lead => lead.status === filter);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.subject.toLowerCase().includes(term) ||
        lead.message.toLowerCase().includes(term)
      );
    }

    setFilteredLeads(filtered);
  };

  const calculateStats = () => {
    setStats({
      total: leads.length,
      new: leads.filter(l => l.status === 'new').length,
      contacted: leads.filter(l => l.status === 'contacted').length,
      closed: leads.filter(l => l.status === 'closed').length
    });
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const result = await updateLeadStatus(id, newStatus);
      
      if (result.success) {
        await fetchLeads(); // Refresh leads
      } else {
        alert('❌ Status update failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      alert('❌ خرابی: Status update نہیں ہو سکا');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('کیا آپ واقعی اس lead کو delete کرنا چاہتے ہیں؟\nAre you sure you want to delete this lead?')) {
      return;
    }

    try {
      const result = await deleteLead(id);
      
      if (result.success) {
        await fetchLeads(); // Refresh leads
        setSelectedLead(null);
      } else {
        alert('❌ Delete failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
      alert('❌ خرابی: Lead delete نہیں ہو سکا');
    }
  };

  const handleExport = () => {
    if (filteredLeads.length === 0) {
      alert('⚠️ کوئی leads export کرنے کے لیے نہیں ہیں\nNo leads to export');
      return;
    }

    exportLeadsToCSV(filteredLeads);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'contacted': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'closed': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'new': return <FaClock />;
      case 'contacted': return <FaCheckCircle />;
      case 'closed': return <FaTimes />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                📊 Contact Leads Dashboard
              </h1>
              <p className="text-gray-600 mt-2">
                اپنے contact leads کو manage کریں | Manage your contact leads
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={fetchLeads}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
                disabled={loading}
              >
                <FaSync className={loading ? 'animate-spin' : ''} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
              >
                <FaDownload />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">Total Leads</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.total}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaEnvelope className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">New</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.new}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <FaClock className="text-yellow-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">Contacted</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.contacted}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaCheckCircle className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-600 text-sm">Closed</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.closed}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <FaTimes className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filter Tabs */}
            <div className="flex gap-2 flex-wrap">
              {['all', 'new', 'contacted', 'closed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filter === status
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && ` (${stats[status]})`}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, email, subject..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Leads Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Loading leads...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <FaEnvelope className="mx-auto text-6xl text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">کوئی leads نہیں ملے | No leads found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Subject</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-gray-400" />
                          <span className="font-medium text-gray-800">{lead.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{lead.email}</td>
                      <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{lead.subject}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <FaCalendar className="text-gray-400" />
                          <span className="text-sm">
                            {new Date(lead.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(lead.status)}`}>
                          {getStatusIcon(lead.status)}
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <select
                            value={lead.status}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleStatusUpdate(lead.id, e.target.value);
                            }}
                            className="text-sm border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="closed">Closed</option>
                          </select>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(lead.id);
                            }}
                            className="text-red-600 hover:text-red-800 transition-colors p-1"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead Detail Modal */}
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50" onClick={() => setSelectedLead(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <h2 className="text-2xl font-bold text-gray-800">Lead Details</h2>
                  <button
                    onClick={() => setSelectedLead(null)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes size={24} />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Name</label>
                  <p className="text-lg text-gray-800 mt-1">{selectedLead.name}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Email</label>
                  <p className="text-lg text-gray-800 mt-1">
                    <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                      {selectedLead.email}
                    </a>
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Subject</label>
                  <p className="text-lg text-gray-800 mt-1">{selectedLead.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Message</label>
                  <p className="text-gray-800 mt-1 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {selectedLead.message}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <FaCalendar /> Date
                    </label>
                    <p className="text-gray-800 mt-1">
                      {new Date(selectedLead.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <FaGlobe /> IP Address
                    </label>
                    <p className="text-gray-800 mt-1">{selectedLead.ip_address || 'N/A'}</p>
                  </div>
                </div>

                {selectedLead.user_agent && (
                  <div>
                    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <FaDesktop /> User Agent
                    </label>
                    <p className="text-sm text-gray-600 mt-1 bg-gray-50 p-2 rounded truncate">
                      {selectedLead.user_agent}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-between">
                <button
                  onClick={() => handleDelete(selectedLead.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Delete Lead
                </button>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


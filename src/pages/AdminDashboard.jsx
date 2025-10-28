import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../supabaseClient'

function AdminDashboard() {
  const navigate = useNavigate()
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedSubmission, setSelectedSubmission] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Check authentication on mount
  useEffect(() => {
    const isAdminAuth = localStorage.getItem('admin_auth')
    if (isAdminAuth !== 'true') {
      navigate('/admin')
    }
  }, [navigate])

  // Fetch submissions data
  useEffect(() => {
    fetchSubmissions()
  }, [])

  const fetchSubmissions = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        throw error
      }

      setSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching submissions:', error)
      setError('Failed to load submissions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    navigate('/admin')
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const openDetailModal = (submission) => {
    setSelectedSubmission(submission)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedSubmission(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4"
    >
      {/* Detail Modal */}
      {showModal && selectedSubmission && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-green-600 text-white p-6 rounded-t-2xl flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Submission Details</h2>
                <p className="text-green-100 text-sm mt-1">ID: {selectedSubmission.id}</p>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:bg-green-700 rounded-full p-2 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="text-lg font-bold text-green-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  User Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-green-600 font-semibold">Email</p>
                    <p className="text-green-900">{selectedSubmission.user_email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-green-600 font-semibold">Submitted On</p>
                    <p className="text-green-900">{formatDate(selectedSubmission.created_at)}</p>
                  </div>
                </div>
              </div>

              {/* Location Info */}
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="text-lg font-bold text-blue-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-600 font-semibold">जिला (District)</p>
                    <p className="text-blue-900">{selectedSubmission.district || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-600 font-semibold">स्थान (Place)</p>
                    <p className="text-blue-900">{selectedSubmission.place || 'N/A'}</p>
                  </div>
                </div>
              </div>

              {/* Work Completion */}
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Completed By
                </h3>
                <p className="text-purple-900 text-lg">{selectedSubmission.completed_by || 'N/A'}</p>
              </div>

              {/* Work Description */}
              <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                <h3 className="text-lg font-bold text-yellow-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  कार्य का विवरण (Work Description)
                </h3>
                <div className="bg-white rounded-lg p-4 border border-yellow-300">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedSubmission.work_description || 'No description provided'}
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="bg-teal-50 rounded-lg p-4 border border-teal-200">
                <h3 className="text-lg font-bold text-teal-800 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  परिणाम (Result)
                </h3>
                <div className="bg-white rounded-lg p-4 border border-teal-300">
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {selectedSubmission.result || 'No result provided'}
                  </p>
                </div>
              </div>

              {/* Image Link */}
              {selectedSubmission.google_drive_link && (
                <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
                  <h3 className="text-lg font-bold text-indigo-800 mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    चित्र (Image)
                  </h3>
                  <a
                    href={selectedSubmission.google_drive_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Open Google Drive Link
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 p-4 rounded-b-2xl flex justify-end">
              <button
                onClick={closeModal}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-t-4 border-green-600">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
                Admin Dashboard
              </h1>
              <p className="text-green-700">प्रशासक डैशबोर्ड - All Submissions</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={fetchSubmissions}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                Refresh
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 shadow-md flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Logout
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-600 text-sm font-semibold">Total Submissions</p>
              <p className="text-3xl font-bold text-green-800">{submissions.length}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-600 text-sm font-semibold">Unique Users</p>
              <p className="text-3xl font-bold text-green-800">
                {new Set(submissions.map((s) => s.user_email)).size}
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-green-600 text-sm font-semibold">With Images</p>
              <p className="text-3xl font-bold text-green-800">
                {submissions.filter((s) => s.google_drive_link).length}
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="mt-4 text-green-700 font-semibold">Loading submissions...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Data Table */}
        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-green-200">
                <thead className="bg-green-600">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      User Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      District
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Place
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Completed By
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Work Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Result
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Image Link
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-green-100">
                  {submissions.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="px-4 py-8 text-center text-green-600">
                        <div className="flex flex-col items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 text-green-300 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                            />
                          </svg>
                          <p className="text-lg font-semibold">No submissions yet</p>
                          <p className="text-sm text-green-500">
                            Submissions will appear here once users submit the form
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    submissions.map((submission, index) => (
                      <tr
                        key={submission.id}
                        className={index % 2 === 0 ? 'bg-white' : 'bg-green-50'}
                      >
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-green-900">
                          {submission.id}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-700">
                          {formatDate(submission.created_at)}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-700 font-semibold">
                          {submission.user_email}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-700">
                          {submission.district || 'N/A'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-700">
                          {submission.place || 'N/A'}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-700">
                          {submission.completed_by || 'N/A'}
                        </td>
                        <td className="px-4 py-4 text-sm text-green-700 max-w-xs">
                          <button
                            onClick={() => openDetailModal(submission)}
                            className="text-left hover:text-green-900 hover:underline cursor-pointer transition-colors"
                          >
                            <div className="line-clamp-3" title="Click to view full details">
                              {submission.work_description || 'N/A'}
                            </div>
                            <span className="text-xs text-green-500 mt-1 block">Click to view more →</span>
                          </button>
                        </td>
                        <td className="px-4 py-4 text-sm text-green-700 max-w-xs">
                          <button
                            onClick={() => openDetailModal(submission)}
                            className="text-left hover:text-green-900 hover:underline cursor-pointer transition-colors"
                          >
                            <div className="line-clamp-3" title="Click to view full details">
                              {submission.result || 'N/A'}
                            </div>
                            <span className="text-xs text-green-500 mt-1 block">Click to view more →</span>
                          </button>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-green-700">
                          {submission.google_drive_link ? (
                            <a
                              href={submission.google_drive_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-600 hover:text-green-800 underline flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                              </svg>
                              View
                            </a>
                          ) : (
                            <span className="text-green-400">No link</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Note */}
        {!loading && !error && submissions.length > 0 && (
          <div className="mt-6 text-center text-sm text-green-700">
            <p>Showing all {submissions.length} submission(s)</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default AdminDashboard

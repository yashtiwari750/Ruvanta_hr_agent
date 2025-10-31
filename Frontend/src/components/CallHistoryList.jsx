/**
 * CallHistoryList Component
 * 
 * Displays a paginated list of call history with the following features:
 * - Shows 10 calls per page
 * - Pagination controls (Previous/Next)
 * - Click on call to view details
 * - Refresh button to reload calls
 * - Loading states
 * 
 * @param {Array} callsList - Array of call objects
 * @param {number} currentPage - Current page number
 * @param {Function} setCurrentPage - Function to update current page
 * @param {Function} onCallClick - Callback when a call is clicked
 * @param {Function} onRefresh - Callback to refresh the call list
 * @param {boolean} isLoading - Loading state indicator
 * @param {Object} styles - Style object
 */

import React from 'react';
import { List, RefreshCw, Clock, ChevronRight, ChevronLeft, Loader } from 'lucide-react';

const CallHistoryList = ({ 
  callsList, 
  currentPage, 
  setCurrentPage, 
  onCallClick, 
  onRefresh, 
  isLoading,
  styles 
}) => {
  // Number of calls to display per page
  const CALLS_PER_PAGE = 10;

  /**
   * Get status color based on call status
   * @param {string} status - Call status (completed, in-progress, failed)
   * @returns {string} Color code for the status
   */
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed': return '#10b981';
      case 'in-progress': return '#f59e0b';
      case 'failed': return '#ef4444';
      default: return '#6b7280';
    }
  };

  /**
   * Calculate pagination values
   */
  const totalPages = Math.ceil(callsList.length / CALLS_PER_PAGE);
  const startIndex = (currentPage - 1) * CALLS_PER_PAGE;
  const endIndex = startIndex + CALLS_PER_PAGE;
  const currentCalls = callsList.slice(startIndex, endIndex);

  /**
   * Handle previous page navigation
   */
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  /**
   * Handle next page navigation
   */
  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <>
      {/* Header with title and refresh button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <List size={20} style={{ color: '#60a5fa' }} />
        <h3 style={{ color: 'white', margin: 0 }}>Call History</h3>
        <button
          className="interactive-button"
          onClick={onRefresh}
          style={{
            marginLeft: 'auto',
            background: 'rgba(59, 130, 246, 0.2)',
            color: '#60a5fa',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}
        >
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <Loader size={32} style={{ color: '#3b82f6', margin: '0 auto' }} className="spinner" />
          <p style={{ color: '#bfdbfe', marginTop: '1rem' }}>Loading call history...</p>
        </div>
      ) : (
        <>
          {/* Calls List */}
          <div style={styles.callsList}>
            {callsList.length === 0 ? (
              // Empty State
              <div style={{ textAlign: 'center', padding: '2rem', color: '#bfdbfe' }}>
                <Clock size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
                <p>No calls found. Make your first call to see history here.</p>
              </div>
            ) : (
              // Render paginated calls
              currentCalls.map(call => (
                <div
                  key={call.id}
                  style={styles.callItem}
                  onClick={() => onCallClick(call.id)}
                  className="call-item"
                >
                  {/* Call Item Content */}
                  <div style={styles.callItemContent}>
                    {/* Status Indicator Dot */}
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: getStatusColor(call.status),
                      flexShrink: 0
                    }} />
                    
                    {/* Call Information */}
                    <div>
                      <p style={styles.callItemText}>
                        {call.customer?.number || 'Unknown number'}
                      </p>
                      <p style={{ ...styles.callItemText, fontSize: '0.75rem', opacity: 0.7 }}>
                        {call.createdAt ? new Date(call.createdAt).toLocaleString() : 'Unknown date'}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status and Arrow */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      color: '#bfdbfe',
                      fontSize: '0.75rem',
                      textTransform: 'capitalize'
                    }}>
                      {call.status || 'unknown'}
                    </span>
                    <ChevronRight size={16} style={{ color: '#6b7280' }} />
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          {callsList.length > CALLS_PER_PAGE && (
            <div style={styles.paginationContainer}>
              {/* Previous Button */}
              <button
                className="interactive-button"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                style={{
                  ...styles.paginationButton,
                  opacity: currentPage === 1 ? 0.5 : 1,
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {/* Page Info */}
              <span style={styles.paginationInfo}>
                Page {currentPage} of {totalPages}
              </span>

              {/* Next Button */}
              <button
                className="interactive-button"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                style={{
                  ...styles.paginationButton,
                  opacity: currentPage === totalPages ? 0.5 : 1,
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CallHistoryList;


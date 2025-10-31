/**
 * CallDetailsSection Component
 *
 * Displays detailed information about a selected call including:
 * - Call analysis with extracted candidate information
 * - Call recording player
 * - Call transcript
 *
 * @param {Object} call - The call object containing all call data
 * @param {Function} onBack - Callback function to return to call list
 */

import React from 'react';
import { ArrowLeft, Play, Download, FileText } from 'lucide-react';

const CallDetailsSection = ({ call, onBack, styles }) => {
  // Return null if no call data is provided
  if (!call) return null;

  // Extract analysis data from the call object
  const analysis = call.analysis || {};
  const transcript = call.artifact?.transcript || call.transcript || '';

  // Try multiple possible locations for recording URL
  const recordingUrl =
    call.artifact?.recordingUrl ||
    call.artifact?.stereoRecordingUrl ||
    call.artifact?.recording?.stereoUrl ||
    call.artifact?.recording?.mono?.combinedUrl ||
    call.recordingUrl;

  // Debug logging
  console.log('🔍 CallDetailsSection - Recording URL:', recordingUrl);
  console.log('🔍 CallDetailsSection - Transcript:', transcript ? `${transcript.substring(0, 50)}...` : 'No transcript');
  console.log('🔍 CallDetailsSection - Call Artifact:', call.artifact);
  
  // Calculate call duration in seconds
  const duration = call.endedAt && call.startedAt 
    ? Math.round((new Date(call.endedAt) - new Date(call.startedAt)) / 1000) 
    : 0;

  /**
   * Format duration from seconds to MM:SS format
   * @param {number} seconds - Duration in seconds
   * @returns {string} Formatted duration string
   */
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Extracted candidate data from call analysis
   * Supports both camelCase and snake_case field names for flexibility
   */
  const extractedData = {
    'Candidate Name': analysis.candidateName || analysis.candidate_name || 'Not extracted',
    'City Location': analysis.cityLocation || analysis.city_location || 'Not extracted',
    'Position Applied': analysis.positionApplied || analysis.position_applied || 'Not extracted',
    'Education Background': analysis.educationBackground || analysis.education_background || 'Not extracted',
    'Total Experience': analysis.totalExperience || analysis.total_experience || 'Not extracted',
    'Last Job Role': analysis.lastJobRole || analysis.last_job_role || 'Not extracted',
    'Key Skills': analysis.keySkills || analysis.key_skills || 'Not extracted',
    'Motivation to Join': analysis.motivationToJoin || analysis.motivation_to_join || 'Not extracted',
    'Expected Salary': analysis.expectedSalary || analysis.expected_salary || 'Not extracted',
    'Notice Period': analysis.noticePeriod || analysis.notice_period || 'Not extracted',
    'Previous Company Experience': analysis.previousCompanyExperience || analysis.previous_company_or_city_experience || 'Not extracted',
    'Candidate Questions': analysis.candidateQuestions || analysis.candidate_questions || 'None'
  };

  return (
    <div style={styles.callDetailsContainer}>
      {/* Back to List Button */}
      <button
        onClick={onBack}
        style={styles.backButton}
        className="interactive-button"
      >
        <ArrowLeft size={20} />
        Back to Call History
      </button>

      {/* Call Analysis Header */}
      <div style={styles.detailsHeader}>
        <h3 style={styles.detailsTitle}>Call Analysis & Recording</h3>
        <div style={styles.callMeta}>
          <span style={styles.metaItem}>
            Duration: {formatDuration(duration)}
          </span>
          <span style={styles.metaItem}>
            Status: <span style={{
              color: call.status === 'completed' ? '#10b981' : 
                     call.status === 'in-progress' ? '#f59e0b' : '#ef4444',
              textTransform: 'capitalize'
            }}>
              {call.status || 'unknown'}
            </span>
          </span>
        </div>
      </div>

      {/* Recording Section */}
      <div style={styles.recordingSection}>
        <div style={styles.recordingCard}>
          <Play size={24} style={{color: '#3b82f6'}} />
          <div>
            <p style={styles.recordingLabel}>
              {recordingUrl ? 'Call Recording Available' : 'Recording Processing...'}
            </p>
            {recordingUrl && (
              <audio controls style={styles.audioPlayer}>
                <source src={recordingUrl} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
          {recordingUrl && (
            <a 
              href={recordingUrl} 
              download 
              style={styles.downloadBtn}
              className="interactive-button"
            >
              <Download size={16} />
            </a>
          )}
        </div>
      </div>

      {/* Extracted Information Grid */}
      <div style={styles.extractedInfo}>
        <h4 style={styles.sectionTitle}>Extracted Information</h4>
        <div style={styles.infoGrid}>
          {Object.entries(extractedData).map(([key, value]) => (
            <div key={key} style={styles.infoCard}>
              <span style={styles.infoLabel}>{key}</span>
              <span style={styles.infoValue}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Transcript Section */}
      {transcript && (
        <div style={styles.transcriptSection}>
          <div style={styles.jsonHeader}>
            <FileText size={20} />
            <span>Call Transcript</span>
          </div>
          <div style={styles.transcriptContent}>
            {transcript}
          </div>
        </div>
      )}

    </div>
  );
};

export default CallDetailsSection;


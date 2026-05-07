import React, { useState } from 'react';
import StatusBadge from '../StatusBadge';
import './CaseDetailsModal.css';

const CaseDetailsModal = ({ caseData, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownloadAll = () => {
    alert('Initiating download of all case documents...');
  };

  if (!caseData) return null;

  return (
    <>
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="case-details-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <div className="header-content">
            <h2 className="modal-title">{caseData.title}</h2>
            <div className="header-meta">
              <span className="case-id-large">{caseData.id}</span>
              <StatusBadge status={caseData.status} size="medium" />
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="modal-tabs">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'hearings' ? 'active' : ''}`}
            onClick={() => setActiveTab('hearings')}
          >
            Hearing Timeline
          </button>
          <button
            className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
          <button
            className={`tab-btn ${activeTab === 'notices' ? 'active' : ''}`}
            onClick={() => setActiveTab('notices')}
          >
            Legal Notices
          </button>
        </div>

        {/* Modal Content */}
        <div className="modal-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              {/* Case Description Section */}
              <div className="content-section">
                <h3 className="section-title">Case Description</h3>
                <p className="description-text">{caseData.description}</p>
              </div>

              {/* Key Information Grid */}
              <div className="info-section">
                <div className="info-grid">
                  <div className="info-box">
                    <label>Court Name</label>
                    <value>{caseData.courtName}</value>
                  </div>
                  <div className="info-box">
                    <label>Court Address</label>
                    <value>{caseData.courtAddress}</value>
                  </div>
                  <div className="info-box">
                    <label>Advocate/Lawyer</label>
                    <value>{caseData.advocateName}</value>
                  </div>
                  <div className="info-box">
                    <label>Email</label>
                    <value>{caseData.advocateEmail}</value>
                  </div>
                  <div className="info-box">
                    <label>Opposite Party</label>
                    <value>{caseData.oppositeParty}</value>
                  </div>
                  <div className="info-box">
                    <label>Case Type</label>
                    <value>{caseData.caseType}</value>
                  </div>
                  <div className="info-box">
                    <label>Filing Date</label>
                    <value>{formatDate(caseData.filingDate)}</value>
                  </div>
                  <div className="info-box">
                    <label>Priority Level</label>
                    <value className={`priority-${caseData.priority.toLowerCase()}`}>
                      {caseData.priority}
                    </value>
                  </div>
                </div>
              </div>

              {/* Lawyer Notes */}
              {caseData.lawyerNotes && (
                <div className="content-section">
                  <h3 className="section-title">⚖️ Lawyer Notes</h3>
                  <div className="notes-box">
                    {caseData.lawyerNotes}
                  </div>
                </div>
              )}

              {/* Case Progress */}
              <div className="content-section">
                <h3 className="section-title">Case Progress</h3>
                <div className="progress-container">
                  <div className="progress-bar-large">
                    <div
                      className="progress-fill-large"
                      style={{ width: `${caseData.caseProgress}%` }}
                    ></div>
                  </div>
                  <p className="progress-text">{caseData.caseProgress}% Complete</p>
                </div>
              </div>

              {/* Upcoming Deadlines */}
              {caseData.deadlines.length > 0 && (
                <div className="content-section">
                  <h3 className="section-title">📌 Important Deadlines</h3>
                  <div className="deadlines-list">
                    {caseData.deadlines.map((deadline, index) => (
                      <div key={index} className="deadline-item">
                        <div className="deadline-left">
                          <span className="deadline-date">{formatDate(deadline.deadline)}</span>
                        </div>
                        <div className="deadline-middle">
                          <span className="deadline-task">{deadline.task}</span>
                        </div>
                        <div className="deadline-right">
                          <span className={`deadline-status ${deadline.status.toLowerCase()}`}>
                            {deadline.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hearing Timeline Tab */}
          {activeTab === 'hearings' && (
            <div className="tab-content">
              {/* Next Hearing */}
              <div className="content-section">
                <h3 className="section-title">📅 Next Hearing</h3>
                <div className="next-hearing-box">
                  <div className="hearing-row">
                    <label>Date & Time</label>
                    <value>{formatDate(caseData.nextHearingDate)} at {caseData.nextHearingTime}</value>
                  </div>
                  <div className="hearing-row">
                    <label>Court Room</label>
                    <value>Room {caseData.courtRoom}</value>
                  </div>
                  <div className="hearing-row">
                    <label>Judge</label>
                    <value>{caseData.judge}</value>
                  </div>
                  <div className="hearing-row">
                    <label>Purpose</label>
                    <value>{caseData.hearingPurpose}</value>
                  </div>
                </div>
              </div>

              {/* Previous Hearings */}
              {caseData.previousHearings.length > 0 && (
                <div className="content-section">
                  <h3 className="section-title">📋 Previous Hearing History</h3>
                  <div className="hearings-list">
                    {caseData.previousHearings.map((hearing, index) => (
                      <div key={index} className="hearing-item">
                        <div className="hearing-item-header">
                          <span className="hearing-date">{formatDate(hearing.date)}</span>
                        </div>
                        <div className="hearing-item-body">
                          <p className="hearing-purpose">{hearing.purpose}</p>
                          <p className="hearing-outcome">Outcome: {hearing.outcome}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Documents Tab */}
          {activeTab === 'documents' && (
            <div className="tab-content">
              <div className="content-section">
                <div className="section-header">
                  <h3 className="section-title">📄 Uploaded Documents</h3>
                  <button className="download-all-btn" onClick={handleDownloadAll}>
                    Download All
                  </button>
                </div>
                {caseData.documents.length > 0 ? (
                  <div className="documents-list">
                    {caseData.documents.map((doc, index) => (
                      <div key={index} className="document-item">
                        <div className="doc-icon">📄</div>
                        <div className="doc-info">
                          <p className="doc-name">{doc.name}</p>
                          <p className="doc-meta">
                            Uploaded: {formatDate(doc.uploadDate)} • Size: {doc.size}
                          </p>
                        </div>
                        <button className="doc-action-btn">Download</button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-documents">No documents uploaded yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Legal Notices Tab */}
          {activeTab === 'notices' && (
            <div className="tab-content">
              <div className="content-section">
                <h3 className="section-title">⚖️ Legal Notices</h3>
                {caseData.legalNotices.length > 0 ? (
                  <div className="notices-list">
                    {caseData.legalNotices.map((notice, index) => (
                      <div key={index} className="notice-item">
                        <div className="notice-date">{formatDate(notice.date)}</div>
                        <div className="notice-content">
                          <p className="notice-type">{notice.type}</p>
                          <p className="notice-text">{notice.notice}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="no-notices">No legal notices yet.</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button className="btn-primary">Schedule Meeting with Advocate</button>
        </div>
      </div>
    </>
  );
};

export default CaseDetailsModal;

import React from 'react';
import './CaseCard.css';

const CaseCard = ({ caseData }) => {
  const {
    caseId,
    caseTitle,
    lawyerName,
    nextHearing,
    status,
    description,
    progress
  } = caseData;

  const getStatusColor = (status) => {
    const statusColors = {
      'Active': '#10B981',
      'In Review': '#F59E0B',
      'Pending': '#EF4444',
      'Closed': '#6B7280'
    };
    return statusColors[status] || '#3B82F6';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="case-card">
      <div className="case-card-header">
        <div className="case-card-title">
          <h3 className="case-title">{caseTitle}</h3>
          <span className="case-id">{caseId}</span>
        </div>
        <span 
          className="case-status-badge"
          style={{ background: `${getStatusColor(status)}20`, color: getStatusColor(status) }}
        >
          {status}
        </span>
      </div>

      <div className="case-card-body">
        <div className="case-detail">
          <span className="detail-label">👨‍⚖️ Lawyer</span>
          <span className="detail-value">{lawyerName}</span>
        </div>

        <div className="case-detail">
          <span className="detail-label">📅 Next Hearing</span>
          <span className="detail-value">{formatDate(nextHearing)}</span>
        </div>

        {description && (
          <div className="case-description">
            <p>{description}</p>
          </div>
        )}

        {progress !== undefined && (
          <div className="case-progress">
            <div className="progress-header">
              <span className="progress-label">Progress</span>
              <span className="progress-percent">{progress}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      <div className="case-card-footer">
        <button className="card-action-btn">View Details →</button>
      </div>
    </div>
  );
};

export default CaseCard;

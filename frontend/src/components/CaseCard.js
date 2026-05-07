import React, { useState } from 'react';
import StatusBadge from '../StatusBadge';
import './CaseCard.css';

const CaseCard = ({ caseData, onViewDetails }) => {
  const [isHovering, setIsHovering] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getTypeIcon = (caseType) => {
    const icons = {
      'Property Dispute': '🏠',
      'Employment Law': '👔',
      'Estate/Probate': '📋',
      'Intellectual Property': '💡',
      'Personal Injury': '🚗',
      'Family Law': '👨‍👩‍👧',
      'Default': '⚖️',
    };
    return icons[caseType] || icons['Default'];
  };

  return (
    <div
      className="case-card"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Card Header with Status and Type */}
      <div className="case-card-header">
        <div className="case-header-left">
          <div className="case-type-icon">{getTypeIcon(caseData.caseType)}</div>
          <div className="case-header-info">
            <h3 className="case-id">{caseData.id}</h3>
            <p className="case-court">{caseData.courtName}</p>
          </div>
        </div>
        <StatusBadge status={caseData.status} size="small" />
      </div>

      {/* Case Title */}
      <h2 className="case-title">{caseData.title}</h2>

      {/* Case Description */}
      <p className="case-description">
        {caseData.description.length > 120
          ? `${caseData.description.substring(0, 120)}...`
          : caseData.description}
      </p>

      {/* Case Info Grid */}
      <div className="case-info-grid">
        <div className="info-item">
          <span className="info-label">Advocate</span>
          <span className="info-value">{caseData.advocateName}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Filing Date</span>
          <span className="info-value">{formatDate(caseData.filingDate)}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Case Type</span>
          <span className="info-value">{caseData.caseType}</span>
        </div>
        <div className="info-item">
          <span className="info-label">Priority</span>
          <span className={`info-value priority-${caseData.priority.toLowerCase()}`}>
            {caseData.priority}
          </span>
        </div>
      </div>

      {/* Hearing Information */}
      {caseData.nextHearingDate && (
        <div className="case-hearing-info">
          <span className="hearing-icon">📅</span>
          <div className="hearing-details">
            <span className="hearing-label">Next Hearing</span>
            <span className="hearing-value">
              {formatDate(caseData.nextHearingDate)} at {caseData.nextHearingTime}
            </span>
          </div>
        </div>
      )}

      {/* Case Progress */}
      <div className="case-progress">
        <div className="progress-label">
          <span>Case Progress</span>
          <span className="progress-percent">{caseData.caseProgress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${caseData.caseProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Card Footer with Action Button */}
      <div className="case-card-footer">
        <button
          className={`view-details-btn ${isHovering ? 'active' : ''}`}
          onClick={() => onViewDetails(caseData)}
        >
          View Details
          <span className="btn-arrow">→</span>
        </button>
      </div>

      {/* Hover Effect Overlay */}
      {isHovering && <div className="case-card-overlay"></div>}
    </div>
  );
};

export default CaseCard;

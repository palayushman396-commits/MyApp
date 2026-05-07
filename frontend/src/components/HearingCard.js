import React from 'react';
import './HearingCard.css';

const HearingCard = ({ hearing }) => {
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="hearing-card">
      <div className="hearing-card-left">
        <div className="hearing-date-section">
          <div className="hearing-date">
            {new Date(hearing.date).getDate()}
          </div>
          <div className="hearing-month">
            {new Date(hearing.date).toLocaleDateString('default', { month: 'short' })}
          </div>
        </div>
      </div>

      <div className="hearing-card-middle">
        <h4 className="hearing-case-title">{hearing.caseTitle}</h4>
        <div className="hearing-details-row">
          <span className="hearing-detail">
            <span className="detail-icon">⏰</span>
            {hearing.time}
          </span>
          <span className="hearing-detail">
            <span className="detail-icon">🏛️</span>
            Court Room {hearing.courtRoom}
          </span>
        </div>
        <div className="hearing-details-row">
          <span className="hearing-detail">
            <span className="detail-icon">⚖️</span>
            {hearing.judge}
          </span>
          <span className="hearing-detail">
            <span className="detail-icon">📋</span>
            {hearing.purpose}
          </span>
        </div>
      </div>

      <div className="hearing-card-right">
        <button className="hearing-details-btn">
          Details →
        </button>
      </div>
    </div>
  );
};

export default HearingCard;

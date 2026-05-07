import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status, size = 'medium' }) => {
  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return 'status-active';
      case 'pending':
        return 'status-pending';
      case 'closed':
        return 'status-closed';
      case 'urgent':
        return 'status-urgent';
      default:
        return 'status-default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
        return '●';
      case 'pending':
        return '⏳';
      case 'closed':
        return '✓';
      case 'urgent':
        return '⚠️';
      default:
        return '○';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)} ${size}`}>
      <span className="status-icon">{getStatusIcon(status)}</span>
      <span className="status-text">{status}</span>
    </span>
  );
};

export default StatusBadge;

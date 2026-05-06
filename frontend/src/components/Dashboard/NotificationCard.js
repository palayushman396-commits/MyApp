import React, { useState } from 'react';
import './NotificationCard.css';

const NotificationCard = ({ notification }) => {
  const [isRead, setIsRead] = useState(notification.read);

  const getNotificationIcon = (type) => {
    const icons = {
      'document': '📄',
      'hearing': '📅',
      'action': '⚠️',
      'case': '📋',
      'message': '💬'
    };
    return icons[type] || '🔔';
  };

  const getNotificationColor = (type) => {
    const colors = {
      'document': '#3b82f6',
      'hearing': '#f59e0b',
      'action': '#ef4444',
      'case': '#8b5cf6',
      'message': '#10b981'
    };
    return colors[type] || '#6b7280';
  };

  const handleMarkAsRead = () => {
    setIsRead(true);
  };

  return (
    <div className={`notification-card ${isRead ? 'read' : 'unread'}`}>
      <div className="notification-icon-wrapper">
        <span 
          className="notification-icon"
          style={{ background: `${getNotificationColor(notification.type)}20` }}
        >
          {getNotificationIcon(notification.type)}
        </span>
      </div>

      <div className="notification-content">
        <p className="notification-message">{notification.message}</p>
        <span className="notification-timestamp">{notification.timestamp}</span>
      </div>

      {!isRead && (
        <button 
          className="notification-action"
          onClick={handleMarkAsRead}
          title="Mark as read"
        >
          •
        </button>
      )}
    </div>
  );
};

export default NotificationCard;

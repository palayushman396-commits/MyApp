import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ isOpen }) => {
  const [activeNav, setActiveNav] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'cases', label: 'My Cases', icon: '📋' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'hearings', label: 'Hearings', icon: '📅' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' },
  ];

  const settingsItems = [
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-content">
        {/* Main Navigation */}
        <nav className="sidebar-nav">
          <p className="nav-section-title">Main</p>
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                  title={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Settings Navigation */}
        <nav className="sidebar-settings">
          <p className="nav-section-title">Settings</p>
          <ul className="nav-list">
            {settingsItems.map((item) => (
              <li key={item.id}>
                <button
                  className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                  onClick={() => setActiveNav(item.id)}
                  title={item.label}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="help-box">
          <p className="help-title">Need Help?</p>
          <p className="help-text">Contact our support team for assistance</p>
          <button className="help-button">Get Support →</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

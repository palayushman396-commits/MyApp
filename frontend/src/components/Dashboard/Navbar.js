import React from 'react';
import './Navbar.css';

const Navbar = ({ onThemeToggle, theme, onMenuToggle }) => {
  const [notificationCount, setNotificationCount] = React.useState(3);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);

  return (
    <nav className={`navbar theme-${theme}`}>
      <div className="navbar-container">
        {/* Logo and Menu Toggle */}
        <div className="navbar-left">
          <button className="menu-toggle" onClick={onMenuToggle} title="Toggle Sidebar">
            <span className="hamburger"></span>
            <span className="hamburger"></span>
            <span className="hamburger"></span>
          </button>
          <div className="logo">
            <span className="logo-icon">⚖️</span>
            <span className="logo-text">LexPilot</span>
          </div>
        </div>

        {/* Navbar Center - Search Bar (Optional) */}
        <div className="navbar-center">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search cases, documents..." 
              className="search-input"
            />
            <button className="search-icon">🔍</button>
          </div>
        </div>

        {/* Navbar Right - Controls */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <button 
            className="navbar-icon-btn theme-toggle" 
            onClick={onThemeToggle}
            title="Toggle Theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {/* Notifications Bell */}
          <button 
            className="navbar-icon-btn notifications-btn" 
            title="Notifications"
          >
            <span className="bell-icon">🔔</span>
            {notificationCount > 0 && (
              <span className="notification-badge">{notificationCount}</span>
            )}
          </button>

          {/* Profile Icon and Dropdown */}
          <div className="profile-menu">
            <button 
              className="navbar-icon-btn profile-btn"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              title="Profile"
            >
              <span className="profile-icon">👤</span>
            </button>
            
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <span className="profile-avatar">👤</span>
                  <div className="profile-info">
                    <p className="profile-name">Sarah Johnson</p>
                    <p className="profile-email">sarah@example.com</p>
                  </div>
                </div>
                <div className="profile-divider"></div>
                <button className="profile-menu-item">⚙️ Settings</button>
                <button className="profile-menu-item">📋 Account</button>
                <button className="profile-menu-item">🆘 Help & Support</button>
                <div className="profile-divider"></div>
                <button className="profile-menu-item logout">🚪 Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

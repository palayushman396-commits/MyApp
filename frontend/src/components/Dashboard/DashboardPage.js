import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CaseCard from './CaseCard';
import NotificationCard from './NotificationCard';
import './DashboardPage.css';

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'

  // Dummy data for statistics
  const stats = [
    { label: 'Total Cases', value: '12', icon: '📋', color: '#3B82F6' },
    { label: 'Upcoming Hearings', value: '3', icon: '📅', color: '#10B981' },
    { label: 'Pending Documents', value: '5', icon: '📄', color: '#F59E0B' },
    { label: 'Notifications', value: '8', icon: '🔔', color: '#8B5CF6' }
  ];

  // Dummy data for recent cases
  const recentCases = [
    {
      id: 'CASE-001',
      caseTitle: 'Smith vs. Johnson',
      lawyerName: 'John Davidson',
      nextHearing: '2026-05-15',
      status: 'Active',
      statusColor: '#10B981'
    },
    {
      id: 'CASE-002',
      caseTitle: 'Estate Planning - Williams',
      lawyerName: 'Sarah Mitchell',
      nextHearing: '2026-05-22',
      status: 'In Review',
      statusColor: '#F59E0B'
    },
    {
      id: 'CASE-003',
      caseTitle: 'Contract Dispute Resolution',
      lawyerName: 'Michael Chen',
      nextHearing: '2026-05-18',
      status: 'Pending',
      statusColor: '#EF4444'
    },
    {
      id: 'CASE-004',
      caseTitle: 'Real Estate Transaction',
      lawyerName: 'Emily Roberts',
      nextHearing: '2026-06-05',
      status: 'Active',
      statusColor: '#10B981'
    }
  ];

  // Dummy data for upcoming hearings
  const upcomingHearings = [
    {
      id: 1,
      caseId: 'CASE-001',
      date: '2026-05-15',
      time: '10:00 AM',
      location: 'Courthouse - Room 201',
      judge: 'Hon. Patricia Williams'
    },
    {
      id: 2,
      caseId: 'CASE-003',
      date: '2026-05-18',
      time: '2:00 PM',
      location: 'Virtual - Zoom Link',
      judge: 'Hon. Robert Taylor'
    },
    {
      id: 3,
      caseId: 'CASE-002',
      date: '2026-05-22',
      time: '11:30 AM',
      location: 'Courthouse - Room 105',
      judge: 'Hon. Margaret Brown'
    }
  ];

  // Dummy data for notifications
  const notifications = [
    {
      id: 1,
      message: 'New document uploaded: "Deposition Summary"',
      timestamp: '2 hours ago',
      type: 'document',
      read: false
    },
    {
      id: 2,
      message: 'Your hearing for CASE-001 is scheduled for May 15, 2026',
      timestamp: '1 day ago',
      type: 'hearing',
      read: false
    },
    {
      id: 3,
      message: 'Document "Motion to Dismiss" requires your review',
      timestamp: '3 days ago',
      type: 'action',
      read: true
    },
    {
      id: 4,
      message: 'Case update: New evidence submitted by opposing counsel',
      timestamp: '5 days ago',
      type: 'case',
      read: true
    }
  ];

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const clientName = 'Sarah Johnson';

  return (
    <div className={`dashboard-container theme-${theme}`}>
      <Navbar 
        onThemeToggle={toggleTheme} 
        theme={theme}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div className="dashboard-content">
        <Sidebar isOpen={sidebarOpen} />
        <main className="dashboard-main">
          {/* Welcome Section */}
          <section className="welcome-section">
            <div className="welcome-content">
              <h1>Welcome back, <span className="client-name">{clientName}</span>!</h1>
              <p>Here's an overview of your legal cases and upcoming events</p>
            </div>
            <div className="welcome-badge">
              <span>🎯</span> All systems operational
            </div>
          </section>

          {/* Statistics Cards */}
          <section className="stats-section">
            <h2>Quick Overview</h2>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon" style={{ background: `${stat.color}20` }}>
                    <span className="icon-text">{stat.icon}</span>
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">{stat.label}</p>
                    <p className="stat-value">{stat.value}</p>
                  </div>
                  <div className="stat-indicator" style={{ background: stat.color }}></div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Cases Table Section */}
          <section className="cases-section">
            <div className="section-header">
              <h2>Recent Cases</h2>
              <a href="#" className="view-all-link">View All →</a>
            </div>
            <div className="cases-table-wrapper">
              <table className="cases-table">
                <thead>
                  <tr>
                    <th>Case ID</th>
                    <th>Case Title</th>
                    <th>Lawyer Name</th>
                    <th>Next Hearing</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentCases.map((caseItem) => (
                    <tr key={caseItem.id} className="case-row">
                      <td>
                        <span className="case-id-badge">{caseItem.id}</span>
                      </td>
                      <td>
                        <span className="case-title">{caseItem.caseTitle}</span>
                      </td>
                      <td>{caseItem.lawyerName}</td>
                      <td>
                        <span className="date-badge">
                          📅 {new Date(caseItem.nextHearing).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </span>
                      </td>
                      <td>
                        <span 
                          className="status-badge" 
                          style={{ background: `${caseItem.statusColor}20`, color: caseItem.statusColor }}
                        >
                          {caseItem.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Two Column Layout for Hearings and Notifications */}
          <div className="bottom-sections">
            {/* Upcoming Hearings Section */}
            <section className="hearings-section">
              <div className="section-header">
                <h2>📅 Upcoming Hearings</h2>
              </div>
              <div className="hearings-list">
                {upcomingHearings.map((hearing) => (
                  <div key={hearing.id} className="hearing-card">
                    <div className="hearing-date">
                      <p className="hearing-day">
                        {new Date(hearing.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="hearing-time">{hearing.time}</p>
                    </div>
                    <div className="hearing-details">
                      <p className="hearing-case">{hearing.caseId}</p>
                      <p className="hearing-location">📍 {hearing.location}</p>
                      <p className="hearing-judge">🧑‍⚖️ {hearing.judge}</p>
                    </div>
                    <button className="view-details-btn">→</button>
                  </div>
                ))}
              </div>
            </section>

            {/* Notifications Panel */}
            <section className="notifications-section">
              <div className="section-header">
                <h2>🔔 Notifications</h2>
                <a href="#" className="view-all-link">View All</a>
              </div>
              <div className="notifications-list">
                {notifications.slice(0, 4).map((notification) => (
                  <NotificationCard 
                    key={notification.id} 
                    notification={notification}
                  />
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

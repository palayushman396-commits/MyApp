import React, { useState, useEffect } from 'react';
import Navbar from '../components/Dashboard/Navbar';
import Sidebar from '../components/Dashboard/Sidebar';
import CaseCard from '../components/CaseCard';
import CaseDetailsModal from '../components/CaseDetailsModal';
import HearingCard from '../components/HearingCard';
import NotificationCard from '../components/Dashboard/NotificationCard';
import StatusBadge from '../components/StatusBadge';
import {
  dummyCases,
  caseStatistics,
  upcomingHearings,
  recentNotifications,
} from '../data/dummyCaseData';
import './MyCasesPage.css';

const MyCasesPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('light');
  const [selectedCase, setSelectedCase] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [filteredCases, setFilteredCases] = useState(dummyCases);

  // Theme Toggle
  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.body.className = theme === 'light' ? 'dark-theme' : 'light-theme';
  };

  // Sidebar Toggle
  const handleMenuToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Case Filtering Logic
  useEffect(() => {
    let filtered = dummyCases.filter((caseItem) => {
      const matchesSearch = caseItem.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
        caseItem.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.caseType.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === 'All' || caseItem.status === filterStatus;

      const matchesType = filterType === 'All' || caseItem.caseType === filterType;

      return matchesSearch && matchesStatus && matchesType;
    });

    // Sorting
    if (sortBy === 'latest') {
      filtered.sort(
        (a, b) => new Date(b.filingDate) - new Date(a.filingDate)
      );
    } else if (sortBy === 'oldest') {
      filtered.sort(
        (a, b) => new Date(a.filingDate) - new Date(b.filingDate)
      );
    } else if (sortBy === 'hearing') {
      filtered.sort(
        (a, b) => new Date(a.nextHearingDate) - new Date(b.nextHearingDate)
      );
    }

    setFilteredCases(filtered);
  }, [searchQuery, filterStatus, filterType, sortBy]);

  const getCaseTypes = () => {
    const types = [...new Set(dummyCases.map((c) => c.caseType))];
    return types;
  };

  return (
    <div className={`mycases-page theme-${theme}`}>
      <Navbar
        onThemeToggle={handleThemeToggle}
        theme={theme}
        onMenuToggle={handleMenuToggle}
      />

      <div className="page-container">
        <Sidebar isOpen={sidebarOpen} />

        <main className="main-content">
          {/* Page Header */}
          <div className="page-header">
            <div className="header-content">
              <h1 className="page-title">My Legal Cases</h1>
              <p className="page-subtitle">
                Track all your active, pending, and closed legal cases
              </p>
            </div>
          </div>

          {/* Statistics Section */}
          <section className="statistics-section">
            <div className="statistics-grid">
              <div className="stat-card">
                <div className="stat-icon">📊</div>
                <div className="stat-info">
                  <p className="stat-label">Total Cases</p>
                  <p className="stat-value">{caseStatistics.totalCases}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">🟦</div>
                <div className="stat-info">
                  <p className="stat-label">Active Cases</p>
                  <p className="stat-value">{caseStatistics.activeCases}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">⏳</div>
                <div className="stat-info">
                  <p className="stat-label">Pending Cases</p>
                  <p className="stat-value">{caseStatistics.pendingCases}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✓</div>
                <div className="stat-info">
                  <p className="stat-label">Closed Cases</p>
                  <p className="stat-value">{caseStatistics.closedCases}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <p className="stat-label">Upcoming Hearings</p>
                  <p className="stat-value">{caseStatistics.upcomingHearings}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="filter-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search cases by title, ID, or type..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="filters">
              <div className="filter-group">
                <label>Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Case Type</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="filter-select"
                >
                  <option value="All">All</option>
                  {getCaseTypes().map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="hearing">Next Hearing</option>
                </select>
              </div>
            </div>
          </section>

          {/* Cases Grid */}
          <section className="cases-section">
            <div className="section-header">
              <h2 className="section-title">
                Legal Cases ({filteredCases.length})
              </h2>
            </div>

            {filteredCases.length > 0 ? (
              <div className="cases-grid">
                {filteredCases.map((caseItem) => (
                  <CaseCard
                    key={caseItem.id}
                    caseData={caseItem}
                    onViewDetails={setSelectedCase}
                  />
                ))}
              </div>
            ) : (
              <div className="no-cases">
                <p className="no-cases-icon">📋</p>
                <p className="no-cases-text">
                  No cases found matching your search criteria
                </p>
              </div>
            )}
          </section>

          {/* Upcoming Hearings Section */}
          <section className="hearings-section">
            <div className="section-header">
              <h2 className="section-title">📅 Upcoming Hearings</h2>
              <p className="section-subtitle">
                {upcomingHearings.length} hearings scheduled
              </p>
            </div>

            <div className="hearings-container">
              {upcomingHearings.length > 0 ? (
                upcomingHearings.map((hearing) => (
                  <HearingCard key={hearing.id} hearing={hearing} />
                ))
              ) : (
                <p className="no-hearings">No upcoming hearings</p>
              )}
            </div>
          </section>

          {/* Recent Notifications Section */}
          <section className="notifications-section">
            <div className="section-header">
              <h2 className="section-title">🔔 Recent Updates</h2>
              <p className="section-subtitle">
                Latest updates related to your cases
              </p>
            </div>

            <div className="notifications-container">
              {recentNotifications.length > 0 ? (
                recentNotifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    notification={{
                      ...notification,
                      timestamp: notification.date,
                      read: false,
                    }}
                  />
                ))
              ) : (
                <p className="no-notifications">No recent notifications</p>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Case Details Modal */}
      {selectedCase && (
        <CaseDetailsModal
          caseData={selectedCase}
          onClose={() => setSelectedCase(null)}
        />
      )}
    </div>
  );
};

export default MyCasesPage;

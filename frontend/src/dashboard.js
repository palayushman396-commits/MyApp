import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [stats, setStats] = useState({
    totalCases: 0,
    pendingCases: 0,
    totalFees: 0,
    totalDues: 0,
  });
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mock data - replace with actual API call
      const mockCases = [
        {
          id: 1,
          caseNumber: 'CS/2024/001',
          clientName: 'John Doe',
          caseType: 'Civil Suit',
          status: 'Pending Hearing',
          filedDate: '2024-01-15',
          nextHearing: '2024-06-20',
          fees: 50000,
          paid: 30000,
          dues: 20000,
          priority: 'High',
        },
        {
          id: 2,
          caseNumber: 'CR/2024/015',
          clientName: 'Jane Smith',
          caseType: 'Criminal',
          status: 'Investigation',
          filedDate: '2024-02-10',
          nextHearing: '2024-07-05',
          fees: 75000,
          paid: 75000,
          dues: 0,
          priority: 'Medium',
        },
        {
          id: 3,
          caseNumber: 'FAM/2024/008',
          clientName: 'Alice Johnson',
          caseType: 'Family Law',
          status: 'Pending Document',
          filedDate: '2024-03-05',
          nextHearing: '2024-06-15',
          fees: 35000,
          paid: 10000,
          dues: 25000,
          priority: 'High',
        },
      ];

      setCases(mockCases);
      calculateStats(mockCases);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const calculateStats = (caseList) => {
    const totalCases = caseList.length;
    const pendingCases = caseList.filter(c => c.dues > 0).length;
    const totalFees = caseList.reduce((sum, c) => sum + c.fees, 0);
    const totalDues = caseList.reduce((sum, c) => sum + c.dues, 0);

    setStats({
      totalCases,
      pendingCases,
      totalFees,
      totalDues,
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Hearing':
        return '#ff9800';
      case 'Investigation':
        return '#2196f3';
      case 'Pending Document':
        return '#f44336';
      case 'Closed':
        return '#4caf50';
      default:
        return '#757575';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="nyaysetu-dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1 className="system-name">⚖️ NyaySetu</h1>
          <p className="system-subtitle">Lawyer Case Management System</p>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card total-cases">
            <div className="stat-icon">📋</div>
            <div className="stat-info">
              <p className="stat-label">Total Cases</p>
              <p className="stat-value">{stats.totalCases}</p>
            </div>
          </div>

          <div className="stat-card pending-cases">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <p className="stat-label">Pending Cases</p>
              <p className="stat-value">{stats.pendingCases}</p>
            </div>
          </div>

          <div className="stat-card total-fees">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <p className="stat-label">Total Fees</p>
              <p className="stat-value">₹{stats.totalFees.toLocaleString()}</p>
            </div>
          </div>

          <div className="stat-card total-dues">
            <div className="stat-icon">⚠️</div>
            <div className="stat-info">
              <p className="stat-label">Total Dues</p>
              <p className="stat-value">₹{stats.totalDues.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="main-content">
        {/* Cases Table */}
        <div className="cases-section">
          <h2>Pending Cases</h2>
          <div className="cases-table-container">
            <table className="cases-table">
              <thead>
                <tr>
                  <th>Case Number</th>
                  <th>Client Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Next Hearing</th>
                  <th>Priority</th>
                  <th>Dues</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((caseItem) => (
                  <tr key={caseItem.id} className="case-row">
                    <td className="case-number">{caseItem.caseNumber}</td>
                    <td>{caseItem.clientName}</td>
                    <td>{caseItem.caseType}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(caseItem.status) }}
                      >
                        {caseItem.status}
                      </span>
                    </td>
                    <td>{new Date(caseItem.nextHearing).toLocaleDateString()}</td>
                    <td>
                      <span className={`priority-badge ${getPriorityClass(caseItem.priority)}`}>
                        {caseItem.priority}
                      </span>
                    </td>
                    <td className={caseItem.dues > 0 ? 'dues-pending' : 'dues-paid'}>
                      ₹{caseItem.dues.toLocaleString()}
                    </td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() => setSelectedCase(caseItem)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline & Case Details */}
        <div className="sidebar-section">
          {/* Timeline */}
          <div className="timeline-card">
            <h3>📅 Upcoming Hearings</h3>
            <div className="timeline">
              {cases.map((caseItem, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <p className="timeline-date">
                      {new Date(caseItem.nextHearing).toLocaleDateString()}
                    </p>
                    <p className="timeline-case">{caseItem.caseNumber}</p>
                    <p className="timeline-desc">{caseItem.caseType}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Case Details */}
          {selectedCase && (
            <div className="case-details-card">
              <h3>Case Details</h3>
              <div className="details-content">
                <div className="detail-row">
                  <span className="detail-label">Case Number:</span>
                  <span className="detail-value">{selectedCase.caseNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Client:</span>
                  <span className="detail-value">{selectedCase.clientName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{selectedCase.status}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Filed Date:</span>
                  <span className="detail-value">
                    {new Date(selectedCase.filedDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Total Fees:</span>
                  <span className="detail-value">₹{selectedCase.fees.toLocaleString()}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Amount Paid:</span>
                  <span className="detail-value">₹{selectedCase.paid.toLocaleString()}</span>
                </div>
                <div className="detail-row dues-row">
                  <span className="detail-label">Outstanding Dues:</span>
                  <span className="detail-value">₹{selectedCase.dues.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(selectedCase.paid / selectedCase.fees) * 100}%`,
                    }}
                  ></div>
                </div>
                <p className="progress-text">
                  {Math.round((selectedCase.paid / selectedCase.fees) * 100)}% Paid
                </p>
                <button className="close-btn" onClick={() => setSelectedCase(null)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

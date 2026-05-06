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
const dashboardData = {
  activeCases: 8,
  pendingFeesTotal: 42500,
  hearings: [
    {
      caseId: "LP-1023",
      client: "Anjali Verma",
      hearingDate: "2026-05-09",
      court: "Family Court",
      status: "Scheduled",
    },
    {
      caseId: "LP-1091",
      client: "Rohan Sharma",
      hearingDate: "2026-05-14",
      court: "Civil Court",
      status: "Reminder sent",
    },
    {
      caseId: "LP-1104",
      client: "Nisha Patel",
      hearingDate: "2026-05-22",
      court: "Commercial Court",
      status: "Confirmed",
    },
    {
      caseId: "LP-1120",
      client: "Sachin Mehta",
      hearingDate: "2026-06-03",
      court: "District Court",
      status: "Scheduled",
    },
  ],
  cases: [
    {
      caseId: "LP-1023",
      client: "Anjali Verma",
      type: "Family",
      status: "Active",
    },
    {
      caseId: "LP-1091",
      client: "Rohan Sharma",
      type: "Civil",
      status: "Active",
    },
    {
      caseId: "LP-1104",
      client: "Nisha Patel",
      type: "Corporate",
      status: "Active",
    },
    {
      caseId: "LP-1116",
      client: "Mira Bose",
      type: "Property",
      status: "Active",
    },
  ],
  pendingFees: [
    { client: "Anjali Verma", amount: 12500, dueDate: "2026-05-10" },
    { client: "Rohan Sharma", amount: 9800, dueDate: "2026-05-18" },
    { client: "Nisha Patel", amount: 12000, dueDate: "2026-05-25" },
    { client: "Sachin Mehta", amount: 8200, dueDate: "2026-06-05" },
  ],
};

const calendarState = {
  currentDate: new Date(),
};

function formatCurrency(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatDateLong(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function addNewCase() {
  const caseId = document.getElementById("case-id").value.trim();
  const clientName = document.getElementById("client-name").value.trim();
  const hearingDate = document.getElementById("hearing-date").value;
  const courtName = document.getElementById("court-name").value.trim();
  const caseStatus = document.getElementById("case-status").value;

  // Validate inputs
  if (!caseId || !clientName || !hearingDate || !courtName || !caseStatus) {
    alert("Please fill all fields");
    return;
  }

  // Add to hearings array
  dashboardData.hearings.push({
    caseId: caseId,
    client: clientName,
    hearingDate: hearingDate,
    court: courtName,
    status: caseStatus,
  });

  // Add to cases array if not already present
  const caseExists = dashboardData.cases.some((c) => c.caseId === caseId);
  if (!caseExists) {
    dashboardData.cases.push({
      caseId: caseId,
      client: clientName,
      type: "General",
      status: "Active",
    });
  }

  // Close modal and reset form
  const addCaseModal = document.getElementById("add-case-modal");
  const addCaseForm = document.getElementById("add-case-form");
  addCaseModal.classList.add("hidden");
  addCaseForm.reset();

  // Update dashboard display
  renderSummaryCards();
  renderHearingsTable();
  renderCasesTable();
  renderCalendar();

  // Show success message
  alert(`Case ${caseId} added successfully!`);
}


function initDashboard() {
  renderSummaryCards();
  renderHearingsTable();
  renderCasesTable();
  renderFeesList();
  renderCalendar();

  // Add Case Modal handlers
  const addCaseBtn = document.getElementById("add-case-btn");
  const addCaseModal = document.getElementById("add-case-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const addCaseForm = document.getElementById("add-case-form");
  const modalOverlay = document.querySelector(".modal-overlay");

  addCaseBtn.addEventListener("click", () => {
    addCaseModal.classList.remove("hidden");
  });

  closeModalBtn.addEventListener("click", () => {
    addCaseModal.classList.add("hidden");
    addCaseForm.reset();
  });

  modalOverlay.addEventListener("click", () => {
    addCaseModal.classList.add("hidden");
    addCaseForm.reset();
  });

  addCaseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addNewCase();
  });

  document.getElementById("calendar-prev").addEventListener("click", () => {
    calendarState.currentDate.setMonth(calendarState.currentDate.getMonth() - 1);
    renderCalendar();
  });

  document.getElementById("calendar-next").addEventListener("click", () => {
    calendarState.currentDate.setMonth(calendarState.currentDate.getMonth() + 1);
    renderCalendar();
  });
}

function renderSummaryCards() {
  const hearingCount = dashboardData.hearings.length;
  const nextHearing = dashboardData.hearings
    .slice()
    .sort((a, b) => new Date(a.hearingDate) - new Date(b.hearingDate))[0];

  document.getElementById("summary-active-cases").textContent = dashboardData.activeCases;
  document.getElementById("summary-hearings").textContent = hearingCount;
  document.getElementById("summary-fees").textContent = formatCurrency(dashboardData.pendingFeesTotal);
  document.getElementById("summary-next-hearing").textContent = nextHearing
    ? `${nextHearing.hearingDate} • ${nextHearing.client}`
    : "No hearings yet";
}

function renderHearingsTable() {
  const body = document.getElementById("hearings-table-body");
  body.innerHTML = dashboardData.hearings
    .map((hearing) => {
      return `
        <tr>
          <td>${hearing.caseId}</td>
          <td>${hearing.client}</td>
          <td>${formatDateLong(hearing.hearingDate)}</td>
          <td>${hearing.court}</td>
          <td>${hearing.status}</td>
        </tr>
      `;
    })
    .join("");
}

function renderCasesTable() {
  const body = document.getElementById("cases-table-body");
  body.innerHTML = dashboardData.cases
    .map((caseItem) => {
      return `
        <tr>
          <td>${caseItem.caseId}</td>
          <td>${caseItem.client}</td>
          <td>${caseItem.type}</td>
          <td>${caseItem.status}</td>
        </tr>
      `;
    })
    .join("");
}

function renderFeesList() {
  const container = document.getElementById("fees-list");
  container.innerHTML = dashboardData.pendingFees
    .map((fee) => {
      return `
        <div class="fee-card">
          <div>
            <strong>${fee.client}</strong>
            <div>Due: ${formatDateLong(fee.dueDate)}</div>
          </div>
          <div>${formatCurrency(fee.amount)}</div>
        </div>
      `;
    })
    .join("");
}

function renderCalendar() {
  const calendarRoot = document.getElementById("calendar");
  const now = new Date(calendarState.currentDate.getTime());
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  document.getElementById("calendar-month").textContent = now.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const firstOfMonth = new Date(currentYear, currentMonth, 1);
  const startDay = firstOfMonth.getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const monthHearings = dashboardData.hearings.filter((hearing) => {
    const date = new Date(hearing.hearingDate);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const grid = [];
  for (let i = 0; i < startDay; i += 1) {
    grid.push(`<div class="calendar-header"></div>`);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayEvents = monthHearings.filter((hearing) => hearing.hearingDate === dateKey);
    const eventHtml = dayEvents.length
      ? `<div class="event-badge">${dayEvents.length} hearing${dayEvents.length > 1 ? "s" : ""}</div>`
      : "";

    grid.push(`
      <div class="calendar-day" ${dayEvents.length ? "data-has-event\" title=\"Hearing scheduled\"" : ""}>
        <span>${day}</span>
        ${eventHtml}
      </div>
    `);
  }

  calendarRoot.innerHTML = `
    <div class="calendar-header">Sun</div>
    <div class="calendar-header">Mon</div>
    <div class="calendar-header">Tue</div>
    <div class="calendar-header">Wed</div>
    <div class="calendar-header">Thu</div>
    <div class="calendar-header">Fri</div>
    <div class="calendar-header">Sat</div>
    ${grid.join("")}
  `;
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", initDashboard);
}

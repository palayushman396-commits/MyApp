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

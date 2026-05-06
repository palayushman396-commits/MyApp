<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LexPilot Lawyer Dashboard</title>
  <link rel="stylesheet" href="dashboard.css" />
</head>
<body>
  <div class="page-shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">LexPilot</p>
        <h1>Lawyer Dashboard</h1>
        <p class="subtitle">Overview of hearings, active cases, pending fees, and your monthly calendar.</p>
      </div>
      <div class="topbar-actions">
        <button class="primary-button" id="add-case-btn">New case</button>
      </div>
    </header>

    <!-- Add Case Modal -->
    <div id="add-case-modal" class="modal hidden">
      <div class="modal-overlay"></div>
      <div class="modal-content">
        <div class="modal-header">
          <h2>Add New Hearing</h2>
          <button class="close-btn" id="close-modal">&times;</button>
        </div>
        <form id="add-case-form" class="form-grid">
          <div class="form-group">
            <label for="case-id">Case ID</label>
            <input type="text" id="case-id" placeholder="e.g., LP-1023" required />
          </div>
          <div class="form-group">
            <label for="client-name">Client Name</label>
            <input type="text" id="client-name" placeholder="e.g., Anjali Verma" required />
          </div>
          <div class="form-group">
            <label for="hearing-date">Hearing Date</label>
            <input type="date" id="hearing-date" required />
          </div>
          <div class="form-group">
            <label for="court-name">Court</label>
            <input type="text" id="court-name" placeholder="e.g., District Court" required />
          </div>
          <div class="form-group">
            <label for="case-status">Status</label>
            <select id="case-status" required>
              <option value="">Select status</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Reminder sent">Reminder sent</option>
              <option value="Postponed">Postponed</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit" class="primary-button">Add Case</button>
            <button type="reset" class="secondary-button">Clear</button>
          </div>
        </form>
      </div>
    </div>

    <section class="summary-row">
      <div class="summary-card summary-card--primary">
        <p>Active cases</p>
        <h2 id="summary-active-cases">0</h2>
      </div>
      <div class="summary-card summary-card--accent">
        <p>Upcoming hearings</p>
        <h2 id="summary-hearings">0</h2>
      </div>
      <div class="summary-card summary-card--warning">
        <p>Pending fees</p>
        <h2 id="summary-fees">₹0</h2>
      </div>
      <div class="summary-card summary-card--success">
        <p>Next hearing</p>
        <h2 id="summary-next-hearing">—</h2>
      </div>
    </section>

    <main class="dashboard-grid">
      <section class="panel panel--wide">
        <div class="panel-header">
          <div>
            <h2>Upcoming hearings</h2>
            <p>Stay on top of the next courtroom dates.</p>
          </div>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Client</th>
                <th>Hearing date</th>
                <th>Court</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="hearings-table-body"></tbody>
          </table>
        </div>
      </section>

      <section class="panel panel--tall">
        <div class="panel-header">
          <div>
            <h2>Monthly calendar</h2>
            <p>Click or hover on a date to review hearings.</p>
          </div>
          <div class="calendar-controls">
            <button id="calendar-prev">◀</button>
            <span id="calendar-month"></span>
            <button id="calendar-next">▶</button>
          </div>
        </div>
        <div class="calendar" id="calendar"></div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <h2>Active cases</h2>
          <p>All open matters currently being handled.</p>
        </div>
        <div class="table-wrap">
          <table class="data-table">
            <thead>
              <tr>
                <th>Case</th>
                <th>Client</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody id="cases-table-body"></tbody>
          </table>
        </div>
      </section>

      <section class="panel">
        <div class="panel-header">
          <h2>Pending fees</h2>
          <p>Amounts waiting to be collected by your firm.</p>
        </div>
        <div class="fee-list" id="fees-list"></div>
      </section>
    </main>
  </div>

  <script src="../src/dashboard.js"></script>
</body>
</html>

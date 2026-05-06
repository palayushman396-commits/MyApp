# LexPilot Dashboard - Integration Guide

This guide will help you integrate the LexPilot Client Dashboard into your React application.

## Quick Start

### Option 1: Using the ClientDashboard Page Component

The simplest way to use the dashboard is through the pre-built `clientdashboard.js` page component.

**Step 1: Update your App.js**

```javascript
import React from 'react';
import ClientDashboard from './pages/clientdashboard';
import './App.css';

function App() {
  return <ClientDashboard />;
}

export default App;
```

**Step 2: Ensure global styles are set**

Add this to your `index.css` or `App.css`:

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #root {
  width: 100%;
  height: 100%;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

### Option 2: Using Individual Components

If you want to build a custom layout, you can import individual components:

```javascript
import {
  DashboardPage,
  Navbar,
  Sidebar,
  CaseCard,
  NotificationCard
} from './components/Dashboard';

function CustomLayout() {
  return (
    <div>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main>
          {/* Your custom content */}
        </main>
      </div>
    </div>
  );
}
```

## Component Usage Examples

### Example 1: Display a Single Case

```javascript
import { CaseCard } from './components/Dashboard';

function MyComponent() {
  const caseData = {
    id: 'CASE-001',
    caseTitle: 'Smith vs. Johnson',
    lawyerName: 'John Davidson',
    nextHearing: '2026-05-15',
    status: 'Active',
    description: 'Contract dispute in commercial law',
    progress: 75
  };

  return <CaseCard caseData={caseData} />;
}
```

### Example 2: Display Multiple Notifications

```javascript
import { NotificationCard } from './components/Dashboard';

function NotificationsList() {
  const notifications = [
    {
      id: 1,
      message: 'New document uploaded',
      timestamp: '2 hours ago',
      type: 'document',
      read: false
    },
    {
      id: 2,
      message: 'Hearing scheduled',
      timestamp: '1 day ago',
      type: 'hearing',
      read: false
    }
  ];

  return (
    <div>
      {notifications.map(notif => (
        <NotificationCard key={notif.id} notification={notif} />
      ))}
    </div>
  );
}
```

### Example 3: Build Custom Navbar

```javascript
import { Navbar } from './components/Dashboard';
import { useState } from 'react';

function Header() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <Navbar 
      theme={theme}
      onThemeToggle={toggleTheme}
      onMenuToggle={() => console.log('Menu toggled')}
    />
  );
}
```

## Customization Examples

### Change Dashboard Greeting

Edit `DashboardPage.js`:

```javascript
const clientName = 'Your Client Name'; // Change this
```

### Add More Statistics

Edit the `stats` array in `DashboardPage.js`:

```javascript
const stats = [
  { label: 'Total Cases', value: '12', icon: '📋', color: '#3B82F6' },
  { label: 'Upcoming Hearings', value: '3', icon: '📅', color: '#10B981' },
  { label: 'Pending Documents', value: '5', icon: '📄', color: '#F59E0B' },
  { label: 'Notifications', value: '8', icon: '🔔', color: '#8B5CF6' },
  { label: 'Active Lawyers', value: '4', icon: '👨‍⚖️', color: '#EC4899' }, // NEW
];
```

### Update Navigation Items

Edit `Sidebar.js`:

```javascript
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'cases', label: 'My Cases', icon: '📋' },
  { id: 'documents', label: 'Documents', icon: '📄' },
  { id: 'hearings', label: 'Hearings', icon: '📅' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'billing', label: 'Billing', icon: '💳' }, // NEW
];
```

### Modify Color Scheme

Edit CSS files to change primary colors:

```css
/* Change gradient color */
.welcome-section {
  background: linear-gradient(135deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}

/* Change accent colors */
.stat-card:hover {
  border-color: #YOUR_COLOR;
}
```

### Add Custom CSS Classes

```css
/* Add to DashboardPage.css */
.custom-section {
  padding: 24px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.dashboard-container.theme-dark .custom-section {
  background: #2a2a3e;
}
```

## Connecting to Backend (Future)

When ready to connect to a backend API, you'll need to:

1. **Replace dummy data with API calls:**

```javascript
// In DashboardPage.js
const [cases, setCases] = useState([]);
const [stats, setStats] = useState([]);

useEffect(() => {
  // Fetch from API
  fetch('/api/cases')
    .then(res => res.json())
    .then(data => setCases(data));
}, []);
```

2. **Update component props to use API data:**

```javascript
{recentCases.map((caseItem) => (
  <CaseRow key={caseItem.id} caseItem={caseItem} />
))}
```

3. **Handle loading and error states:**

```javascript
if (loading) return <LoadingSpinner />;
if (error) return <ErrorMessage error={error} />;
```

## Responsive Design Testing

To test responsive design:

1. **Desktop**: Open in browser, full width
2. **Tablet**: Chrome DevTools, iPad dimensions (768px)
3. **Mobile**: Chrome DevTools, iPhone 12 (390px)
4. **Small Mobile**: Chrome DevTools, iPhone SE (375px)

## Dark Mode Testing

Click the theme toggle button in the navbar to switch between light and dark themes. All components automatically adapt their styles.

## File Locations

```
my-app/
├── frontend/
│   ├── src/
│   │   ├── App.js (main file)
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css
│   │   ├── pages/
│   │   │   └── clientdashboard.js
│   │   └── components/
│   │       └── Dashboard/
│   │           ├── DashboardPage.js
│   │           ├── DashboardPage.css
│   │           ├── Navbar.js
│   │           ├── Navbar.css
│   │           ├── Sidebar.js
│   │           ├── Sidebar.css
│   │           ├── CaseCard.js
│   │           ├── CaseCard.css
│   │           ├── NotificationCard.js
│   │           ├── NotificationCard.css
│   │           ├── index.js
│   │           └── README.md
```

## Troubleshooting

### Dashboard not showing?

1. Check file paths in imports
2. Ensure all CSS files are in the same directory
3. Check browser console for errors
4. Verify React version compatibility

### Styling looks broken?

1. Clear browser cache (Ctrl+Shift+Delete)
2. Check CSS file is being loaded
3. Verify CSS file path in import statement
4. Check for CSS conflicts

### Theme not toggling?

1. Verify theme state is being passed to Navbar
2. Check onThemeToggle callback is implemented
3. Ensure theme-dark classes exist in CSS

### Mobile layout broken?

1. Add viewport meta tag in HTML: `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
2. Check media queries in CSS files
3. Test on actual mobile device

## Next Steps

1. ✅ Integrate dashboard into your app
2. ⬜ Connect to backend APIs
3. ⬜ Add authentication
4. ⬜ Implement real data
5. ⬜ Add more features (filtering, sorting, etc.)
6. ⬜ Deploy to production

---

For more details, refer to the [Dashboard README](./README.md)

# LexPilot Client Dashboard UI

A modern, professional, and fully responsive Client Dashboard UI built with React.js for the LexPilot legal-tech platform.

## 📁 Project Structure

```
frontend/
└── src/
    ├── pages/
    │   └── clientdashboard.js          # Main dashboard page entry point
    └── components/
        └── Dashboard/
            ├── DashboardPage.js         # Main dashboard component
            ├── DashboardPage.css        # Dashboard main styles
            ├── Navbar.js                # Top navigation bar
            ├── Navbar.css               # Navbar styles
            ├── Sidebar.js               # Side navigation
            ├── Sidebar.css              # Sidebar styles
            ├── CaseCard.js              # Reusable case card component
            ├── CaseCard.css             # Case card styles
            ├── NotificationCard.js      # Reusable notification component
            ├── NotificationCard.css     # Notification styles
            └── index.js                 # Components export index
```

## 🚀 Features

### Core Dashboard Sections

1. **Top Navbar**
   - LexPilot logo with icon
   - Search bar for cases and documents
   - Theme toggle (Light/Dark mode)
   - Notifications bell with badge
   - User profile menu with dropdown

2. **Sidebar Navigation**
   - Main navigation items (Dashboard, Cases, Documents, Hearings, Notifications)
   - Settings section (Profile, Settings)
   - Help support box
   - Active state indicators
   - Smooth animations

3. **Main Dashboard Area**
   - Welcome section with personalized greeting
   - Statistics cards (4 metrics with icons and colors)
   - Recent cases table with sortable columns
   - Upcoming hearings section
   - Notifications panel

### Design Features

- ✨ **Modern UI**: Clean, professional design inspired by real SaaS applications
- 🎨 **Theme Support**: Light and dark mode with smooth transitions
- 📱 **Responsive Design**: Fully responsive from desktop to mobile (480px+)
- 🎭 **Beautiful Icons**: Uses emoji icons for universal compatibility
- 🎯 **Interactive Elements**: Hover effects, animations, and smooth transitions
- 📊 **Dummy Data**: Pre-populated with realistic legal case data
- ♿ **Accessible**: Semantic HTML and proper ARIA attributes

## 📋 Component Documentation

### DashboardPage.js
Main dashboard component that orchestrates all sub-components.

**Features:**
- Manages theme state (light/dark)
- Manages sidebar open/close state
- Contains all dummy data
- Responsive grid layouts
- Statistics cards
- Cases table
- Hearings list
- Notifications panel

**Props:** None (standalone component)

```javascript
import DashboardPage from '../components/Dashboard/DashboardPage';

<DashboardPage />
```

### Navbar.js
Top navigation bar component.

**Features:**
- Logo and branding
- Search functionality
- Theme toggle button
- Notifications with badge
- User profile menu with dropdown
- Responsive hamburger menu

**Props:**
- `onThemeToggle` (function): Callback when theme is toggled
- `theme` (string): Current theme ('light' or 'dark')
- `onMenuToggle` (function): Callback for sidebar toggle

```javascript
<Navbar 
  onThemeToggle={toggleTheme}
  theme={theme}
  onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
/>
```

### Sidebar.js
Left navigation sidebar component.

**Features:**
- Navigation items with icons
- Active state management
- Settings section
- Help box with CTA
- Smooth animations
- Responsive behavior

**Props:**
- `isOpen` (boolean): Controls sidebar visibility on mobile

```javascript
<Sidebar isOpen={sidebarOpen} />
```

### CaseCard.js
Reusable card component for displaying case information.

**Features:**
- Case header with ID and status badge
- Case details (lawyer, hearing date)
- Optional description
- Progress bar
- Action button

**Props:**
```javascript
{
  id: string,
  caseTitle: string,
  lawyerName: string,
  nextHearing: string (YYYY-MM-DD),
  status: string,
  description?: string,
  progress?: number (0-100)
}
```

**Example:**
```javascript
<CaseCard 
  caseData={{
    id: 'CASE-001',
    caseTitle: 'Smith vs. Johnson',
    lawyerName: 'John Davidson',
    nextHearing: '2026-05-15',
    status: 'Active',
    progress: 65
  }}
/>
```

### NotificationCard.js
Reusable component for displaying notifications.

**Features:**
- Type-specific icons and colors
- Timestamp display
- Mark as read functionality
- Unread state indicator
- Smooth transitions

**Props:**
```javascript
{
  id: number,
  message: string,
  timestamp: string,
  type: string ('document' | 'hearing' | 'action' | 'case' | 'message'),
  read: boolean
}
```

**Example:**
```javascript
<NotificationCard 
  notification={{
    id: 1,
    message: 'New document uploaded: "Deposition Summary"',
    timestamp: '2 hours ago',
    type: 'document',
    read: false
  }}
/>
```

## 🎨 Color Scheme

The dashboard uses a professional gradient color scheme:

- **Primary Gradient**: `#667eea` to `#764ba2` (Purple)
- **Success**: `#10B981` (Green)
- **Warning**: `#F59E0B` (Amber)
- **Danger**: `#EF4444` (Red)
- **Info**: `#3B82F6` (Blue)
- **Gray Scale**: `#1f2937` to `#f8f9fa`

## 📱 Responsive Breakpoints

```css
Desktop (1025px+): Full layout
Tablet (769px - 1024px): Optimized grid
Mobile (481px - 768px): Single column with sidebar overlay
Small Mobile (480px and below): Compact layout with icon-only sidebar
```

## 🎯 Usage

### Import in your App

```javascript
import ClientDashboard from './pages/clientdashboard';

function App() {
  return <ClientDashboard />;
}
```

### Or import components separately

```javascript
import { 
  DashboardPage, 
  CaseCard, 
  NotificationCard 
} from './components/Dashboard';

// Use individual components
```

## 🛠️ Customization

### Change Theme Colors

Edit the color values in CSS files:

```css
/* DashboardPage.css */
.welcome-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modify Dummy Data

Edit the data arrays in `DashboardPage.js`:

```javascript
const stats = [
  { label: 'Total Cases', value: '12', icon: '📋', color: '#3B82F6' },
  // Add more stats
];
```

### Add New Navigation Items

Update `Sidebar.js`:

```javascript
const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  // Add more items
];
```

## 🌓 Theme System

The dashboard supports light and dark themes. Toggle via the theme button in navbar.

**CSS Classes:**
- `.theme-light`: Light theme (default)
- `.theme-dark`: Dark theme

All components automatically adapt their styles based on the active theme.

## ✅ Key Features Implemented

- [x] Functional React components
- [x] Responsive dashboard layout
- [x] Clean modern styling with CSS
- [x] Professional SaaS-like design
- [x] Top Navbar with all required elements
- [x] Sidebar navigation with 7 items
- [x] Welcome section with client name
- [x] Statistics cards (4 metrics)
- [x] Recent cases table
- [x] Upcoming hearings section
- [x] Notifications panel
- [x] Dark/light theme toggle
- [x] Rounded cards and modern spacing
- [x] Reusable components
- [x] Responsive for laptop and mobile
- [x] Dummy data included
- [x] Icons throughout UI
- [x] Proper export/import statements
- [x] Clean, readable code

## 📝 Notes

- All data is dummy data for UI demonstration purposes
- No backend integration yet
- Components are fully functional for frontend use
- Styling follows modern UI/UX principles
- All components support both light and dark themes
- Responsive design tested on multiple breakpoints

## 🔧 Development

To use this dashboard in your React app:

1. Ensure React is installed
2. Copy the Dashboard folder to your components directory
3. Import and use `ClientDashboard` or individual components
4. Customize colors, data, and styling as needed

## 📦 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

**LexPilot Dashboard** - Built with ⚖️ for legal professionals

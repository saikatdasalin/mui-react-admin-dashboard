# Admin Dashboard

A modern, futuristic admin dashboard built with React and Material-UI featuring glassmorphism effects, smooth animations, and a fully responsive design.

## Tech Stack

- **React 19** with TypeScript
- **Material-UI (MUI) v7** - UI component library
- **React Router v7** - Client-side routing with lazy loading
- **Recharts** - Data visualization (area, bar, pie, radar, composed charts)
- **Framer Motion** - Page transitions and entrance animations
- **Emotion** - CSS-in-JS styling engine
- **Vite** - Build tool and dev server

## Features

- **Dashboard** - KPI cards, revenue charts, device distribution, visitor analytics, recent orders
- **Analytics** - Multi-chart visualizations with revenue vs expenses, radar charts, conversion rates, traffic sources
- **User Management** - Searchable and filterable user table
- **Products & Orders** - Product catalog and order tracking pages
- **Calendar** - Calendar integration
- **Messages** - Messaging interface
- **Reports** - Reporting tools
- **Settings** - App configuration with theme, notification, and security options
- **Profile** - User profile page
- **Dark / Light Theme** - Toggle with localStorage persistence
- **Responsive Design** - Adapts to mobile, tablet, and desktop

## Project Structure

```
src/
├── assets/          # Static assets (logo, images)
├── context/         # React Context providers
│   ├── ThemeContext.tsx     # Dark/light mode management
│   └── SidebarContext.tsx   # Sidebar collapse/drawer state
├── layout/          # Layout components
│   ├── MainLayout.tsx      # App shell (sidebar + navbar)
│   ├── Sidebar.tsx         # Navigation sidebar
│   └── Navbar.tsx          # Top navigation bar
├── pages/           # Page components
│   ├── Dashboard.tsx
│   ├── Analytics.tsx
│   ├── Users.tsx
│   ├── Products.tsx
│   ├── Orders.tsx
│   ├── Calendar.tsx
│   ├── Messages.tsx
│   ├── Reports.tsx
│   ├── Settings.tsx
│   └── Profile.tsx
├── theme/
│   └── theme.ts     # Light and dark theme configurations
├── App.tsx          # Root component with routing
└── main.tsx         # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
git clone <repository-url>
cd mui-react-admin-dashboard
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173`.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run lint
```

## License

MIT License - see [LICENSE](LICENSE) for details.

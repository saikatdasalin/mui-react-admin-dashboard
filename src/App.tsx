import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider } from './context/SidebarContext';
import MainLayout from './layout/MainLayout';

const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Users = React.lazy(() => import('./pages/Users'));
const Products = React.lazy(() => import('./pages/Products'));
const Orders = React.lazy(() => import('./pages/Orders'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Profile = React.lazy(() => import('./pages/Profile'));
const Calendar = React.lazy(() => import('./pages/Calendar'));
const Messages = React.lazy(() => import('./pages/Messages'));
const Reports = React.lazy(() => import('./pages/Reports'));

const PageLoader = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
    <CircularProgress />
  </Box>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Suspense fallback={<PageLoader />}><Dashboard /></Suspense>} />
              <Route path="analytics" element={<Suspense fallback={<PageLoader />}><Analytics /></Suspense>} />
              <Route path="analytics/charts" element={<Suspense fallback={<PageLoader />}><Analytics /></Suspense>} />
              <Route path="analytics/reports" element={<Suspense fallback={<PageLoader />}><Analytics /></Suspense>} />
              <Route path="users" element={<Suspense fallback={<PageLoader />}><Users /></Suspense>} />
              <Route path="products" element={<Suspense fallback={<PageLoader />}><Products /></Suspense>} />
              <Route path="orders" element={<Suspense fallback={<PageLoader />}><Orders /></Suspense>} />
              <Route path="settings" element={<Suspense fallback={<PageLoader />}><Settings /></Suspense>} />
              <Route path="profile" element={<Suspense fallback={<PageLoader />}><Profile /></Suspense>} />
              <Route path="calendar" element={<Suspense fallback={<PageLoader />}><Calendar /></Suspense>} />
              <Route path="messages" element={<Suspense fallback={<PageLoader />}><Messages /></Suspense>} />
              <Route path="reports" element={<Suspense fallback={<PageLoader />}><Reports /></Suspense>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default App;

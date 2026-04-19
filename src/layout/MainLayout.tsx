import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useSidebarContext } from '../context/SidebarContext';

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 80;

const MainLayout: React.FC = () => {
  const theme = useTheme();
  const isTabletOrDown = useMediaQuery(theme.breakpoints.down('lg'));
  const { isCollapsed } = useSidebarContext();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', overflowX: 'hidden' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { lg: `calc(100% - ${isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH}px)` },
          ml: { lg: `${isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH}px` },
          transition: 'all 0.3s ease',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
        }}
      >
        <Navbar />
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 1.5, sm: 2.5, md: 3 },
            mt: { xs: 8, sm: isTabletOrDown ? 8.5 : 9 },
            overflow: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;

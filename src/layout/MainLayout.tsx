import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { useSidebarContext } from '../context/SidebarContext';

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 80;

const MainLayout: React.FC = () => {
  const { isCollapsed } = useSidebarContext();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH}px)` },
          ml: { md: `${isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH}px` },
          transition: 'all 0.3s ease',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Navbar />
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3 },
            mt: { xs: 7, sm: 8 },
            overflow: 'auto',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;

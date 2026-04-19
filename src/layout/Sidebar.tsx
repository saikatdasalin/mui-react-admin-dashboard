import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Dashboard,
  Analytics,
  People,
  Receipt,
  Settings,
  Person,
  CalendarMonth,
  Message,
  Assessment,
  ExpandLess,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  Inventory,
  TrendingUp,
  PieChart,
  BarChart,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useSidebarContext } from '../context/SidebarContext';
import fliqoLogo from '../assets/logo-fliqo.png';
import { useThemeContext } from '../context/ThemeContext';

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 80;

interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { title: 'Dashboard', path: '/', icon: <Dashboard /> },
  {
    title: 'Analytics',
    icon: <Analytics />,
    children: [
      { title: 'Overview', path: '/analytics', icon: <TrendingUp /> },
      { title: 'Charts', path: '/analytics/charts', icon: <PieChart /> },
      { title: 'Reports', path: '/analytics/reports', icon: <BarChart /> },
    ],
  },
  { title: 'Users', path: '/users', icon: <People /> },
  { title: 'Products', path: '/products', icon: <Inventory /> },
  { title: 'Orders', path: '/orders', icon: <Receipt /> },
  { title: 'Calendar', path: '/calendar', icon: <CalendarMonth /> },
  { title: 'Messages', path: '/messages', icon: <Message /> },
  { title: 'Reports', path: '/reports', icon: <Assessment /> },
  { title: 'Profile', path: '/profile', icon: <Person /> },
  { title: 'Settings', path: '/settings', icon: <Settings /> },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { isCollapsed, toggleSidebar, isMobileOpen, setMobileOpen } = useSidebarContext();
  const { isDarkMode } = useThemeContext();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      setOpenMenus((prev) =>
        prev.includes(item.title)
          ? prev.filter((t) => t !== item.title)
          : [...prev, item.title]
      );
    } else if (item.path) {
      navigate(item.path);
      if (isMobile) {
        setMobileOpen(false);
      }
    }
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path;
  };

  const drawerWidth = isCollapsed && !isMobile ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  const sidebarContent = (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: isDarkMode
          ? 'linear-gradient(180deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: isCollapsed && !isMobile ? 'center' : 'space-between',
          borderBottom: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(99,102,241,0.1)'}`,
          position: 'sticky',
          top: 0,
          zIndex: 1,
          // background: 'inherit',
        }}
      >
        <AnimatePresence mode="wait">
          {(!isCollapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  component="img"
                  src={fliqoLogo}
                  alt="FLIQO"
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  MUI ADMIN
                </Typography>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
        {!isMobile && (
          <IconButton
            onClick={toggleSidebar}
            sx={{
              background: isDarkMode
                ? 'rgba(129,140,248,0.1)'
                : 'rgba(99,102,241,0.1)',
              '&:hover': {
                background: isDarkMode
                  ? 'rgba(129,140,248,0.2)'
                  : 'rgba(99,102,241,0.2)',
              },
            }}
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        )}
      </Box>

      {/* User Profile Section */}
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
        }}
      >
        <Avatar
          sx={{
            width: 44,
            height: 44,
            background: 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            boxShadow: '0 4px 14px rgba(20,184,166,0.4)',
          }}
        >
          JD
        </Avatar>
        <AnimatePresence mode="wait">
          {(!isCollapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Typography variant="subtitle1" fontWeight={600}>
                John Doe
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Administrator
              </Typography>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* Menu Items */}
      <List sx={{ flex: 1, px: 1, py: 2, overflowY: 'auto', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
        {menuItems.map((item) => (
          <React.Fragment key={item.title}>
            <ListItem disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleMenuClick(item)}
                sx={{
                  borderRadius: 2,
                  minHeight: 48,
                  justifyContent: isCollapsed && !isMobile ? 'center' : 'flex-start',
                  px: isCollapsed && !isMobile ? 2 : 2.5,
                  background: isActive(item.path)
                    ? isDarkMode
                      ? 'linear-gradient(135deg, rgba(129,140,248,0.2) 0%, rgba(139,92,246,0.2) 100%)'
                      : 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.15) 100%)'
                    : 'transparent',
                  border: isActive(item.path)
                    ? `1px solid ${isDarkMode ? 'rgba(129,140,248,0.3)' : 'rgba(99,102,241,0.3)'}`
                    : '1px solid transparent',
                  boxShadow: isActive(item.path)
                    ? isDarkMode
                      ? '0 4px 14px rgba(129,140,248,0.2)'
                      : '0 4px 14px rgba(99,102,241,0.15)'
                    : 'none',
                  '&:hover': {
                    background: isDarkMode
                      ? 'rgba(129,140,248,0.1)'
                      : 'rgba(99,102,241,0.08)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: isCollapsed && !isMobile ? 0 : 40,
                    mr: isCollapsed && !isMobile ? 0 : 2,
                    color: isActive(item.path)
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <AnimatePresence mode="wait">
                  {(!isCollapsed || isMobile) && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.15 }}
                      style={{ flex: 1, display: 'flex', alignItems: 'center' }}
                    >
                      <ListItemText
                        primary={item.title}
                        primaryTypographyProps={{
                          fontWeight: isActive(item.path) ? 600 : 500,
                          color: isActive(item.path)
                            ? theme.palette.primary.main
                            : theme.palette.text.primary,
                        }}
                      />
                      {item.children && (
                        openMenus.includes(item.title) ? <ExpandLess /> : <ExpandMore />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </ListItemButton>
            </ListItem>
            {item.children && (!isCollapsed || isMobile) && (
              <Collapse in={openMenus.includes(item.title)} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItem key={child.title} disablePadding sx={{ mb: 0.5 }}>
                      <ListItemButton
                        onClick={() => handleMenuClick(child)}
                        sx={{
                          pl: 5,
                          borderRadius: 2,
                          minHeight: 40,
                          background: isActive(child.path)
                            ? isDarkMode
                              ? 'rgba(129,140,248,0.15)'
                              : 'rgba(99,102,241,0.1)'
                            : 'transparent',
                          '&:hover': {
                            background: isDarkMode
                              ? 'rgba(129,140,248,0.1)'
                              : 'rgba(99,102,241,0.08)',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 32,
                            color: isActive(child.path)
                              ? theme.palette.primary.main
                              : theme.palette.text.secondary,
                          }}
                        >
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={child.title}
                          primaryTypographyProps={{
                            fontSize: '0.875rem',
                            fontWeight: isActive(child.path) ? 600 : 400,
                            color: isActive(child.path)
                              ? theme.palette.primary.main
                              : theme.palette.text.secondary,
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={isMobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width: { xs: 'min(86vw, 320px)', sm: DRAWER_WIDTH },
            boxSizing: 'border-box',
            border: 'none',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            border: 'none',
            transition: 'width 0.3s ease',
            overflowX: 'hidden',
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': { display: 'none' },
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default Sidebar;

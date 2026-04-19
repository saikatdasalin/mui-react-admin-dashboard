import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Typography,
  Divider,
  ListItemIcon,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  Notifications,
  Settings,
  DarkMode,
  LightMode,
  Person,
  Logout,
  Mail,
} from '@mui/icons-material';
import { useSidebarContext } from '../context/SidebarContext';
import { useThemeContext } from '../context/ThemeContext';

const DRAWER_WIDTH = 280;
const COLLAPSED_WIDTH = 80;

const Navbar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const { isCollapsed, setMobileOpen } = useSidebarContext();
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const notifications = [
    { id: 1, title: 'New order received', time: '5 min ago', read: false },
    { id: 2, title: 'User John signed up', time: '10 min ago', read: false },
    { id: 3, title: 'Server update completed', time: '1 hour ago', read: true },
    { id: 4, title: 'New comment on post', time: '2 hours ago', read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: { lg: `calc(100% - ${isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH}px)` },
        ml: { lg: `${isCollapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH}px` },
        transition: 'all 0.3s ease',
        background: isDarkMode
          ? 'linear-gradient(135deg, rgba(15,23,42,0.8) 0%, rgba(30,41,59,0.8) 100%)'
          : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.8) 100%)',
        backdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(99,102,241,0.1)'}`,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          minHeight: { xs: 64, sm: 72 },
          px: { xs: 1, sm: 2 },
          gap: { xs: 1, sm: 2 },
        }}
      >
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, flexGrow: 1, minWidth: 0 }}>
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{
                color: theme.palette.text.primary,
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Search Bar */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              background: isDarkMode
                ? 'rgba(129,140,248,0.1)'
                : 'rgba(99,102,241,0.08)',
              borderRadius: 3,
              px: { sm: 1.5, md: 2 },
              py: 0.5,
              width: { sm: 'clamp(180px, 40vw, 420px)', lg: 'clamp(260px, 36vw, 520px)' },
              border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
              transition: 'all 0.2s ease',
              '&:focus-within': {
                border: `1px solid ${theme.palette.primary.main}`,
                boxShadow: `0 0 0 3px ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
              },
            }}
          >
            <Search sx={{ color: theme.palette.text.secondary, mr: 1 }} />
            <InputBase
              placeholder="Search anything..."
              sx={{
                flex: 1,
                color: theme.palette.text.primary,
                '& input::placeholder': {
                  color: theme.palette.text.secondary,
                  opacity: 1,
                },
              }}
            />
          </Box>
        </Box>

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flexShrink: 0 }}>
          {/* Theme Toggle */}
          <Tooltip title={isDarkMode ? 'Light Mode' : 'Dark Mode'}>
            <Box>
              <IconButton
                onClick={toggleTheme}
                sx={{
                  background: isDarkMode
                    ? 'rgba(251,191,36,0.15)'
                    : 'rgba(99,102,241,0.1)',
                  color: isDarkMode ? '#fbbf24' : '#6366f1',
                  p: { xs: 0.9, sm: 1.1 },
                  '&:hover': {
                    background: isDarkMode
                      ? 'rgba(251,191,36,0.25)'
                      : 'rgba(99,102,241,0.2)',
                  },
                }}
              >
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </IconButton>
            </Box>
          </Tooltip>

          {/* Messages */}
          <Tooltip title="Messages">
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton
                sx={{
                  background: isDarkMode
                    ? 'rgba(129,140,248,0.1)'
                    : 'rgba(99,102,241,0.08)',
                  p: { sm: 1, md: 1.1 },
                  '&:hover': {
                    background: isDarkMode
                      ? 'rgba(129,140,248,0.2)'
                      : 'rgba(99,102,241,0.15)',
                  },
                }}
              >
                <Badge badgeContent={3} color="error">
                  <Mail sx={{ color: theme.palette.text.primary }} />
                </Badge>
              </IconButton>
            </Box>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
            <Box>
              <IconButton
                onClick={handleNotificationOpen}
                sx={{
                  background: isDarkMode
                    ? 'rgba(129,140,248,0.1)'
                    : 'rgba(99,102,241,0.08)',
                  p: { xs: 0.9, sm: 1.1 },
                  '&:hover': {
                    background: isDarkMode
                      ? 'rgba(129,140,248,0.2)'
                      : 'rgba(99,102,241,0.15)',
                  },
                }}
              >
                <Badge badgeContent={unreadCount} color="error">
                  <Notifications sx={{ color: theme.palette.text.primary }} />
                </Badge>
              </IconButton>
            </Box>
          </Tooltip>

          {/* Settings */}
          <Tooltip title="Settings">
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <IconButton
                sx={{
                  background: isDarkMode
                    ? 'rgba(129,140,248,0.1)'
                    : 'rgba(99,102,241,0.08)',
                  p: { sm: 1, md: 1.1 },
                  '&:hover': {
                    background: isDarkMode
                      ? 'rgba(129,140,248,0.2)'
                      : 'rgba(99,102,241,0.15)',
                  },
                }}
              >
                <Settings sx={{ color: theme.palette.text.primary }} />
              </IconButton>
            </Box>
          </Tooltip>

          {/* Profile */}
          <IconButton onClick={handleProfileMenuOpen} sx={{ p: 0, ml: 1 }}>
            <Avatar
              sx={{
                width: { xs: 34, sm: 40 },
                height: { xs: 34, sm: 40 },
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              }}
            >
              JD
            </Avatar>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            minWidth: { xs: 180, sm: 200 },
            background: isDarkMode
              ? 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(99,102,241,0.15)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            John Doe
          </Typography>
          <Typography variant="body2" color="text.secondary">
            john.doe@example.com
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: 'error.main' }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchor}
        open={Boolean(notificationAnchor)}
        onClose={handleNotificationClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            width: { xs: 'calc(100vw - 24px)', sm: 360 },
            maxWidth: '100vw',
            maxHeight: 400,
            background: isDarkMode
              ? 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
            boxShadow: isDarkMode
              ? '0 8px 32px rgba(0,0,0,0.4)'
              : '0 8px 32px rgba(99,102,241,0.15)',
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Notifications
          </Typography>
          <Typography variant="caption" color="primary" sx={{ cursor: 'pointer' }}>
            Mark all as read
          </Typography>
        </Box>
        <Divider />
        {notifications.map((notification) => (
          <MenuItem
            key={notification.id}
            onClick={handleNotificationClose}
            sx={{
              py: 1.5,
              background: !notification.read
                ? isDarkMode
                  ? 'rgba(129,140,248,0.1)'
                  : 'rgba(99,102,241,0.05)'
                : 'transparent',
            }}
          >
            <Box>
              <Typography variant="body2" fontWeight={notification.read ? 400 : 600}>
                {notification.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {notification.time}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </AppBar>
  );
};

export default Navbar;

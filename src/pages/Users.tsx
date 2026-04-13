import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import {
  Search,
  MoreVert,
  Add,
  FilterList,
  Edit,
  Delete,
  Visibility,
  Mail,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  avatar: string;
  joinDate: string;
  lastActive: string;
}

const users: User[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'Admin', status: 'Active', avatar: 'JS', joinDate: '2024-01-15', lastActive: '2 min ago' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah.wilson@example.com', role: 'Editor', status: 'Active', avatar: 'SW', joinDate: '2024-02-20', lastActive: '1 hour ago' },
  { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'Viewer', status: 'Inactive', avatar: 'MJ', joinDate: '2024-03-10', lastActive: '3 days ago' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@example.com', role: 'Editor', status: 'Active', avatar: 'ED', joinDate: '2024-04-05', lastActive: '5 min ago' },
  { id: 5, name: 'Chris Brown', email: 'chris.brown@example.com', role: 'Viewer', status: 'Pending', avatar: 'CB', joinDate: '2024-05-12', lastActive: 'Never' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@example.com', role: 'Admin', status: 'Active', avatar: 'LA', joinDate: '2024-01-08', lastActive: '30 min ago' },
  { id: 7, name: 'David Martinez', email: 'david.martinez@example.com', role: 'Editor', status: 'Active', avatar: 'DM', joinDate: '2024-06-18', lastActive: '2 hours ago' },
  { id: 8, name: 'Jennifer Taylor', email: 'jennifer.taylor@example.com', role: 'Viewer', status: 'Inactive', avatar: 'JT', joinDate: '2024-07-22', lastActive: '1 week ago' },
];

const Users: React.FC = () => {
  const { isDarkMode } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [, setSelectedUser] = useState<number | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return { bg: 'rgba(16,185,129,0.15)', color: '#10b981' };
      case 'Inactive':
        return { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' };
      case 'Pending':
        return { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' };
      default:
        return { bg: 'rgba(148,163,184,0.15)', color: '#94a3b8' };
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
      case 'Editor':
        return 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)';
      case 'Viewer':
        return 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)';
      default:
        return 'linear-gradient(135deg, #94a3b8 0%, #cbd5e1 100%)';
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              User Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage and monitor user accounts
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              '&:hover': {
                boxShadow: '0 6px 20px rgba(99,102,241,0.5)',
              },
            }}
          >
            Add User
          </Button>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Users', value: '8,549', color: '#6366f1' },
          { label: 'Active Users', value: '6,234', color: '#10b981' },
          { label: 'Inactive Users', value: '1,890', color: '#ef4444' },
          { label: 'Pending Users', value: '425', color: '#f59e0b' },
        ].map((stat, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={cardStyle}>
                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stat.label}
                  </Typography>
                  <Typography variant="h4" fontWeight={700} sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card sx={{ ...cardStyle, mb: 3 }}>
          <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <TextField
                placeholder="Search users..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flex: 1, minWidth: 250 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ borderColor: isDarkMode ? 'rgba(129,140,248,0.3)' : 'rgba(99,102,241,0.3)' }}
              >
                Filters
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card sx={cardStyle}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ minWidth: 800 }}>
                {/* Header */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 0.5fr',
                    gap: 2,
                    py: 2,
                    px: 3,
                    borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                    bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.03)',
                  }}
                >
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    USER
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    EMAIL
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    ROLE
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    STATUS
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    LAST ACTIVE
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    ACTIONS
                  </Typography>
                </Box>
                {/* Rows */}
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr 0.5fr',
                        gap: 2,
                        py: 2,
                        px: 3,
                        alignItems: 'center',
                        borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                        '&:hover': {
                          bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.03)',
                        },
                        transition: 'background-color 0.2s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            width: 40,
                            height: 40,
                            background: getRoleColor(user.role),
                            fontSize: '0.875rem',
                            fontWeight: 600,
                          }}
                        >
                          {user.avatar}
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {user.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                      <Chip
                        label={user.role}
                        size="small"
                        sx={{
                          background: getRoleColor(user.role),
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                      <Chip
                        label={user.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(user.status).bg,
                          color: getStatusColor(user.status).color,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                        }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {user.lastActive}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, user.id)}
                      >
                        <MoreVert />
                      </IconButton>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            background: isDarkMode
              ? 'linear-gradient(135deg, rgba(30,41,59,0.95) 0%, rgba(15,23,42,0.95) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
                        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <Visibility sx={{ mr: 1.5, fontSize: 20 }} /> View Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Edit sx={{ mr: 1.5, fontSize: 20 }} /> Edit User
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Mail sx={{ mr: 1.5, fontSize: 20 }} /> Send Email
        </MenuItem>
        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <Delete sx={{ mr: 1.5, fontSize: 20 }} /> Delete User
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Users;

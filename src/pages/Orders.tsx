import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  InputAdornment,
  Chip,
  IconButton,
  Button,
  Grid,
  Avatar,
  LinearProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  FilterList,
  MoreVert,
  LocalShipping,
  CheckCircle,
  Schedule,
  Cancel,
  Visibility,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

interface Order {
  id: string;
  customer: string;
  avatar: string;
  email: string;
  items: number;
  total: number;
  status: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled' | 'Pending';
  date: string;
  progress: number;
}

const orders: Order[] = [
  { id: 'ORD-001', customer: 'John Smith', avatar: 'JS', email: 'john@example.com', items: 3, total: 459.99, status: 'Delivered', date: '2024-12-01', progress: 100 },
  { id: 'ORD-002', customer: 'Sarah Wilson', avatar: 'SW', email: 'sarah@example.com', items: 2, total: 289.50, status: 'Shipped', date: '2024-12-02', progress: 75 },
  { id: 'ORD-003', customer: 'Mike Johnson', avatar: 'MJ', email: 'mike@example.com', items: 5, total: 892.00, status: 'Processing', date: '2024-12-03', progress: 50 },
  { id: 'ORD-004', customer: 'Emily Davis', avatar: 'ED', email: 'emily@example.com', items: 1, total: 149.99, status: 'Pending', date: '2024-12-04', progress: 25 },
  { id: 'ORD-005', customer: 'Chris Brown', avatar: 'CB', email: 'chris@example.com', items: 4, total: 567.80, status: 'Cancelled', date: '2024-12-05', progress: 0 },
  { id: 'ORD-006', customer: 'Lisa Anderson', avatar: 'LA', email: 'lisa@example.com', items: 2, total: 234.50, status: 'Delivered', date: '2024-12-06', progress: 100 },
  { id: 'ORD-007', customer: 'David Martinez', avatar: 'DM', email: 'david@example.com', items: 3, total: 445.00, status: 'Shipped', date: '2024-12-07', progress: 75 },
  { id: 'ORD-008', customer: 'Jennifer Taylor', avatar: 'JT', email: 'jennifer@example.com', items: 6, total: 1234.99, status: 'Processing', date: '2024-12-08', progress: 50 },
];

const Orders: React.FC = () => {
  const theme = useTheme();
  const isCompactTable = useMediaQuery(theme.breakpoints.down('md'));
  const { isDarkMode } = useThemeContext();
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Delivered':
        return { icon: <CheckCircle />, color: '#10b981', bg: 'rgba(16,185,129,0.15)' };
      case 'Shipped':
        return { icon: <LocalShipping />, color: '#6366f1', bg: 'rgba(99,102,241,0.15)' };
      case 'Processing':
        return { icon: <Schedule />, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' };
      case 'Pending':
        return { icon: <Schedule />, color: '#06b6d4', bg: 'rgba(6,182,212,0.15)' };
      case 'Cancelled':
        return { icon: <Cancel />, color: '#ef4444', bg: 'rgba(239,68,68,0.15)' };
      default:
        return { icon: <Schedule />, color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' };
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  const stats = [
    { label: 'Total Orders', value: '1,234', icon: <LocalShipping />, color: '#6366f1' },
    { label: 'Delivered', value: '892', icon: <CheckCircle />, color: '#10b981' },
    { label: 'Processing', value: '234', icon: <Schedule />, color: '#f59e0b' },
    { label: 'Cancelled', value: '108', icon: <Cancel />, color: '#ef4444' },
  ];

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}>
          Orders Management
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Track and manage customer orders
        </Typography>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card sx={cardStyle}>
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: `${stat.color}20`,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h5" fontWeight={700}>
                        {stat.value}
                      </Typography>
                    </Box>
                  </Box>
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
                placeholder="Search orders..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ flex: 1, minWidth: { xs: 0, sm: 240 }, width: { xs: '100%', sm: 'auto' } }}
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
                fullWidth={isCompactTable}
                sx={{ borderColor: isDarkMode ? 'rgba(129,140,248,0.3)' : 'rgba(99,102,241,0.3)' }}
              >
                Filters
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>

      {/* Orders Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Card sx={cardStyle}>
          <CardContent sx={{ p: 0 }}>
            {isCompactTable ? (
              <Box sx={{ p: 1.5, display: 'grid', gap: 1.25 }}>
                {filteredOrders.map((order, index) => {
                  const statusConfig = getStatusConfig(order.status);
                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: index * 0.03 }}
                    >
                      <Box
                        sx={{
                          border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                          borderRadius: 2,
                          p: 1.5,
                          bgcolor: isDarkMode ? 'rgba(129,140,248,0.04)' : 'rgba(99,102,241,0.03)',
                        }}
                      >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 1.25 }}>
                          <Box>
                            <Typography variant="body2" fontWeight={700} color="primary">
                              {order.id}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">{order.date}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight={700}>
                            ${order.total.toFixed(2)}
                          </Typography>
                        </Box>
                        <Box sx={{ mt: 1.25, display: 'flex', alignItems: 'center', gap: 1.25 }}>
                          <Avatar
                            sx={{
                              width: 34,
                              height: 34,
                              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                              fontSize: '0.78rem',
                            }}
                          >
                            {order.avatar}
                          </Avatar>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography variant="body2" fontWeight={600} sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {order.customer}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                              {order.email}
                            </Typography>
                          </Box>
                        </Box>
                        <Box sx={{ mt: 1.25, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
                          <Typography variant="caption" color="text.secondary">{order.items} items</Typography>
                          <Chip
                            icon={statusConfig.icon}
                            label={order.status}
                            size="small"
                            sx={{
                              bgcolor: statusConfig.bg,
                              color: statusConfig.color,
                              fontWeight: 600,
                              '& .MuiChip-icon': { color: statusConfig.color },
                            }}
                          />
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton size="small">
                              <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <MoreVert fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        {order.status !== 'Cancelled' && (
                          <LinearProgress
                            variant="determinate"
                            value={order.progress}
                            sx={{
                              mt: 1.1,
                              height: 4,
                              borderRadius: 2,
                              bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                              '& .MuiLinearProgress-bar': {
                                bgcolor: statusConfig.color,
                                borderRadius: 2,
                              },
                            }}
                          />
                        )}
                      </Box>
                    </motion.div>
                  );
                })}
              </Box>
            ) : (
              <Box sx={{ overflowX: 'auto' }}>
                <Box sx={{ minWidth: 900 }}>
                  {/* Header */}
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr 1fr 1fr 1.5fr 1fr 0.5fr',
                      gap: 2,
                      py: 2,
                      px: 3,
                      borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                      bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.03)',
                    }}
                  >
                    <Typography variant="caption" fontWeight={600} color="text.secondary">ORDER ID</Typography>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">CUSTOMER</Typography>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">ITEMS</Typography>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">TOTAL</Typography>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">STATUS</Typography>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">DATE</Typography>
                    <Typography variant="caption" fontWeight={600} color="text.secondary">ACTIONS</Typography>
                  </Box>
                  {/* Rows */}
                  {filteredOrders.map((order, index) => {
                    const statusConfig = getStatusConfig(order.status);
                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Box
                          sx={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr 1fr 1fr 1.5fr 1fr 0.5fr',
                            gap: 2,
                            py: 2.5,
                            px: 3,
                            alignItems: 'center',
                            borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                            '&:hover': {
                              bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.03)',
                            },
                          }}
                        >
                          <Typography variant="body2" fontWeight={600} color="primary">
                            {order.id}
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                width: 36,
                                height: 36,
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                fontSize: '0.8rem',
                              }}
                            >
                              {order.avatar}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={500}>
                                {order.customer}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {order.email}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2">{order.items} items</Typography>
                          <Typography variant="body2" fontWeight={600}>
                            ${order.total.toFixed(2)}
                          </Typography>
                          <Box>
                            <Chip
                              icon={statusConfig.icon}
                              label={order.status}
                              size="small"
                              sx={{
                                bgcolor: statusConfig.bg,
                                color: statusConfig.color,
                                fontWeight: 600,
                                '& .MuiChip-icon': { color: statusConfig.color },
                              }}
                            />
                            {order.status !== 'Cancelled' && (
                              <LinearProgress
                                variant="determinate"
                                value={order.progress}
                                sx={{
                                  mt: 1,
                                  height: 4,
                                  borderRadius: 2,
                                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                  '& .MuiLinearProgress-bar': {
                                    bgcolor: statusConfig.color,
                                    borderRadius: 2,
                                  },
                                }}
                              />
                            )}
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            {order.date}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton size="small">
                              <Visibility fontSize="small" />
                            </IconButton>
                            <IconButton size="small">
                              <MoreVert fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                      </motion.div>
                    );
                  })}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Orders;

import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Avatar,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  People,
  ShoppingCart,
  AttachMoney,
  Visibility,
  MoreVert,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

const revenueData = [
  { name: 'Jan', value: 4000, prev: 3200 },
  { name: 'Feb', value: 3000, prev: 2800 },
  { name: 'Mar', value: 5000, prev: 4200 },
  { name: 'Apr', value: 4500, prev: 3800 },
  { name: 'May', value: 6000, prev: 5200 },
  { name: 'Jun', value: 5500, prev: 4800 },
  { name: 'Jul', value: 7000, prev: 6200 },
];

const visitorData = [
  { name: 'Mon', visitors: 2400, pageViews: 4000 },
  { name: 'Tue', visitors: 1398, pageViews: 3000 },
  { name: 'Wed', visitors: 9800, pageViews: 12000 },
  { name: 'Thu', visitors: 3908, pageViews: 5000 },
  { name: 'Fri', visitors: 4800, pageViews: 6500 },
  { name: 'Sat', visitors: 3800, pageViews: 5200 },
  { name: 'Sun', visitors: 4300, pageViews: 5800 },
];

const pieData = [
  { name: 'Desktop', value: 45, color: '#6366f1' },
  { name: 'Mobile', value: 35, color: '#14b8a6' },
  { name: 'Tablet', value: 20, color: '#f59e0b' },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Smith', amount: '$250.00', status: 'Completed', avatar: 'JS' },
  { id: '#ORD-002', customer: 'Sarah Wilson', amount: '$180.00', status: 'Pending', avatar: 'SW' },
  { id: '#ORD-003', customer: 'Mike Johnson', amount: '$320.00', status: 'Processing', avatar: 'MJ' },
  { id: '#ORD-004', customer: 'Emily Davis', amount: '$95.00', status: 'Completed', avatar: 'ED' },
  { id: '#ORD-005', customer: 'Chris Brown', amount: '$450.00', status: 'Shipped', avatar: 'CB' },
];

const topProducts = [
  { name: 'Premium Headphones', sales: 1234, progress: 85 },
  { name: 'Wireless Mouse', sales: 987, progress: 72 },
  { name: 'Mechanical Keyboard', sales: 756, progress: 58 },
  { name: 'USB-C Hub', sales: 543, progress: 45 },
];

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  gradient: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, gradient, delay }) => {
  const { isDarkMode } = useThemeContext();
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.5 }}
    >
      <Card
        sx={{
          height: '100%',
          background: isDarkMode
            ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                    border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
          boxShadow: isDarkMode
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(99,102,241,0.1)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: isDarkMode
              ? '0 12px 40px rgba(129,140,248,0.2)'
              : '0 12px 40px rgba(99,102,241,0.2)',
          },
        }}
      >
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
            <Box
              sx={{
                width: 56,
                height: 56,
                borderRadius: 3,
                background: gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 8px 24px ${gradient.includes('6366f1') ? 'rgba(99,102,241,0.4)' : gradient.includes('14b8a6') ? 'rgba(20,184,166,0.4)' : gradient.includes('f59e0b') ? 'rgba(245,158,11,0.4)' : 'rgba(139,92,246,0.4)'}`,
              }}
            >
              {icon}
            </Box>
            <IconButton size="small">
              <MoreVert />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {title}
          </Typography>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {isPositive ? (
              <ArrowUpward sx={{ fontSize: 16, color: 'success.main' }} />
            ) : (
              <ArrowDownward sx={{ fontSize: 16, color: 'error.main' }} />
            )}
            <Typography
              variant="body2"
              sx={{ color: isPositive ? 'success.main' : 'error.main', fontWeight: 600 }}
            >
              {Math.abs(change)}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              vs last month
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'success.main';
      case 'Pending':
        return 'warning.main';
      case 'Processing':
        return 'info.main';
      case 'Shipped':
        return 'primary.main';
      default:
        return 'text.secondary';
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Dashboard Overview
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Welcome back! Here's what's happening with your business today.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Revenue"
            value="$54,239"
            change={12.5}
            icon={<AttachMoney sx={{ color: 'white', fontSize: 28 }} />}
            gradient="linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)"
            delay={0}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Orders"
            value="1,234"
            change={8.2}
            icon={<ShoppingCart sx={{ color: 'white', fontSize: 28 }} />}
            gradient="linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)"
            delay={0.1}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Users"
            value="8,549"
            change={-2.4}
            icon={<People sx={{ color: 'white', fontSize: 28 }} />}
            gradient="linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)"
            delay={0.2}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Page Views"
            value="24.5K"
            change={18.7}
            icon={<Visibility sx={{ color: 'white', fontSize: 28 }} />}
            gradient="linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)"
            delay={0.3}
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card
              sx={{
                height: '100%',
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Revenue Overview
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Monthly revenue comparison
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#6366f1' }} />
                      <Typography variant="caption">This Year</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#14b8a6' }} />
                      <Typography variant="caption">Last Year</Typography>
                    </Box>
                  </Box>
                </Box>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        background: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: 12,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="prev"
                      stroke="#14b8a6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorPrev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Device Distribution */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Card
              sx={{
                height: '100%',
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Device Distribution
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Traffic by device type
                </Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
                  {pieData.map((item) => (
                    <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: item.color }} />
                      <Typography variant="caption">{item.name} ({item.value}%)</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Visitors Chart & Top Products */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card
              sx={{
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Weekly Visitors
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Visitors and page views this week
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={visitorData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        background: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: 12,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                      }}
                    />
                    <Bar dataKey="visitors" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="pageViews" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Card
              sx={{
                height: '100%',
                background: isDarkMode
                  ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
                  : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Top Products
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Best selling products this month
                </Typography>
                {topProducts.map((product, index) => (
                  <Box key={product.name} sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.sales} sales
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={product.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(99,102,241,0.1)',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: index === 0
                            ? 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)'
                            : index === 1
                            ? 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)'
                            : index === 2
                            ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                            : 'linear-gradient(90deg, #8b5cf6 0%, #a855f7 100%)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card
          sx={{
            background: isDarkMode
              ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box>
                <Typography variant="h6" fontWeight={600}>
                  Recent Orders
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Latest customer orders
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: 'primary.main',
                  cursor: 'pointer',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                View All
              </Typography>
            </Box>
            <Box sx={{ overflowX: 'auto' }}>
              <Box sx={{ minWidth: 600 }}>
                {/* Header */}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 2fr 1fr 1fr',
                    gap: 2,
                    py: 1.5,
                    px: 2,
                    borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  }}
                >
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    ORDER ID
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    CUSTOMER
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    AMOUNT
                  </Typography>
                  <Typography variant="caption" fontWeight={600} color="text.secondary">
                    STATUS
                  </Typography>
                </Box>
                {/* Rows */}
                {recentOrders.map((order) => (
                  <Box
                    key={order.id}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 2fr 1fr 1fr',
                      gap: 2,
                      py: 2,
                      px: 2,
                      borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                      '&:hover': {
                        bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.03)',
                      },
                      transition: 'background-color 0.2s ease',
                    }}
                  >
                    <Typography variant="body2" fontWeight={500}>
                      {order.id}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          fontSize: '0.75rem',
                          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                        }}
                      >
                        {order.avatar}
                      </Avatar>
                      <Typography variant="body2">{order.customer}</Typography>
                    </Box>
                    <Typography variant="body2" fontWeight={600}>
                      {order.amount}
                    </Typography>
                    <Box
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 2,
                        bgcolor: `${getStatusColor(order.status)}15`,
                        width: 'fit-content',
                      }}
                    >
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        sx={{ color: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Dashboard;

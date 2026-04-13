import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  useTheme,
} from '@mui/material';
import {
  Line,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
} from 'recharts';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

const monthlyData = [
  { name: 'Jan', revenue: 4000, expenses: 2400, profit: 1600 },
  { name: 'Feb', revenue: 3000, expenses: 1398, profit: 1602 },
  { name: 'Mar', revenue: 5000, expenses: 3800, profit: 1200 },
  { name: 'Apr', revenue: 4780, expenses: 3908, profit: 872 },
  { name: 'May', revenue: 5890, expenses: 4800, profit: 1090 },
  { name: 'Jun', revenue: 6390, expenses: 3800, profit: 2590 },
  { name: 'Jul', revenue: 7490, expenses: 4300, profit: 3190 },
  { name: 'Aug', revenue: 6200, expenses: 3900, profit: 2300 },
  { name: 'Sep', revenue: 7100, expenses: 4100, profit: 3000 },
  { name: 'Oct', revenue: 8200, expenses: 4800, profit: 3400 },
  { name: 'Nov', revenue: 7800, expenses: 4500, profit: 3300 },
  { name: 'Dec', revenue: 9200, expenses: 5200, profit: 4000 },
];

const performanceData = [
  { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
  { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
  { subject: 'Development', A: 86, B: 130, fullMark: 150 },
  { subject: 'Support', A: 99, B: 100, fullMark: 150 },
  { subject: 'Operations', A: 85, B: 90, fullMark: 150 },
  { subject: 'Finance', A: 65, B: 85, fullMark: 150 },
];

const conversionData = [
  { name: 'Week 1', visitors: 4000, conversions: 240 },
  { name: 'Week 2', visitors: 3000, conversions: 198 },
  { name: 'Week 3', visitors: 5000, conversions: 380 },
  { name: 'Week 4', visitors: 4780, conversions: 390 },
];

const trafficSources = [
  { name: 'Organic', value: 4500, growth: 12.5 },
  { name: 'Direct', value: 3200, growth: 8.3 },
  { name: 'Referral', value: 2100, growth: -2.1 },
  { name: 'Social', value: 1800, growth: 15.7 },
  { name: 'Email', value: 1200, growth: 5.2 },
];

const Analytics: React.FC = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const [timeRange, setTimeRange] = React.useState('year');

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Analytics Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Detailed insights and performance metrics
          </Typography>
        </Box>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Time Range</InputLabel>
          <Select
            value={timeRange}
            label="Time Range"
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="quarter">This Quarter</MenuItem>
            <MenuItem value="year">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Revenue vs Expenses Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Revenue vs Expenses
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Monthly financial overview
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <ComposedChart data={monthlyData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
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
                    <Area type="monotone" dataKey="revenue" fill="url(#revenueGradient)" stroke="#6366f1" strokeWidth={2} />
                    <Bar dataKey="expenses" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Performance Radar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card sx={{ ...cardStyle, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Team Performance
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Department comparison
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={performanceData}>
                    <PolarGrid stroke={isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'} />
                    <PolarAngleAxis dataKey="subject" stroke={theme.palette.text.secondary} />
                    <PolarRadiusAxis stroke={theme.palette.text.secondary} />
                    <Radar name="This Year" dataKey="A" stroke="#6366f1" fill="#6366f1" fillOpacity={0.3} />
                    <Radar name="Last Year" dataKey="B" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Conversion Rate */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Conversion Rate
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Visitors to customers conversion
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                    <YAxis yAxisId="left" stroke={theme.palette.text.secondary} />
                    <YAxis yAxisId="right" orientation="right" stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        background: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: 12,
                      }}
                    />
                    <Bar yAxisId="left" dataKey="visitors" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    <Bar yAxisId="right" dataKey="conversions" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Traffic Sources */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <Card sx={{ ...cardStyle, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Traffic Sources
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Where your visitors come from
                </Typography>
                {trafficSources.map((source, index) => (
                  <Box key={source.name} sx={{ mb: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {source.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" fontWeight={600}>
                          {source.value.toLocaleString()}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: source.growth >= 0 ? 'success.main' : 'error.main',
                            fontWeight: 600,
                          }}
                        >
                          {source.growth >= 0 ? '+' : ''}{source.growth}%
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(99,102,241,0.1)',
                        overflow: 'hidden',
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          width: `${(source.value / 4500) * 100}%`,
                          borderRadius: 4,
                          background: index === 0
                            ? 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)'
                            : index === 1
                            ? 'linear-gradient(90deg, #14b8a6 0%, #06b6d4 100%)'
                            : index === 2
                            ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                            : index === 3
                            ? 'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)'
                            : 'linear-gradient(90deg, #8b5cf6 0%, #a855f7 100%)',
                          transition: 'width 0.5s ease',
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;

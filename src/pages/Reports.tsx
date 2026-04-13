import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  IconButton,
  useTheme,
} from '@mui/material';
import {
  Download,
  Description,
  PictureAsPdf,
  TableChart,
  BarChart as BarChartIcon,
  Schedule,
  CheckCircle,
  Refresh,
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

interface Report {
  id: number;
  name: string;
  type: 'PDF' | 'Excel' | 'CSV';
  category: string;
  date: string;
  size: string;
  status: 'Ready' | 'Processing' | 'Scheduled';
}

const reports: Report[] = [
  { id: 1, name: 'Monthly Sales Report', type: 'PDF', category: 'Sales', date: '2024-12-01', size: '2.4 MB', status: 'Ready' },
  { id: 2, name: 'User Analytics Q4', type: 'Excel', category: 'Analytics', date: '2024-12-02', size: '5.1 MB', status: 'Ready' },
  { id: 3, name: 'Inventory Summary', type: 'CSV', category: 'Inventory', date: '2024-12-03', size: '1.2 MB', status: 'Processing' },
  { id: 4, name: 'Financial Statement', type: 'PDF', category: 'Finance', date: '2024-12-04', size: '3.8 MB', status: 'Ready' },
  { id: 5, name: 'Customer Feedback Report', type: 'Excel', category: 'Support', date: '2024-12-05', size: '2.9 MB', status: 'Scheduled' },
  { id: 6, name: 'Marketing Campaign Results', type: 'PDF', category: 'Marketing', date: '2024-12-06', size: '4.2 MB', status: 'Ready' },
];

const reportData = [
  { month: 'Jan', generated: 45, downloaded: 38 },
  { month: 'Feb', generated: 52, downloaded: 45 },
  { month: 'Mar', generated: 48, downloaded: 42 },
  { month: 'Apr', generated: 61, downloaded: 55 },
  { month: 'May', generated: 55, downloaded: 48 },
  { month: 'Jun', generated: 67, downloaded: 62 },
];

const Reports: React.FC = () => {
  const theme = useTheme();
  const { isDarkMode } = useThemeContext();
  const [category, setCategory] = useState('all');
  const [reportType, setReportType] = useState('all');

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF':
        return <PictureAsPdf sx={{ color: '#ef4444' }} />;
      case 'Excel':
        return <TableChart sx={{ color: '#10b981' }} />;
      case 'CSV':
        return <Description sx={{ color: '#6366f1' }} />;
      default:
        return <Description />;
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'Ready':
        return { icon: <CheckCircle />, color: '#10b981', bg: 'rgba(16,185,129,0.15)' };
      case 'Processing':
        return { icon: <Refresh />, color: '#f59e0b', bg: 'rgba(245,158,11,0.15)' };
      case 'Scheduled':
        return { icon: <Schedule />, color: '#6366f1', bg: 'rgba(99,102,241,0.15)' };
      default:
        return { icon: <Description />, color: '#94a3b8', bg: 'rgba(148,163,184,0.15)' };
    }
  };

  const filteredReports = reports.filter((report) => {
    if (category !== 'all' && report.category !== category) return false;
    if (reportType !== 'all' && report.type !== reportType) return false;
    return true;
  });

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
              Reports
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Generate and download reports
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<BarChartIcon />}
            sx={{
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
            }}
          >
            Generate Report
          </Button>
        </Box>
      </motion.div>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Total Reports', value: '156', icon: <Description />, color: '#6366f1' },
          { label: 'Generated Today', value: '12', icon: <CheckCircle />, color: '#10b981' },
          { label: 'Processing', value: '3', icon: <Refresh />, color: '#f59e0b' },
          { label: 'Scheduled', value: '8', icon: <Schedule />, color: '#8b5cf6' },
        ].map((stat, index) => (
          <Grid size={{ xs: 6, md: 3 }} key={stat.label}>
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

      <Grid container spacing={3}>
        {/* Report Activity Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Report Activity
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Reports generated and downloaded over time
                </Typography>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={reportData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'} />
                    <XAxis dataKey="month" stroke={theme.palette.text.secondary} />
                    <YAxis stroke={theme.palette.text.secondary} />
                    <Tooltip
                      contentStyle={{
                        background: isDarkMode ? 'rgba(30,41,59,0.95)' : 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: 12,
                      }}
                    />
                    <Bar dataKey="generated" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="downloaded" fill="#14b8a6" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Quick Generate */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card sx={{ ...cardStyle, height: '100%' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Quick Generate
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Create a new report quickly
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Report Type</InputLabel>
                    <Select value="sales" label="Report Type">
                      <MenuItem value="sales">Sales Report</MenuItem>
                      <MenuItem value="analytics">Analytics Report</MenuItem>
                      <MenuItem value="inventory">Inventory Report</MenuItem>
                      <MenuItem value="finance">Financial Report</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Format</InputLabel>
                    <Select value="pdf" label="Format">
                      <MenuItem value="pdf">PDF</MenuItem>
                      <MenuItem value="excel">Excel</MenuItem>
                      <MenuItem value="csv">CSV</MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl fullWidth size="small">
                    <InputLabel>Date Range</InputLabel>
                    <Select value="month" label="Date Range">
                      <MenuItem value="week">Last Week</MenuItem>
                      <MenuItem value="month">Last Month</MenuItem>
                      <MenuItem value="quarter">Last Quarter</MenuItem>
                      <MenuItem value="year">Last Year</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 1,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                    }}
                  >
                    Generate Now
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Reports List */}
        <Grid size={{ xs: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Reports
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                      <InputLabel>Category</InputLabel>
                      <Select value={category} label="Category" onChange={(e) => setCategory(e.target.value)}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="Sales">Sales</MenuItem>
                        <MenuItem value="Analytics">Analytics</MenuItem>
                        <MenuItem value="Finance">Finance</MenuItem>
                        <MenuItem value="Marketing">Marketing</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 100 }}>
                      <InputLabel>Type</InputLabel>
                      <Select value={reportType} label="Type" onChange={(e) => setReportType(e.target.value)}>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="PDF">PDF</MenuItem>
                        <MenuItem value="Excel">Excel</MenuItem>
                        <MenuItem value="CSV">CSV</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Box>

                <Box sx={{ overflowX: 'auto' }}>
                  <Box sx={{ minWidth: 700 }}>
                    {/* Header */}
                    <Box
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 0.5fr',
                        gap: 2,
                        py: 1.5,
                        px: 2,
                        borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.03)',
                      }}
                    >
                      <Typography variant="caption" fontWeight={600} color="text.secondary">NAME</Typography>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">TYPE</Typography>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">CATEGORY</Typography>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">DATE</Typography>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">SIZE</Typography>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">STATUS</Typography>
                      <Typography variant="caption" fontWeight={600} color="text.secondary">ACTION</Typography>
                    </Box>
                    {/* Rows */}
                    {filteredReports.map((report, index) => {
                      const statusConfig = getStatusConfig(report.status);
                      return (
                        <motion.div
                          key={report.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <Box
                            sx={{
                              display: 'grid',
                              gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 0.5fr',
                              gap: 2,
                              py: 2,
                              px: 2,
                              alignItems: 'center',
                              borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`,
                              '&:hover': {
                                bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.03)',
                              },
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                              {getTypeIcon(report.type)}
                              <Typography variant="body2" fontWeight={500}>
                                {report.name}
                              </Typography>
                            </Box>
                            <Chip
                              label={report.type}
                              size="small"
                              sx={{
                                bgcolor: report.type === 'PDF' ? 'rgba(239,68,68,0.15)' : report.type === 'Excel' ? 'rgba(16,185,129,0.15)' : 'rgba(99,102,241,0.15)',
                                color: report.type === 'PDF' ? '#ef4444' : report.type === 'Excel' ? '#10b981' : '#6366f1',
                                fontWeight: 600,
                              }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {report.category}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {report.date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {report.size}
                            </Typography>
                            <Chip
                              icon={statusConfig.icon}
                              label={report.status}
                              size="small"
                              sx={{
                                bgcolor: statusConfig.bg,
                                color: statusConfig.color,
                                fontWeight: 600,
                                '& .MuiChip-icon': { color: statusConfig.color },
                              }}
                            />
                            <IconButton
                              size="small"
                              disabled={report.status !== 'Ready'}
                              sx={{
                                bgcolor: report.status === 'Ready' ? 'primary.main' : 'transparent',
                                color: report.status === 'Ready' ? 'white' : 'text.disabled',
                                '&:hover': {
                                  bgcolor: report.status === 'Ready' ? 'primary.dark' : 'transparent',
                                },
                              }}
                            >
                              <Download fontSize="small" />
                            </IconButton>
                          </Box>
                        </motion.div>
                      );
                    })}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;

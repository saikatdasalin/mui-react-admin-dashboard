import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Button,
  Grid,
  Chip,
  LinearProgress,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Edit,
  LocationOn,
  Email,
  Phone,
  CalendarMonth,
  Work,
  School,
  GitHub,
  LinkedIn,
  Twitter,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

const Profile: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDarkMode } = useThemeContext();

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Python', level: 80 },
    { name: 'UI/UX Design', level: 75 },
  ];

  const activities = [
    { action: 'Completed project review', time: '2 hours ago', type: 'success' },
    { action: 'Updated user permissions', time: '4 hours ago', type: 'info' },
    { action: 'Deployed new feature', time: '1 day ago', type: 'primary' },
    { action: 'Fixed critical bug', time: '2 days ago', type: 'warning' },
    { action: 'Team meeting', time: '3 days ago', type: 'secondary' },
  ];

  const stats = [
    { label: 'Projects', value: '24' },
    { label: 'Tasks', value: '156' },
    { label: 'Reviews', value: '89' },
    { label: 'Awards', value: '12' },
  ];

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}>
          My Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          View and manage your profile information
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card sx={cardStyle}>
              <Box
                sx={{
                  height: 120,
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #14b8a6 100%)',
                  position: 'relative',
                }}
              />
              <CardContent sx={{ pt: 0, textAlign: 'center' }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    border: `4px solid ${isDarkMode ? '#1e293b' : '#fff'}`,
                    margin: '-50px auto 16px',
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    fontSize: '2rem',
                    fontWeight: 700,
                  }}
                >
                  JD
                </Avatar>
                <Typography variant="h5" fontWeight={700} gutterBottom>
                  John Doe
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Senior Administrator
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3, flexWrap: 'wrap' }}>
                  <Chip
                    label="Admin"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                  <Chip
                    label="Pro Member"
                    size="small"
                    sx={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
                      color: 'white',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
                  <IconButton sx={{ bgcolor: isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(99,102,241,0.1)' }}>
                    <GitHub />
                  </IconButton>
                  <IconButton sx={{ bgcolor: isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(99,102,241,0.1)' }}>
                    <LinkedIn />
                  </IconButton>
                  <IconButton sx={{ bgcolor: isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(99,102,241,0.1)' }}>
                    <Twitter />
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  startIcon={<Edit />}
                  fullWidth
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                    boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
                  }}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ ...cardStyle, mt: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Contact Information
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Email sx={{ color: 'primary.main' }} />
                    <Typography variant="body2">john.doe@example.com</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Phone sx={{ color: 'primary.main' }} />
                    <Typography variant="body2">+1 234 567 8900</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <LocationOn sx={{ color: 'primary.main' }} />
                    <Typography variant="body2">San Francisco, CA</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarMonth sx={{ color: 'primary.main' }} />
                    <Typography variant="body2">Joined January 2024</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        {/* Main Content */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Grid container spacing={2} sx={{ mb: 3 }}>
              {stats.map((stat) => (
                <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
                  <Card sx={cardStyle}>
                    <CardContent sx={{ textAlign: 'center', py: 2 }}>
                      <Typography variant="h4" fontWeight={700} color="primary">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>

          {/* About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card sx={{ ...cardStyle, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  About Me
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  Senior Administrator with over 5 years of experience in managing enterprise-level applications
                  and leading cross-functional teams. Passionate about creating efficient workflows and implementing
                  best practices. Skilled in React, TypeScript, Node.js, and cloud technologies. Always eager to
                  learn new technologies and contribute to innovative projects.
                </Typography>
                <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: isMobile ? 'wrap' : 'nowrap' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Work sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2">Tech Corp Inc.</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <School sx={{ color: 'primary.main', fontSize: 20 }} />
                    <Typography variant="body2">Stanford University</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card sx={{ ...cardStyle, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Skills
                </Typography>
                {skills.map((skill, index) => (
                  <Box key={skill.name} sx={{ mb: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {skill.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {skill.level}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
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
                            : index === 3
                            ? 'linear-gradient(90deg, #ec4899 0%, #f472b6 100%)'
                            : 'linear-gradient(90deg, #8b5cf6 0%, #a855f7 100%)',
                        },
                      }}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Recent Activity
                </Typography>
                {activities.map((activity, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      py: 1.5,
                      borderBottom: index < activities.length - 1
                        ? `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
                        : 'none',
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: activity.type === 'success' ? '#10b981'
                          : activity.type === 'info' ? '#06b6d4'
                          : activity.type === 'primary' ? '#6366f1'
                          : activity.type === 'warning' ? '#f59e0b'
                          : '#94a3b8',
                      }}
                    />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {activity.action}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {activity.time}
                      </Typography>
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

export default Profile;

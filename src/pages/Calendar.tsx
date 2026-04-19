import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  Add,
  AccessTime,
  LocationOn,
  People,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

interface Event {
  id: number;
  title: string;
  time: string;
  duration: string;
  location?: string;
  attendees?: string[];
  color: string;
  type: 'meeting' | 'task' | 'reminder' | 'event';
}

const events: Event[] = [
  { id: 1, title: 'Team Standup', time: '09:00', duration: '30 min', location: 'Zoom', attendees: ['JS', 'SW', 'MJ'], color: '#6366f1', type: 'meeting' },
  { id: 2, title: 'Project Review', time: '11:00', duration: '1 hour', location: 'Conference Room A', attendees: ['ED', 'CB'], color: '#14b8a6', type: 'meeting' },
  { id: 3, title: 'Lunch Break', time: '12:30', duration: '1 hour', color: '#f59e0b', type: 'event' },
  { id: 4, title: 'Client Call', time: '14:00', duration: '45 min', location: 'Phone', attendees: ['LA'], color: '#ec4899', type: 'meeting' },
  { id: 5, title: 'Code Review', time: '15:30', duration: '1 hour', attendees: ['DM', 'JT'], color: '#8b5cf6', type: 'task' },
  { id: 6, title: 'Submit Report', time: '17:00', duration: '30 min', color: '#ef4444', type: 'reminder' },
];

const Calendar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { isDarkMode } = useThemeContext();
  const [currentDate, setCurrentDate] = useState(new Date());

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1));
  };

  const days = getDaysInMonth(currentDate);
  const today = new Date().getDate();
  const isCurrentMonth = currentDate.getMonth() === new Date().getMonth() && currentDate.getFullYear() === new Date().getFullYear();

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}>
              Calendar
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage your schedule and events
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<Add />}
            fullWidth={isMobile}
            sx={{
              maxWidth: { xs: '100%', sm: 'fit-content' },
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
            }}
          >
            Add Event
          </Button>
        </Box>
      </motion.div>

      <Grid container spacing={3}>
        {/* Calendar Grid */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card sx={cardStyle}>
              <CardContent sx={{ p: 3 }}>
                {/* Month Navigation */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <IconButton onClick={() => navigateMonth(-1)}>
                    <ChevronLeft />
                  </IconButton>
                  <Typography variant={isMobile ? 'h6' : 'h5'} fontWeight={600}>
                    {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </Typography>
                  <IconButton onClick={() => navigateMonth(1)}>
                    <ChevronRight />
                  </IconButton>
                </Box>

                {/* Days of Week Header */}
                <Grid container spacing={1} sx={{ mb: 2 }}>
                  {daysOfWeek.map((day) => (
                    <Grid size={{ xs: 12 / 7 }} key={day}>
                      <Typography
                        variant="caption"
                        fontWeight={600}
                        color="text.secondary"
                        sx={{ display: 'block', textAlign: 'center' }}
                      >
                        {isMobile ? day[0] : day}
                      </Typography>
                    </Grid>
                  ))}
                </Grid>

                {/* Calendar Days */}
                <Grid container spacing={1}>
                  {days.map((day, index) => (
                    <Grid size={{ xs: 12 / 7 }} key={index}>
                      <Box
                        sx={{
                          aspectRatio: '1',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 2,
                          cursor: day ? 'pointer' : 'default',
                          bgcolor: day && isCurrentMonth && day === today
                            ? 'primary.main'
                            : 'transparent',
                          color: day && isCurrentMonth && day === today
                            ? 'white'
                            : day
                            ? 'text.primary'
                            : 'transparent',
                          '&:hover': day ? {
                            bgcolor: day && isCurrentMonth && day === today
                              ? 'primary.dark'
                              : isDarkMode
                              ? 'rgba(129,140,248,0.1)'
                              : 'rgba(99,102,241,0.1)',
                          } : {},
                          transition: 'all 0.2s ease',
                          position: 'relative',
                        }}
                      >
                        <Typography variant="body2" fontWeight={day && isCurrentMonth && day === today ? 600 : 400}>
                          {day}
                        </Typography>
                        {day && [5, 12, 15, 20, 25].includes(day) && (
                          <Box
                            sx={{
                              position: 'absolute',
                              bottom: 4,
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: day === 5 ? '#6366f1' : day === 12 ? '#14b8a6' : day === 15 ? '#f59e0b' : day === 20 ? '#ec4899' : '#8b5cf6',
                            }}
                          />
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </motion.div>

          {/* Mini Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {[
                { label: 'Meetings', value: '12', color: '#6366f1' },
                { label: 'Tasks', value: '8', color: '#14b8a6' },
                { label: 'Reminders', value: '5', color: '#f59e0b' },
                { label: 'Events', value: '3', color: '#ec4899' },
              ].map((stat) => (
                <Grid size={{ xs: 6, sm: 3 }} key={stat.label}>
                  <Card sx={cardStyle}>
                    <CardContent sx={{ p: 2, textAlign: 'center' }}>
                      <Typography variant="h4" fontWeight={700} sx={{ color: stat.color }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {stat.label}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        {/* Today's Events */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ ...cardStyle, height: 'fit-content' }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Today's Schedule
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </Typography>

                {events.map((event, index) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 2,
                        p: 2,
                        mb: 2,
                        borderRadius: 2,
                        bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(99,102,241,0.03)',
                        borderLeft: `4px solid ${event.color}`,
                        '&:hover': {
                          bgcolor: isDarkMode ? 'rgba(129,140,248,0.1)' : 'rgba(99,102,241,0.08)',
                        },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {event.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          <AccessTime sx={{ fontSize: 14, color: 'text.secondary' }} />
                          <Typography variant="caption" color="text.secondary">
                            {event.time} ({event.duration})
                          </Typography>
                        </Box>
                        {event.location && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                            <LocationOn sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {event.location}
                            </Typography>
                          </Box>
                        )}
                        {event.attendees && (
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                            <People sx={{ fontSize: 14, color: 'text.secondary' }} />
                            <Box sx={{ display: 'flex', ml: 0.5 }}>
                              {event.attendees.map((attendee, i) => (
                                <Avatar
                                  key={attendee}
                                  sx={{
                                    width: 24,
                                    height: 24,
                                    fontSize: '0.6rem',
                                    ml: i > 0 ? -0.5 : 0,
                                    border: `2px solid ${isDarkMode ? '#1e293b' : '#fff'}`,
                                    background: `linear-gradient(135deg, ${event.color} 0%, ${event.color}99 100%)`,
                                  }}
                                >
                                  {attendee}
                                </Avatar>
                              ))}
                            </Box>
                          </Box>
                        )}
                      </Box>
                      <Chip
                        label={event.type}
                        size="small"
                        sx={{
                          bgcolor: `${event.color}20`,
                          color: event.color,
                          fontWeight: 600,
                          fontSize: '0.65rem',
                          height: 22,
                        }}
                      />
                    </Box>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Calendar;

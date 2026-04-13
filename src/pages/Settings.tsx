import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  TextField,
  Button,
  Divider,
  Avatar,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
} from '@mui/material';
import {
  Person,
  Notifications,
  Security,
  Palette,
  Language,
  Save,
  PhotoCamera,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

const Settings: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [language, setLanguage] = useState('en');
  const [timezone, setTimezone] = useState('UTC');

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: '30',
  });

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  const SettingSection: React.FC<{ icon: React.ReactNode; title: string; description: string; children: React.ReactNode }> = ({
    icon,
    title,
    description,
    children,
  }) => (
    <Card sx={{ ...cardStyle, mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: 'white',
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="h6" fontWeight={600}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {description}
            </Typography>
          </Box>
        </Box>
        {children}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Settings
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Manage your account settings and preferences
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Profile Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SettingSection
              icon={<Person />}
              title="Profile Settings"
              description="Update your personal information"
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      fontSize: '1.5rem',
                    }}
                  >
                    JD
                  </Avatar>
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                    }}
                  >
                    <PhotoCamera fontSize="small" />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    John Doe
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Administrator
                  </Typography>
                </Box>
              </Box>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="First Name" defaultValue="John" size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Last Name" defaultValue="Doe" size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Email" defaultValue="john.doe@example.com" size="small" />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Phone" defaultValue="+1 234 567 8900" size="small" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Bio" multiline rows={3} defaultValue="Senior Administrator with 5+ years of experience." size="small" />
                </Grid>
              </Grid>
            </SettingSection>
          </motion.div>

          {/* Notification Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SettingSection
              icon={<Notifications />}
              title="Notification Settings"
              description="Manage how you receive notifications"
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>Email Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">Receive notifications via email</Typography>
                  </Box>
                  <Switch
                    checked={notifications.email}
                    onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
                    color="primary"
                  />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>Push Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">Receive push notifications</Typography>
                  </Box>
                  <Switch
                    checked={notifications.push}
                    onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
                    color="primary"
                  />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>SMS Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">Receive SMS alerts</Typography>
                  </Box>
                  <Switch
                    checked={notifications.sms}
                    onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
                    color="primary"
                  />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>Marketing Emails</Typography>
                    <Typography variant="body2" color="text.secondary">Receive marketing and promotional emails</Typography>
                  </Box>
                  <Switch
                    checked={notifications.marketing}
                    onChange={(e) => setNotifications({ ...notifications, marketing: e.target.checked })}
                    color="primary"
                  />
                </Box>
              </Box>
            </SettingSection>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SettingSection
              icon={<Security />}
              title="Security Settings"
              description="Manage your account security"
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>Two-Factor Authentication</Typography>
                    <Typography variant="body2" color="text.secondary">Add an extra layer of security</Typography>
                  </Box>
                  <Switch
                    checked={security.twoFactor}
                    onChange={(e) => setSecurity({ ...security, twoFactor: e.target.checked })}
                    color="primary"
                  />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>Login Alerts</Typography>
                    <Typography variant="body2" color="text.secondary">Get notified of new logins</Typography>
                  </Box>
                  <Switch
                    checked={security.loginAlerts}
                    onChange={(e) => setSecurity({ ...security, loginAlerts: e.target.checked })}
                    color="primary"
                  />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>Session Timeout</Typography>
                    <Typography variant="body2" color="text.secondary">Auto logout after inactivity</Typography>
                  </Box>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <Select
                      value={security.sessionTimeout}
                      onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                    >
                      <MenuItem value="15">15 minutes</MenuItem>
                      <MenuItem value="30">30 minutes</MenuItem>
                      <MenuItem value="60">1 hour</MenuItem>
                      <MenuItem value="120">2 hours</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Divider />
                <Button variant="outlined" color="error" sx={{ alignSelf: 'flex-start' }}>
                  Change Password
                </Button>
              </Box>
            </SettingSection>
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <SettingSection
              icon={<Palette />}
              title="Appearance"
              description="Customize the look and feel"
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body1" fontWeight={500}>Dark Mode</Typography>
                    <Typography variant="body2" color="text.secondary">Toggle dark theme</Typography>
                  </Box>
                  <Switch checked={isDarkMode} onChange={toggleTheme} color="primary" />
                </Box>
              </Box>
            </SettingSection>
          </motion.div>

          {/* Language Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <SettingSection
              icon={<Language />}
              title="Language & Region"
              description="Set your language preferences"
            >
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Language</InputLabel>
                  <Select value={language} label="Language" onChange={(e) => setLanguage(e.target.value)}>
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                    <MenuItem value="ja">Japanese</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <InputLabel>Timezone</InputLabel>
                  <Select value={timezone} label="Timezone" onChange={(e) => setTimezone(e.target.value)}>
                    <MenuItem value="UTC">UTC</MenuItem>
                    <MenuItem value="EST">Eastern Time</MenuItem>
                    <MenuItem value="PST">Pacific Time</MenuItem>
                    <MenuItem value="GMT">GMT</MenuItem>
                    <MenuItem value="CET">Central European</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </SettingSection>
          </motion.div>

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              variant="contained"
              fullWidth
              startIcon={<Save />}
              sx={{
                py: 1.5,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)',
              }}
            >
              Save All Changes
            </Button>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;

import React, { useState } from 'react';
import {
  Box,
  Card,
  Typography,
  TextField,
  InputAdornment,
  Avatar,
  Badge,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search,
  Send,
  AttachFile,
  EmojiEmotions,
  MoreVert,
  Phone,
  VideoCall,
  Circle,
  ArrowBack,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useThemeContext } from '../context/ThemeContext';

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  sender: 'me' | 'other';
  text: string;
  time: string;
}

const contacts: Contact[] = [
  { id: 1, name: 'Sarah Wilson', avatar: 'SW', lastMessage: 'Hey, how are you doing?', time: '2 min', unread: 3, online: true },
  { id: 2, name: 'Mike Johnson', avatar: 'MJ', lastMessage: 'The project is almost done!', time: '15 min', unread: 0, online: true },
  { id: 3, name: 'Emily Davis', avatar: 'ED', lastMessage: 'Can we schedule a meeting?', time: '1 hour', unread: 1, online: false },
  { id: 4, name: 'Chris Brown', avatar: 'CB', lastMessage: 'Thanks for your help!', time: '3 hours', unread: 0, online: false },
  { id: 5, name: 'Lisa Anderson', avatar: 'LA', lastMessage: 'I sent you the files', time: '1 day', unread: 0, online: true },
  { id: 6, name: 'David Martinez', avatar: 'DM', lastMessage: 'Let me know when you are free', time: '2 days', unread: 0, online: false },
];

const messages: Message[] = [
  { id: 1, sender: 'other', text: 'Hey! How are you doing today?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Hi Sarah! I am doing great, thanks for asking. How about you?', time: '10:32 AM' },
  { id: 3, sender: 'other', text: 'I am good too! Just wanted to check in about the project.', time: '10:33 AM' },
  { id: 4, sender: 'other', text: 'Did you get a chance to review the latest designs?', time: '10:33 AM' },
  { id: 5, sender: 'me', text: 'Yes, I did! They look amazing. Great work on the new dashboard layout.', time: '10:35 AM' },
  { id: 6, sender: 'other', text: 'Thank you! I spent a lot of time on the color scheme.', time: '10:36 AM' },
  { id: 7, sender: 'me', text: 'It really shows. The glassmorphism effects are particularly nice.', time: '10:38 AM' },
  { id: 8, sender: 'other', text: 'Hey, how are you doing?', time: '10:40 AM' },
];

const Messages: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isDarkMode } = useThemeContext();
  const [selectedContact, setSelectedContact] = useState<Contact | null>(isMobile ? null : contacts[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const cardStyle = {
    background: isDarkMode
      ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(15,23,42,0.8) 100%)'
      : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
        border: `1px solid ${isDarkMode ? 'rgba(129,140,248,0.2)' : 'rgba(99,102,241,0.15)'}`,
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const activeContact = selectedContact ?? contacts[0];

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom sx={{ fontSize: { xs: '1.6rem', sm: '2rem' } }}>
          Messages
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Chat with your team members
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card sx={{ ...cardStyle, height: { xs: 'calc(100dvh - 150px)', md: 'calc(100vh - 250px)' }, minHeight: { xs: 440, md: 500 } }}>
          <Box sx={{ display: 'flex', height: '100%' }}>
            {/* Contacts List */}
            <Box
              sx={{
                width: { xs: '100%', md: 320 },
                borderRight: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                display: { xs: selectedContact ? 'none' : 'block', md: 'block' },
              }}
            >
              <Box sx={{ p: 2 }}>
                <TextField
                  fullWidth
                  placeholder="Search contacts..."
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Divider />
              <List sx={{ overflow: 'auto', height: 'calc(100% - 72px)' }}>
                {filteredContacts.map((contact) => (
                  <ListItem
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    sx={{
                      cursor: 'pointer',
                      bgcolor: selectedContact?.id === contact.id
                        ? isDarkMode
                          ? 'rgba(129,140,248,0.1)'
                          : 'rgba(99,102,241,0.08)'
                        : 'transparent',
                      '&:hover': {
                        bgcolor: isDarkMode
                          ? 'rgba(129,140,248,0.05)'
                          : 'rgba(99,102,241,0.05)',
                      },
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeContent={
                          contact.online ? (
                            <Circle sx={{ fontSize: 12, color: '#10b981' }} />
                          ) : null
                        }
                      >
                        <Avatar
                          sx={{
                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                          }}
                        >
                          {contact.avatar}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {contact.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {contact.time}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                              maxWidth: 150,
                            }}
                          >
                            {contact.lastMessage}
                          </Typography>
                          {contact.unread > 0 && (
                            <Box
                              sx={{
                                minWidth: 20,
                                height: 20,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                color: 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                              }}
                            >
                              {contact.unread}
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </Box>

            {/* Chat Area */}
            <Box sx={{ flex: 1, display: { xs: selectedContact ? 'flex' : 'none', md: 'flex' }, flexDirection: 'column' }}>
              {/* Chat Header */}
              <Box
                sx={{
                  p: 2,
                  borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {isMobile && selectedContact && (
                    <IconButton size="small" onClick={() => setSelectedContact(null)}>
                      <ArrowBack />
                    </IconButton>
                  )}
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                      activeContact.online ? (
                        <Circle sx={{ fontSize: 12, color: '#10b981' }} />
                      ) : null
                    }
                  >
                    <Avatar
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                      }}
                    >
                      {activeContact.avatar}
                    </Avatar>
                  </Badge>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {activeContact.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activeContact.online ? 'Online' : 'Offline'}
                    </Typography>
                  </Box>
                </Box>
                <Box>
                  <IconButton>
                    <Phone />
                  </IconButton>
                  <IconButton>
                    <VideoCall />
                  </IconButton>
                  <IconButton>
                    <MoreVert />
                  </IconButton>
                </Box>
              </Box>

              {/* Messages */}
              <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: message.sender === 'me' ? 'flex-end' : 'flex-start',
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          maxWidth: '70%',
                          p: 2,
                          borderRadius: 3,
                          background: message.sender === 'me'
                            ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
                            : isDarkMode
                            ? 'rgba(129,140,248,0.1)'
                            : 'rgba(99,102,241,0.08)',
                          color: message.sender === 'me' ? 'white' : 'inherit',
                        }}
                      >
                        <Typography variant="body2">{message.text}</Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            display: 'block',
                            mt: 0.5,
                            opacity: 0.7,
                            textAlign: message.sender === 'me' ? 'right' : 'left',
                          }}
                        >
                          {message.time}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              {/* Message Input */}
              <Box
                sx={{
                  p: 2,
                  borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                }}
              >
                <IconButton>
                  <AttachFile />
                </IconButton>
                <IconButton>
                  <EmojiEmotions />
                </IconButton>
                <TextField
                  fullWidth
                  placeholder="Type a message..."
                  size="small"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    minWidth: 48,
                    height: 48,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  }}
                >
                  <Send />
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Messages;

import React, { useState } from 'react';
import {
    Box,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Switch,
    Divider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Avatar,
    Button
} from '@mui/material';
import { useColorMode } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { toast } from 'react-toastify';

const SettingsPage = () => {
    const { toggleColorMode, mode } = useColorMode();
    const { user } = useAuth();
    const { t, i18n } = useTranslation();
    const theme = useTheme();

    const [notifications, setNotifications] = useState(true);

    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    const handleNotificationToggle = () => {
        setNotifications(!notifications);
        toast.info(`Notifications ${!notifications ? 'enabled' : 'disabled'}`);
    };

    return (
        <Box maxWidth="md">
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                {t('settings')}
            </Typography>

            {/* Account Section */}
            <Paper sx={{ mb: 3, p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56 }}>
                        <PersonIcon fontSize="large" />
                    </Avatar>
                    <Box>
                        <Typography variant="h6">{user?.name || 'User'}</Typography>
                        <Typography variant="body2" color="text.secondary">{user?.email || 'user@example.com'}</Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                    <Button variant="outlined" color="primary">Edit Profile</Button>
                    <Button variant="outlined" color="error">Change Password</Button>
                </Box>
            </Paper>

            {/* Preferences Section */}
            <Paper>
                <List>
                    <ListItem>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                            <ListItemText primary={t('dark_mode')} secondary="Toggle light/dark theme" />
                        </Box>
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                onChange={toggleColorMode}
                                checked={mode === 'dark'}
                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <LanguageIcon />
                            <ListItemText primary={t('language')} />
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <Select
                                    value={i18n.language}
                                    onChange={handleLanguageChange}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="en">English</MenuItem>
                                    <MenuItem value="bn">বাংলা (Bangla)</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <NotificationsIcon />
                            <ListItemText primary="Notifications" secondary="Receive daily reminders" />
                        </Box>
                        <ListItemSecondaryAction>
                            <Switch
                                edge="end"
                                onChange={handleNotificationToggle}
                                checked={notifications}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List>
            </Paper>
        </Box>
    );
};

export default SettingsPage;

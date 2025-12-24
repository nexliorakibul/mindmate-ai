import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Typography,
    Box,
    Slider,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Divider,
} from '@mui/material';
import MoodChartWidget from '../dashboard/MoodChartWidget';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const moodIcons = {
    1: <SentimentVeryDissatisfiedIcon color="error" fontSize="large" />,
    2: <SentimentDissatisfiedIcon color="warning" fontSize="large" />,
    3: <SentimentSatisfiedIcon color="info" fontSize="large" />,
    4: <SentimentSatisfiedAltIcon color="success" fontSize="large" />,
    5: <SentimentVerySatisfiedIcon color="success" fontSize="large" />,
};

const MoodPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState(3);
    const [history, setHistory] = useState([
        { id: 1, date: 'Today', score: 4, note: 'Had a productive day.' },
        { id: 2, date: 'Yesterday', score: 2, note: 'Felt a bit overwhelmed.' },
        { id: 3, date: 'Oct 24', score: 5, note: 'Great workout!' },
    ]);

    const handleSubmit = () => {
        const newEntry = {
            id: Date.now(),
            date: 'Just now',
            score: value,
            note: 'New entry'
        };
        setHistory([newEntry, ...history]);
        toast.success("Mood checked in!");
    };

    const getIcon = (score) => moodIcons[score] || moodIcons[3];

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t('mood')}
            </Typography>

            <Grid container spacing={3}>
                {/* Check-in Section */}
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Paper sx={{ p: 4, textAlign: 'center' }}>
                            <Typography variant="h6" gutterBottom>
                                {t('mood_checkin')}
                            </Typography>
                            <Box sx={{ my: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                                {getIcon(value)}
                                <Typography variant="h4">{value}/5</Typography>
                            </Box>
                            <Box sx={{ px: 4 }}>
                                <Slider
                                    aria-label="Mood"
                                    defaultValue={3}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={1}
                                    max={5}
                                    value={value}
                                    onChange={(e, val) => setValue(val)}
                                    sx={{ color: 'primary.main' }}
                                />
                            </Box>
                            <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSubmit}>
                                Check In
                            </Button>
                        </Paper>
                    </motion.div>
                </Grid>

                {/* Analytics Chart */}
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
                        <MoodChartWidget />
                    </motion.div>
                </Grid>

                {/* History List */}
                <Grid item xs={12}>
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Recent History
                            </Typography>
                            <List>
                                {history.map((entry, index) => (
                                    <React.Fragment key={entry.id}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'transparent' }}>
                                                    {getIcon(entry.score)}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`Score: ${entry.score} - ${entry.date}`}
                                                secondary={entry.note}
                                            />
                                        </ListItem>
                                        {index < history.length - 1 && <Divider variant="inset" component="li" />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MoodPage;

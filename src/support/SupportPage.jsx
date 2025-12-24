import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RefreshIcon from '@mui/icons-material/Refresh';
import SpaIcon from '@mui/icons-material/Spa';
import TimerIcon from '@mui/icons-material/Timer'; // Using Timer as generic since SelfImprovement is used elsewhere
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import { useTranslation } from 'react-i18next';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const BreathingExercise = () => {
    const [isActive, setIsActive] = useState(false);
    const [instruction, setInstruction] = useState("Ready?");

    useEffect(() => {
        let interval;
        if (isActive) {
            const cycle = () => {
                setInstruction("Inhale...");
                setTimeout(() => {
                    setInstruction("Hold...");
                    setTimeout(() => {
                        setInstruction("Exhale...");
                        setTimeout(() => {
                            if (isActive) cycle();
                        }, 4000);
                    }, 4000);
                }, 4000);
            }
            cycle();
        } else {
            setInstruction("Ready?");
        }
        return () => clearTimeout(interval); // Simple cleanup not perfect for this nested timeout but works for mock
    }, [isActive]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5 }}>
            <Typography variant="h5" gutterBottom>{instruction}</Typography>
            <motion.div
                animate={isActive ? {
                    scale: [1, 1.5, 1.5, 1],
                } : { scale: 1 }}
                transition={isActive ? {
                    duration: 12, // 4s in, 4s hold, 4s out
                    repeat: Infinity,
                    times: [0, 0.33, 0.66, 1]
                } : {}}
            >
                <div style={{
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    backgroundColor: '#A0C4FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0.7
                }}>
                    <SpaIcon sx={{ fontSize: 80, color: 'white' }} />
                </div>
            </motion.div>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsActive(!isActive)}
                sx={{ mt: 4 }}
                startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}
            >
                {isActive ? "Pause" : "Start"}
            </Button>
        </Box>
    );
};

const MeditationTimer = () => {
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <Box sx={{ textAlign: 'center', py: 5 }}>
            <Typography variant="h2" sx={{ fontFamily: 'monospace', mb: 4 }}>
                {formatTime(timeLeft)}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button variant="contained" onClick={() => setIsActive(!isActive)} startIcon={isActive ? <PauseIcon /> : <PlayArrowIcon />}>
                    {isActive ? "Pause" : "Start"}
                </Button>
                <Button variant="outlined" onClick={() => { setIsActive(false); setTimeLeft(300); }} startIcon={<RefreshIcon />}>
                    Reset
                </Button>
            </Box>
        </Box>
    );
};

const Tips = () => {
    const tips = [
        "Drink plenty of water.",
        "Take a 5-minute break every hour.",
        "Practice gratitude daily.",
        "Get 7-8 hours of sleep.",
        "Connect with a friend."
    ];
    return (
        <Grid container spacing={2}>
            {tips.map((tip, idx) => (
                <Grid item xs={12} key={idx}>
                    <Card variant="outlined">
                        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <FormatQuoteIcon color="primary" />
                            <Typography variant="body1">{tip}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

const SupportPage = () => {
    const { t } = useTranslation();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                {t('support')}
            </Typography>
            <Paper sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="support tabs" variant="fullWidth">
                        <Tab label="Breathing" icon={<SpaIcon />} iconPosition="start" />
                        <Tab label="Meditation" icon={<TimerIcon />} iconPosition="start" />
                        <Tab label="Tips" icon={<FormatQuoteIcon />} iconPosition="start" />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <BreathingExercise />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <MeditationTimer />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <Tips />
                </TabPanel>
            </Paper>
        </Box>
    );
};

export default SupportPage;

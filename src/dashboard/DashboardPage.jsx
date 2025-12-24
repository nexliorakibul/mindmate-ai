import React from 'react';
import { Grid, Paper, Typography, Box, Button, Card, CardContent, CardActions } from '@mui/material';
import MoodChartWidget from './MoodChartWidget';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import CreateIcon from '@mui/icons-material/Create';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const DashboardPage = () => {
    const { user } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                {t('welcome')}, {user?.name?.split(' ')[0] || 'Friend'} 👋
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                How are you feeling today?
            </Typography>

            <Grid container spacing={3}>
                {/* Quick Actions */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <motion.div variants={itemVariants}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'primary.light', color: 'white' }}>
                                    <CardContent>
                                        <ChatBubbleOutlineIcon fontSize="large" />
                                        <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                                            Chat with AI
                                        </Typography>
                                        <Typography variant="body2">
                                            Vent or seek advice.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="secondary" onClick={() => navigate('/chat')}>
                                            Start Chat
                                        </Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <motion.div variants={itemVariants}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'secondary.light', color: 'white' }}>
                                    <CardContent>
                                        <CreateIcon fontSize="large" />
                                        <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                                            Journal
                                        </Typography>
                                        <Typography variant="body2">
                                            Write your thoughts.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="primary" onClick={() => navigate('/journal')}>
                                            Write
                                        </Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <motion.div variants={itemVariants}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'success.light', color: 'white' }}>
                                    <CardContent>
                                        <SelfImprovementIcon fontSize="large" />
                                        <Typography variant="h6" component="div" sx={{ mt: 1 }}>
                                            Breathe
                                        </Typography>
                                        <Typography variant="body2">
                                            Take a moment.
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" variant="contained" color="secondary" onClick={() => navigate('/support')}>
                                            Relax
                                        </Button>
                                    </CardActions>
                                </Card>
                            </motion.div>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Mood Chart */}
                <Grid item xs={12} md={4}>
                    <motion.div variants={itemVariants}>
                        <MoodChartWidget />
                    </motion.div>
                </Grid>

                {/* Recent Activity / Quote */}
                <Grid item xs={12}>
                    <motion.div variants={itemVariants}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom color="primary">
                                Daily Wisdom
                            </Typography>
                            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                "Happiness can be found, even in the darkest of times, if one only remembers to turn on the light."
                            </Typography>
                            <Typography variant="caption" display="block" sx={{ mt: 1, textAlign: 'right' }}>
                                — Albus Dumbledore
                            </Typography>
                        </Paper>
                    </motion.div>
                </Grid>
            </Grid>
        </motion.div>
    );
};

export default DashboardPage;

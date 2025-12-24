import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const MoodChartWidget = () => {
    const theme = useTheme();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: false,
            },
        },
        scales: {
            y: {
                min: 0,
                max: 5,
                ticks: {
                    stepSize: 1,
                    callback: (value) => {
                        const labels = ['', 'Sad', 'Bad', 'Okay', 'Good', 'Great'];
                        return labels[value];
                    }
                },
                grid: {
                    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                }
            },
            x: {
                grid: {
                    display: false
                }
            }
        },
    };

    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: 'Mood',
                data: [3, 2, 4, 3, 5, 4, 3],
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(108, 99, 255, 0.2)' : 'rgba(108, 99, 255, 0.2)',
                tension: 0.4,
            },
        ],
    };

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 300 }}>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Weekly Mood
            </Typography>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <Line options={options} data={data} redraw={true} />
            </Box>
        </Paper>
    );
};

export default MoodChartWidget;

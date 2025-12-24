import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/MainLayout';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// Lazy loading pages
const LoginPage = lazy(() => import('../auth/LoginPage'));
const RegisterPage = lazy(() => import('../auth/RegisterPage'));
const DashboardPage = lazy(() => import('../dashboard/DashboardPage'));
const ChatPage = lazy(() => import('../chatbot/ChatPage'));
const JournalPage = lazy(() => import('../journal/JournalPage'));
const MoodPage = lazy(() => import('../mood/MoodPage'));
const SupportPage = lazy(() => import('../support/SupportPage'));
const SettingsPage = lazy(() => import('../settings/SettingsPage'));

const LoadingFallback = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

const AppRoutes = () => {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route element={<MainLayout />}>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/chat" element={<ChatPage />} />
                        <Route path="/journal" element={<JournalPage />} />
                        <Route path="/mood" element={<MoodPage />} />
                        <Route path="/support" element={<SupportPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                    </Route>
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Link,
    Paper,
    InputAdornment,
    IconButton,
    CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await login(data.email, data.password);
            toast.success(t('welcome'));
            navigate('/');
        } catch (error) {
            toast.error('Login failed (Check console for mock creds or use any non-empty values)');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                width: '100vw',
                bgcolor: 'background.default'
            }}
        >
            <Container component="main" maxWidth="xs">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 2 }}>
                        <Typography component="h1" variant="h5" color="primary" sx={{ mb: 2, fontWeight: 'bold' }}>
                            MindMate AI
                        </Typography>
                        <Typography component="h1" variant="h5">
                            {t('login')}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label={t('email')}
                                name="email"
                                autoComplete="email"
                                autoFocus
                                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label={t('password')}
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="current-password"
                                {...register("password", { required: "Password is required" })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, py: 1.5 }}
                                disabled={loading}
                                startIcon={loading && <CircularProgress size={20} color="inherit" />}
                            >
                                {loading ? 'Signing in...' : t('login')}
                            </Button>
                            <Box sx={{ textAlign: 'center' }}>
                                <Link component={RouterLink} to="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Box>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default LoginPage;

import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Avatar, Container } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { motion, AnimatePresence } from 'framer-motion';
import useChat from './useChat';
import { useTheme } from '@mui/material/styles';

const TypingIndicator = () => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', p: 1, bgcolor: 'background.paper', borderRadius: 2, width: 'fit-content' }}>
            <motion.div
                style={{ width: 6, height: 6, margin: 2, borderRadius: '50%', backgroundColor: theme.palette.text.secondary }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
            />
            <motion.div
                style={{ width: 6, height: 6, margin: 2, borderRadius: '50%', backgroundColor: theme.palette.text.secondary }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
                style={{ width: 6, height: 6, margin: 2, borderRadius: '50%', backgroundColor: theme.palette.text.secondary }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
            />
        </Box>
    );
};

const ChatPage = () => {
    const { messages, sendMessage, isTyping } = useChat();
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);
    const theme = useTheme();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(input);
        setInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Container maxWidth="md" sx={{ height: '85vh', display: 'flex', flexDirection: 'column' }}>
            <Paper
                elevation={3}
                sx={{
                    flexGrow: 1,
                    mb: 2,
                    p: 2,
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    backgroundImage: theme.palette.mode === 'light' ? 'linear-gradient(to bottom right, #fdfbfb, #ebedee)' : 'none'
                }}
            >
                <AnimatePresence>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                maxWidth: '70%',
                            }}
                        >
                            <Box sx={{ display: 'flex', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-end', gap: 1 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: msg.sender === 'user' ? 'secondary.main' : 'primary.main',
                                        width: 32, height: 32
                                    }}
                                >
                                    {msg.sender === 'user' ? <PersonIcon fontSize="small" /> : <SmartToyIcon fontSize="small" />}
                                </Avatar>
                                <Paper
                                    elevation={1}
                                    sx={{
                                        p: 2,
                                        borderRadius: 4,
                                        borderBottomRightRadius: msg.sender === 'user' ? 0 : 16,
                                        borderBottomLeftRadius: msg.sender === 'ai' ? 0 : 16,
                                        bgcolor: msg.sender === 'user' ? 'primary.main' : 'background.paper',
                                        color: msg.sender === 'user' ? 'white' : 'text.primary',
                                    }}
                                >
                                    <Typography variant="body1">{msg.text}</Typography>
                                    <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', mt: 0.5, opacity: 0.7 }}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Typography>
                                </Paper>
                            </Box>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{ alignSelf: 'flex-start' }}
                        >
                            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 1 }}>
                                <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}><SmartToyIcon fontSize="small" /></Avatar>
                                <TypingIndicator />
                            </Box>

                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={bottomRef} />
            </Paper>

            <Paper elevation={3} component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', borderRadius: 5 }}>
                <TextField
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Type your message..."
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    multiline
                    maxRows={3}
                />
                <IconButton type="button" sx={{ p: '10px', color: 'primary.main' }} aria-label="send" onClick={handleSend}>
                    <SendIcon />
                </IconButton>
            </Paper>
        </Container>
    );
};

export default ChatPage;

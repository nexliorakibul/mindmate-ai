import { useState, useCallback } from 'react';
import { getRandomResponse } from './data';

const useChat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm MindMate. How are you feeling today?", sender: 'ai', timestamp: new Date() }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = useCallback((text) => {
        if (!text.trim()) return;

        // Add User Message
        const userMessage = {
            id: Date.now(),
            text,
            sender: 'user',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);

        // Simulate AI Response
        setIsTyping(true);
        setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                text: getRandomResponse(),
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, aiMessage]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // Random delay 1.5-2.5s

    }, []);

    return { messages, sendMessage, isTyping };
};

export default useChat;

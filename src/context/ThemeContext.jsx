import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { lightTheme, darkTheme } from '../theme/theme';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('light');

    // Load saved theme
    useEffect(() => {
        const savedMode = localStorage.getItem('mindmate_theme');
        if (savedMode) {
            setMode(savedMode);
        }
    }, []);

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => {
                    const newMode = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem('mindmate_theme', newMode);
                    return newMode;
                });
            },
            mode,
        }),
        [mode],
    );

    const theme = useMemo(
        () => (mode === 'light' ? lightTheme : darkTheme),
        [mode],
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ColorModeContext.Provider>
    );
};

export const useColorMode = () => useContext(ColorModeContext);

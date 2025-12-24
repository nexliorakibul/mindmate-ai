import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ColorModeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import './i18n/config'; // Initialize i18n
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <ColorModeProvider>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </ColorModeProvider>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css'; // Ensure this is imported to apply global styles

const theme = createTheme({
  typography: {
    fontFamily: 'Trebutech MS, Arial, sans-serif', // Set your font family here
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>        
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      </ThemeProvider>
  );
}

export default App;

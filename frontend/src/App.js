import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import './index.css'; // Ensure this is imported to apply global styles
import Page1 from './components/GridView';

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
          <Route path="/page-1" element={<Page1 />} />
        </Routes>
      </Router>
      </ThemeProvider>
  );
}

export default App;

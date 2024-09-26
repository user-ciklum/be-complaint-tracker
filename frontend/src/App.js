import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Button } from '@mui/material';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import { lightTheme, darkTheme } from './themes';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Button onClick={toggleTheme} variant="contained" sx={{ position: 'absolute', top: 16, right: 16 }}>
          Toggle Theme
        </Button>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

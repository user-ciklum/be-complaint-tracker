import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';

import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Paper,
} from '@mui/material';

const Notification = ({ message, open, onClose }) => (
  <Snackbar
    open={open}
    autoHideDuration={6000}
    onClose={onClose}
    message={message}
    action={<Button color="inherit" onClick={onClose}>Close</Button>}
  />
);


const LoginScreen = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  const [selectedRole, setSelectedRole] = useState('parent');
  const [otpTimer, setOtpTimer] = useState(60);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const navigate = useNavigate();

  

  useEffect(() => {
    let timer;
    if (isOtpSent && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      setIsOtpSent(false);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, otpTimer]);

  const onSubmit = (data) => {
    if (!isOtpSent) {
    //   alert(`OTP sent to ${data.mobileNumber}`);
      setIsOtpSent(true);
      setSnackbarMessage('OTP sent successfully!');
    setSnackbarOpen(true);
      setOtpTimer(60); // Reset the timer on sending OTP
    } else {
    //   alert(`Logged in as ${selectedRole}`);
      navigate('/dashboard');
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleResendOtp = () => {
    if (!isOtpSent) {
      alert("Please send OTP first!");
      return;
    }
    alert(`OTP resent to ${watch('mobileNumber')}`);
    setOtpTimer(60); // Reset the timer on resending OTP
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          {/* Mobile Number Input */}
          <TextField
            fullWidth
            label="Mobile Number"
            variant="outlined"
            margin="normal"
            {...register('mobileNumber', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[6-9]\d{9}$/,
                message: 'Invalid mobile number',
              },
            })}
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber ? errors.mobileNumber.message : ''}
          />

          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            margin="normal"
          />

          {/* Login Button */}
          <Button
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            disabled={otpTimer === 0 && isOtpSent} // Disable if OTP has expired
          >
            Login
          </Button>
          <Notification
        message={snackbarMessage}
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
      />
        </form>
      </Paper>
    </Container>
  );
};

export default LoginScreen;

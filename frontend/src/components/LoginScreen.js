  import React, { useState, useEffect } from 'react';
  import { useForm } from 'react-hook-form';
  import { useNavigate } from 'react-router-dom';
  import { Alert, Snackbar } from '@mui/material';
  import { IconButton, InputAdornment } from '@mui/material';
  import { Visibility, VisibilityOff } from '@mui/icons-material';
  import {
    TextField,
    Button,
    Typography,
    Container,
    Paper,
  } from '@mui/material';
import CommonApiCallService from './CommonApiCall.Service';

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
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberError, setMobileNumberError] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isServiceFailed, setIsServiceFailed] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const password = watch('password');

    useEffect(() => {
      setIsFormValid(password?.length);
    }, [password])

    // Mobile number validation logic
    useEffect(() => {
      const numbersOnly = handleMobileNumberChange(mobileNumber);
      if (numbersOnly) {
        if (mobileNumber.length > 10) {
          setIsFormValid(false);
          setMobileNumberError('Mobile number cannot exceed 10 digits');
        } else if (mobileNumber.length < 10 && mobileNumber.length > 0) {
          setIsFormValid(false);
          setMobileNumberError('Mobile number must be exactly 10 digits');
        } else {
          setIsFormValid(true);
          setMobileNumberError('');
        }
      }      
    }, [mobileNumber]);

    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const handleMobileNumberChange = (number) => {
      const value = number;
      
      // Check if the input is a number using a regex
      const isValid = /^[0-9]*$/.test(value);
  
      if (!isValid) {
        setMobileNumberError('Only numbers are allowed');
      } else return true;
    };

  const userLoginCallbackHandler = (userDetails) => {
    navigate('/dashboard', { state: { userDetails } });
  };
  
  const userLoginErrorCallbackHandler = () => {
    setIsServiceFailed(true);
  };
    
  const onSubmit = () => {
    setIsServiceFailed(false);
    let payload = {
      "username": mobileNumber,
      "password": password
    };
    
    CommonApiCallService.userLogin(payload, userLoginCallbackHandler, userLoginErrorCallbackHandler);
  };

    return (
      <Container maxWidth="sm" sx={{ width: '450px'}}>
        <Paper elevation={3} sx={{ padding: 4, marginTop: 8, }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4" gutterBottom>
              Login
            </Typography>
            {/* Conditionally render the error banner */}
            {isServiceFailed && (
              <Alert severity="error">
                You have entered an invalid credentials!
              </Alert>
            )}
            
            {/* Mobile Number Input */}
            <TextField
              fullWidth
              label="Mobile Number"
              variant="outlined"
              margin="normal"
              value={mobileNumber}
              autoComplete="mobile number"
              onChange={(e) => setMobileNumber(e.target.value)}
              error={!!mobileNumberError}
              helperText={mobileNumberError}
            />

            <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  margin="normal"
                  type={showPassword ? 'text' : 'password'} // Toggle between 'text' and 'password'
                  autoComplete="new-password"
                  {...register('password', { required: 'Password is required' })}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

            {/* Login Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ marginTop: 2, height: '48px'}}
              disabled={!isFormValid}>
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

// BookNowModal.js

import React, { useState } from 'react';
import {
  Stack,
  Container,
  TextField,
  Button,
  IconButton,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';

function BookNowModal({}) {
  const [service, setService] = useState('');

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    dateTime: null
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleDateTimeChange = (newDateTime) => {
    setFormData({
      ...formData,
      dateTime: newDateTime,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('YOUR_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      // Handle response
      console.log('Response:', response);
      // Clear form fields after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  console.log(formData)

  return (
    <Container maxWidth="sm">
        <form onSubmit={handleSubmit}> 
        <Stack spacing={2}>
          <TextField
            id="firstName"
            name="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            id="lastName"
            name="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />
           <TextField
            id="phone"
            name="phone"
            label="Phone"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel id="service-label">Select a Service</InputLabel>
            <Select
              labelId="service-label"
              id="service"
              name="service"
              value={service}
              onChange={handleChange}
              label="Service"
            >
              <MenuItem value="Brows">Brows</MenuItem>
              <MenuItem value="Facials">Facials</MenuItem>
              {/* Add more MenuItem components for other services */}
            </Select>
          </FormControl>
          <DateTimePicker
            label="Select Date and Time"
            value={formData.dateTime}
            onChange={handleDateTimeChange}
            renderInput={(props) => <TextField {...props} />}
            fullWidth
          />
          {/* Add more Material-UI components for other fields */}
          <Button variant="contained" color="primary" fullWidth>
            Submit
          </Button>
          </Stack>
        </form>
    </Container>
  );
}

export default BookNowModal;

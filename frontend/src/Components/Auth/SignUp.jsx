import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper
} from '@mui/material';

import { toast } from "react-toastify";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';
const SignUp= () => {


  const[name,setname]=useState('');
  const[email,setemail]=useState('');
  const[password,setpassword]=useState('');
  const[role,setrole]=useState('');
  const[phone,setphone]=useState('');
  const NavigateTo=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const { data } =await axios
        .post(
          "http://localhost:8000/api/v1/user/Register",
          { name, email, phone, password, role },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
         setname('');
         setemail('');
         setphone('');
         setpassword('');
         setrole(''); 
         NavigateTo('/login');
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setname(e.target.value)}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel htmlFor="role">Role</InputLabel>
                <Select
                  label="Role"
                  id="role"
                  name="role"
                  value={role}
                  onChange={(e) => setrole(e.target.value)}
                >
                  <MenuItem value="JobSeeker">Job Seeker</MenuItem>
                  <MenuItem value="Employer">Employer</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUp;

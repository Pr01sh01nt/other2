import React, { useContext, useState } from 'react';
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
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";

import { Context } from '../../main';
const Login = () => {

  const{isAuthorized,setIsAuthorized}=useContext(Context);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [role, setrole] = useState('');
const NavigateTo=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const { data } = await axios.post(
          "http://localhost:8000/api/v1/user/login",
          { email, password, role },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        toast.success(data.message);
        setemail("");
        setpassword("");
        setrole("");
        NavigateTo('/');
        setIsAuthorized(true);
      
      } catch (error) {
        toast.error(error.response.data.message);
      }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
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
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;

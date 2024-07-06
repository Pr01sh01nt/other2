
import React, { useContext, useState } from 'react';
import {AppBar, Toolbar, Typography, Button, Grid, Avatar,Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
   
  const{isAuthorized,user,setIsAuthorized,setUser}=useContext(Context);

    const navigateTo=useNavigate();
    // Example function to handle logout
    const handleLogout = async(e) => {
        
      e.preventDefault();
      try{

      const {data}=await axios.get("http://localhost:8000/api/v1/user/logout",
        {
          withCredentials: true,
      });
           
      setIsAuthorized(false);
       
      toast.success(data.message);
       navigateTo("/login");
       setUser('');
    } catch(error)
     {
        toast.error(error.response.data.message);
     }
    }

    return (
        <AppBar position="static">
        <Toolbar>
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                    {/* Logo Box in the middle */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="User Avatar" src={"/logo_146x70.png"} sx={{ width: 40, height: 40, marginRight: '10px', backgroundColor: 'white' }} />
                    </Box>
                </Grid>

                <Grid item container xs={6} justifyContent="center" spacing={1}>
                    <Grid item>
                        <Button component={Link} to="/" color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Home
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button component={Link} to="/job/jobs" color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
                            All Jobs
                        </Button>
                    </Grid>
                    {user.role === "Employer" && (
                        <>
                            <Grid item>
                                <Button component={Link} to="/job/Viewmyjobs" color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    My Jobs
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button component={Link} to="/job/postjob" color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Post New Job
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button component={Link} to="/application/employerapplication" color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Available Applications
                                </Button>
                            </Grid>
                        </>
                    )}
                    {user.role === "JobSeeker" && (
                        <Grid item>
                            <Button component={Link} to="/application/me" color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
                                My Applications
                            </Button>
                        </Grid>
                    )}
                </Grid>
                <Grid item>
                    {isAuthorized ? (
                        <Button onClick={handleLogout} color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Logout
                        </Button>
                    ) : (
                        <Button component={Link} to="/login" color="inherit" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Login
                        </Button>
                    )}
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
    );
};

export default Navbar;

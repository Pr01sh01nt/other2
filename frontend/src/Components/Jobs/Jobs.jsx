import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Grid, Typography ,Box,Button} from '@mui/material';


const Jobs = () => {

const [jobs,setjobs]=useState([]);


  useEffect(() => {
    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/v1/job/getAllJobs", {
                withCredentials: true,
            });
            setjobs(response.data.jobs || []);
        } catch (error) {
            console.error('Error fetching resources:', error);
        } 
    };

    fetchJobs();
}, []);

return (
 <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        bgcolor: '#f0f0f0',
        padding: '20px',
      }}
    >
      <Typography variant="h4" color="primary" gutterBottom>
            AVAILABLE JOBS
      </Typography>
      <Grid container spacing={2} maxWidth="md">
        {jobs&&jobs.map(job => (
          <Grid item xs={12} key={job._id}>
            <Box
              sx={{
                bgcolor: '#ffffff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ background: '#f0f8ff', padding: '10px', marginBottom: '10px', borderRadius: '8px' ,color:'blue'}}>
                <Typography variant="h5" gutterBottom>
                  {job.Title}
                </Typography>
              </div>
              
              <div style={{ background: '#f0f8ff', padding: '10px', marginBottom: '10px', borderRadius: '8px' ,color:'blue'}}>
                <Typography variant="body1">
                  Location: {job.Location}
                </Typography>
              </div>
              <div style={{ background: '#f0f8ff', padding: '10px', marginBottom: '10px', borderRadius: '8px',color:'blue' }}>
                <Typography variant="body1">
                  Country: {job.Country}
                </Typography>
              </div>
              <div style={{ background: '#f0f8ff', padding: '10px', marginBottom: '10px', borderRadius: '8px' ,color:'blue'}}>
                <Typography variant="body1">
                  Category: {job.Category}
                </Typography>
              </div>

              <div>
              <Button
                variant="contained"
                color="primary"
              
                href={`/job/${job._id}`}
              >
                View Details
              </Button>

              </div>
             
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
);
};


export default Jobs
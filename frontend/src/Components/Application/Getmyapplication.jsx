// ApplicationDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Button,Grid ,Paper } from '@mui/material';
import { toast } from 'react-toastify';

const ApplicationDetails = () => {
    
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/application/jobseekergetapplication`, {
                    withCredentials: true,
                });                setApplications(response.data.applications || null);
            } catch (error) {
                console.error('Error fetching application:', error);
            }
        };

        fetchApplication();
    }, []);

    const handleDeleteApplication = async (applications) => {
      try {
          const data = await axios.delete(`http://localhost:8000/api/v1/application/delete/${applications._id}`, {
              withCredentials: true,
          });
          toast.success(data.message);
      } catch (error) {
          toast.error(error.response.data.message);
      }
  };

  const getStatusColor = (status) => {
    switch (status) {
        case 'Accepted':
            return 'green';
        case 'Rejected':
            return 'red';
        case 'Pending':
            return 'orange';
        default:
            return 'black';
    }
};
    return (
        <Container maxWidth="md">
        {applications.length > 0 && (
          <Typography variant="h4" gutterBottom style={{ color: 'blue', marginTop: '1rem' }}>
            Available Applications
          </Typography>
        )}
  
        <Grid container spacing={2}>
          {applications.length > 0 ? (
            applications.map((application, index) => (
              <Grid item xs={12} sm={6} md={4} key={application._id}>
                <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold', color: 'black' }}>
                      Name:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'blue' }}>
                      {application.name}
                    </Typography>
                  </div>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold', color: 'black' }}>
                      Email:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'blue' }}>
                      {application.email}
                    </Typography>
                  </div>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold', color: 'black' }}>
                      Cover Letter:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'blue' }}>
                      {application.coverLetter}
                    </Typography>
                  </div>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold', color: 'black' }}>
                      Phone:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'blue' }}>
                      {application.phone}
                    </Typography>
                  </div>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold', color: 'black' }}>
                      Address:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'blue' }}>
                      {application.address}
                    </Typography>
                  </div>
                  <div style={{ borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '10px' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold', color: 'black' }}>
                      Resume:
                    </Typography>
                    <Typography variant="body1" style={{ color: 'blue' }}>
                      <a href={application.resume.url} target="_blank" rel="noopener noreferrer">
                        {application.resume.url} Download Resume
                      </a>
                    </Typography>
                  </div>
                  <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                    <Typography variant="body1" style={{ fontWeight: 'bold', color: 'black' }}>
                      Status:
                    </Typography>
                    <Typography
                      variant="body1"
                      style={{ color: getStatusColor(application.status), marginLeft: '5px' }}
                    >
                      {application.status}
                    </Typography>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleDeleteApplication(application)}
                      style={{ marginTop: '10px' }}
                    >
                      Delete Application
                    </Button>
                  </div>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" style={{ marginTop: '1rem', color: 'blue', textAlign: 'center' }}>
              No Applications Available
            </Typography>
          )}
        </Grid>
      </Container>
    );
};

export default ApplicationDetails;

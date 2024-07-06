// ApplicationDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Button,Grid ,Paper } from '@mui/material';
import { toast } from 'react-toastify';

const Employerupdateapplication = () => {
    
    const [applications, setApplications] = useState([]);
    useEffect(() => {
        const fetchApplication = async () => {

             try {
                const response = await axios.get(`http://localhost:8000/api/v1/application/employergetapplication`, {
                    withCredentials: true,
                });        
                
                
                setApplications(response.data.applications || null);
            } catch (error) {
                console.log('Error fetching application:', error);
            }
        };

        fetchApplication();
    }, []);

   const handleStatusUpdate = async (id, newStatus) => {
        try {
            const {data} = await axios.put(`http://localhost:8000/api/v1/application/update/${id}`, 
                { status: newStatus }, 
                {
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
            return 'yellow';
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
                applications.map((applications) => (
                    <Grid item xs={12} sm={6} md={4} key={applications._id}>
                        <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body1">Name: {applications.name}</Typography>
                            <Typography variant="body1">Email: {applications.email}</Typography>
                            <Typography variant="body1">Cover Letter: {applications.coverLetter}</Typography>
                            <Typography variant="body1">Phone: {applications.phone}</Typography>
                            <Typography variant="body1">Address: {applications.address}</Typography>
                            <Typography variant="body1">Resume: <a href={applications.resume.url} target="_blank" rel="noopener noreferrer">{applications.resume.url}  Download Resume</a></Typography>
                           
                            <Typography variant="body1">
                                    Status: <span style={{ color: getStatusColor(applications.status) }}>{applications.status}</span>
                                </Typography>
                                {/* Render buttons only if status is not 'Accepted' or 'Rejected' */}
                                {applications.status !== 'Accepted' && applications.status !== 'Rejected' && (
                                    <>
                                        <Button onClick={() => handleStatusUpdate(applications._id, 'Accepted')} variant="contained" color="primary" style={{ marginTop: 'auto' }}>
                                            Accept
                                        </Button>
                                        <Button onClick={() => handleStatusUpdate(applications._id, 'Rejected')} variant="contained" color="secondary" style={{ marginTop: '0.5rem' }}>
                                            Reject
                                        </Button>
                                    </>
                                )}
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

export default Employerupdateapplication;

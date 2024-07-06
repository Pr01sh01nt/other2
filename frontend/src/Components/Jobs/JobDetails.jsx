import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';

const JobDetails = () => {
    const { id } = useParams();
    const [job, setJob] = useState({});

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/v1/job/jobdetails/${id}`, {
                    withCredentials: true,
                });
                setJob(response.data.job || {});
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchJob();
    }, [id]);

    const renderSalary = () => {
        if (job.FixedSalary) {
            return <Typography variant="body1">Salary: {job.FixedSalary}</Typography>;
        } else {
            return (
                <Typography variant="body1">
                    Salary: {job.SalaryFrom} - {job.Salaryto}
                </Typography>
            );
        }
    };

    const handleApplyNow = () => {
        // Example of navigating to a dynamic link based on job details
        window.open(`/application/post/${job._id}`, '_blank'); // Opens link in new tab
    };
    
    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4, p: 3, border: '1px solid #ddd', borderRadius: 8, bgcolor: '#f5f5f5' }}>
                <Typography variant="h4" gutterBottom style={{color:'blue'}}>
                    Job Details
                </Typography>
                <Box sx={{ mb: 2 }}>
                    <Typography variant="h5" gutterBottom>
                       Title: {job.Title}
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 2 }}>
                        Description:{job.Description}
                    </Typography>
                    <Typography variant="body1">
                        Location: {job.Location}
                    </Typography>
                    <Typography variant="body1">
                        Country: {job.Country}
                    </Typography>
                    <Typography variant="body1">
                        Category: {job.Category}
                    </Typography>
                    {renderSalary()}
                    {/* Add more job details as needed */}
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleApplyNow}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Apply Now
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default JobDetails;
//Title,Description, Location,Country,Category,jobpostedby, FixedSalary,
   //     SalaryFrom, Salaryto
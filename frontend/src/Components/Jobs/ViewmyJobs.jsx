import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button,Grid ,Paper,Divider,TextField} from '@mui/material';
import { toast } from 'react-toastify';
const Viewmyjobs = () => {
    const [jobs, setJobs] = useState([]);

    const [editEnabled,setEditEnabled]=useState({});

    const [Title, setTitle] = useState('');
    const [Description, setDescription] = useState('');
    const [Location, setLocation] = useState('');
    const [Country, setCountry] = useState('');
    const [Category, setCategory] = useState(''); 
    const [FixedSalary, setFixedSalary] = useState('');
    const [SalaryFrom, setSalaryFrom] = useState('');
    const [Salaryto, setSalaryto] = useState('');
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/v1/job/getmyjobs", {
                    withCredentials: true,
                });
                setJobs(response.data.jobs || []);

               
            } catch (error) {
                console.error('Error fetching resources:', error);
            }
        };

        fetchJobs();
    }, []);


    const handleupdate=async(jobs)=>{

        try {

            setCategory(jobs.Category);
            setCountry(jobs.Country);
            setDescription(jobs.Description);
            setFixedSalary(jobs.FixedSalary);
            setSalaryto(jobs.Salaryto);
            setTitle(jobs.Title);
            setSalaryFrom(jobs.SalaryFrom);
            setLocation(jobs.Location);

            const response= await axios.put(`http://localhost:8000/api/v1/job/update/${jobs._id}`,

                {
                  Title,Description,Category,Location,Country,FixedSalary,SalaryFrom,Salaryto
                },
                 {
                withCredentials: true,
            });

            setEditEnabled((prevEditEnabled) => ({
                ...prevEditEnabled,
                [jobs._id]: !prevEditEnabled[jobs._id],
              }));

              setCategory('');
              setCountry(' ');
              setDescription(' ');
              setFixedSalary('');
              setSalaryto('');
              setTitle('');
              setSalaryFrom('');
              setLocation('');
    
            toast.success(response.data.message);
          
        } catch (error) {
            console.error('Error Updating job:', error);
        }


    }


  const handleChange = (event, job, field) => {
    
    const updatedJobs = jobs.map((j) => {
      if (j._id === job._id) {
        return { ...j, [field]: event.target.value };
      }
      return j;
    });
    setJobs(updatedJobs);
  };
    const handleDelete = async (jobs) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/v1/job/delete/${jobs._id}`,
                 {
                withCredentials: true,
            });
            toast.success(response.data.message);
          
        } catch (error) {
            console.error('Error deleting job:', error);
        }
    };

    const renderSalary = (jobs) => {
        if (jobs.FixedSalary) {
            return <Typography variant="body1"  style={{color:"blue"}}>Salary: {jobs.FixedSalary}</Typography>;
        } else {
            return (
                <Typography variant="body1" >
                    Salary: {jobs.SalaryFrom} - {jobs.Salaryto}
                </Typography>
            );
        }
    };

    return (
        <Container maxWidth="md">
        {jobs.length > 0 && (
          <Typography variant="h4" gutterBottom style={{ color: 'blue', marginTop: '1rem' }}>
            Available Jobs
          </Typography>
        )}
  
        <Grid container spacing={2}>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job._id}>
                <Paper elevation={3} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div>
                    <div style={{ marginBottom: '1rem' }}>
                      <Typography variant="h5" style={{ color: 'blue' }} gutterBottom>
                        Title
                      </Typography>
                      {editEnabled[job._id] ? (
                        <TextField
                          fullWidth
                          value={job.Title}
                          onChange={(e) => handleChange(e, job, 'Title')}
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <Typography variant="body1">{job.Title}</Typography>
                      )}
                    </div>
                    <Divider style={{ marginBottom: '1rem' }} />
                    <div style={{ marginBottom: '1rem' }}>
                      <Typography variant="h5" style={{ color: 'green' }} gutterBottom>
                        Description
                      </Typography>
                      <TextField
                        fullWidth
                        value={job.Description}
                        onChange={(e) => handleChange(e, job, 'Description')}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    <Divider style={{ marginBottom: '1rem' }} />
                    <div style={{ marginBottom: '1rem' }}>
                      <Typography variant="h5" style={{ color: 'purple' }} gutterBottom>
                        Category
                      </Typography>
                      <TextField
                        fullWidth
                        value={job.Category}
                        onChange={(e) => handleChange(e, job, 'Category')}
                     
                      />
                    </div>
                    <Divider style={{ marginBottom: '1rem' }} />
                    <div style={{ marginBottom: '1rem' }}>
                      <Typography variant="h5" style={{ color: 'orange' }} gutterBottom>
                        Location
                      </Typography>
                      <TextField
                        fullWidth
                        value={job.Location}
                        onChange={(e) => handleChange(e, job, 'Location')}
                      
                      />
                    </div>
                    <Divider style={{ marginBottom: '1rem' }} />
                    <div style={{ marginBottom: '1rem' }}>
                      <Typography variant="h5" style={{ color: 'brown' }} gutterBottom>
                        Country
                      </Typography>
                      <TextField
                        fullWidth
                        value={job.Country}
                        onChange={(e) => handleChange(e, job, 'Country')}
                       
                      />
                    </div>
                    <Divider style={{ marginBottom: '1rem' }} />
                    <div style={{ marginBottom: '1rem' }}>
                      <Typography variant="h5" style={{ color: 'red' }} gutterBottom>
                        Salary
                      </Typography>
                      {editEnabled[job._id] ? (
                        job.FixedSalary ? (
                          <TextField
                            fullWidth
                            value={job.FixedSalary}
                            onChange={(e) => handleChange(e, job, 'FixedSalary')}
                          
                          />
                        ) : (
                          <>
                            <TextField
                              fullWidth
                              value={job.SalaryFrom}
                              onChange={(e) => handleChange(e, job, 'SalaryFrom')}
                             
                            />
                            <TextField
                              fullWidth
                              value={job.Salaryto}
                              onChange={(e) => handleChange(e, job, 'Salaryto')}
                            
                            />
                          </>
                        )
                      ) : job.FixedSalary ? (
                        <Typography variant="body1">Salary: {job.FixedSalary}</Typography>
                      ) : (
                        <Typography variant="body1">
                          Salary: {job.SalaryFrom} - {job.Salaryto}
                        </Typography>
                      )}
                    </div>
                    <Divider style={{ marginBottom: '1rem' }} />
                    {renderSalary(job)}
                  </div>
                  <div style={{ marginTop: 'auto', textAlign: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => handleDelete(job)}>
                      Delete
                    </Button>
                    <Button variant="outlined" color="primary" style={{ marginLeft: '1rem' }} onClick={() => handleupdate(job)}>
                      {editEnabled[job._id] ? 'Save' : 'Edit'}
                    </Button>
                  </div>
                </Paper>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" style={{ marginTop: '1rem' }}>
              No jobs available
            </Typography>
          )}
        </Grid>
      </Container>
    );
};

export default Viewmyjobs;

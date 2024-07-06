import React, { useState } from 'react';
import { TextField, Grid, Select, MenuItem, FormControl, InputLabel, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

// Enum for Country names
const CountryEnum = {
  INDIA: 'India',
  USA: 'United States',
  UK: 'United Kingdom',
  CANADA: 'Canada',
  AUSTRALIA: 'Australia',
};

// Enum for Job Categories
const CategoryEnum = {
  SOFTWARE_ENGINEER: 'Software Engineer',
  WEB_DEVELOPER: 'Web Developer',
  DATA_SCIENTIST: 'Data Scientist',
  UX_UI_DESIGNER: 'UX/UI Designer',
  SYSTEM_ADMINISTRATOR: 'System Administrator',
};

const PostJobForm = () => {
  const [Title, setTitle] = useState('');
  const [Description, setDescription] = useState('');
  const [Location, setLocation] = useState('');
  const [Country, setCountry] = useState('India');
  const [Category, setCategory] = useState('Software Engineer'); 
  const [FixedSalary, setFixedSalary] = useState('');
  const [SalaryFrom, setSalaryFrom] = useState('');
  const [Salaryto, setSalaryto] = useState('');
  const [formData, setFormData] = useState({
    isFixedSalary: true,
  });

  const NavigateTo = useNavigate();

  const handleSalaryTypeChange = (e) => {
    const isFixedSalary = e.target.value === 'fixed';
    setFormData({ ...formData, isFixedSalary, fixedSalary: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/job/postjob",
        { Title, Description, Location, Country, Category, FixedSalary, SalaryFrom, Salaryto },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);

      setTitle('');
      setDescription('');
      setLocation('');
      setCountry('India');
      setCategory('Software Engineer'); 
      setFixedSalary('');
      setSalaryFrom('');
      setSalaryto('');

      NavigateTo('/job/jobs');

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Box
    sx={{
      display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0', // Outer box background color
        padding: '20px',
    }}
    >
      <Typography variant="h5" color="primary" gutterBottom>
        POST JOB
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: '100%',
          maxWidth: '800px', // Increased max width for the form
          backgroundColor: '#ffffff', // Form box background color
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          mt: '10px',
          mb: '20px', // Added margin bottom for spacing
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Title"
              name="Title"
              value={Title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Description"
              name="Description"
              value={Description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Location"
              name="Location"
              value={Location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Country</InputLabel>
              <Select
                value={Country}
                onChange={(e) => setCountry(e.target.value)}
                name="Country"
              >
                {Object.values(CountryEnum).map((country) => (
                  <MenuItem key={country} value={country}>{country}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Job Category</InputLabel>
              <Select
                value={Category}
                onChange={(e) => setCategory(e.target.value)}
                name="Category"
              >
                {Object.values(CategoryEnum).map((category) => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Salary Type</InputLabel>
              <Select
                value={formData.isFixedSalary ? 'fixed' : 'range'}
                onChange={handleSalaryTypeChange}
                name="Salary Type"
              >
                <MenuItem value="fixed">Fixed Salary</MenuItem>
                <MenuItem value="range">Salary Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {formData.isFixedSalary ? (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Fixed Salary"
                name="FixedSalary"
                value={FixedSalary}
                onChange={(e) => setFixedSalary(e.target.value)}
              />
            </Grid>
          ) : (
            <>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Salary From"
                  name="SalaryFrom"
                  value={SalaryFrom}
                  onChange={(e) => setSalaryFrom(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Salary To"
                  name="SalaryTo"
                  value={Salaryto}
                  onChange={(e) => setSalaryto(e.target.value)}
                />
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Post Job
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PostJobForm;

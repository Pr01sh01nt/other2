// ResumeForm.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, InputLabel, FormControl  } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

import axios  from 'axios';

const PostApplication = () => {
 
const {id}=useParams();

  const[email,setemail]=useState('');
  const[ coverLetter,setcoverLetter]=useState('');
  const[ phone,setphone]=useState('');
  const[address,setaddress]=useState('');
  const[resume,setresume]=useState(null);

  const [name,setname]=useState('');


  const navigateTo = useNavigate();

  const handleResumeChange = (e) => {
     const resume = e.target.files[0];
     setresume(resume);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);
    try{

    
   const{data}=await axios.post("http://localhost:8000/api/v1/application/postapplication",

    formData,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
   )

  setemail('');
  setcoverLetter('');
  setphone('');
  setaddress('');
  setresume(null);
  setname('');
   toast.success(data.message);
   
  navigateTo("/job/jobs");

    }
    catch(error)
    {
      toast.error(error.response.data.message);
    }
  };


  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 8,
          bgcolor: '#f5f5f5',
          boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)', // Optional box shadow
        }}
      >
        <Typography variant="h4" gutterBottom style={{color:'blue'}}>
          Submit Your Application
        </Typography>
        <form onSubmit={handleSubmit}>

        <TextField
            fullWidth
            label="Name"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            margin="normal"
            required
          />
        
         
          <TextField
            fullWidth
            label="Cover Letter"
            name="coverLetter"
            multiline
            rows={4}
            value={coverLetter}
            onChange={(e) => setcoverLetter(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Address"
            name="address"
            multiline
            rows={2}
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            margin="normal"
            required
          />
          <input
            type="file"
            accept=".pdf, .jpg, .png"
            onChange={handleResumeChange}
            style={{ margin: '20px 0' }}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default PostApplication;

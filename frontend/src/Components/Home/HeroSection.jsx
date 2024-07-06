import React from "react";
import { Grid, Typography, Container, Paper } from "@mui/material";
import { FaBuilding, FaSuitcase, FaUsers, FaUserPlus } from "react-icons/fa";

const HeroSection = () => {
  const details = [
    {
      id: 1,
      title: "1,23,441",
      subTitle: "Live Job",
      icon: <FaSuitcase />,
    },
    {
      id: 2,
      title: "91220",
      subTitle: "Companies",
      icon: <FaBuilding />,
    },
    {
      id: 3,
      title: "2,34,200",
      subTitle: "Job Seekers",
      icon: <FaUsers />,
    },
    {
      id: 4,
      title: "1,03,761",
      subTitle: "Employers",
      icon: <FaUserPlus />,
    },
  ];

  return (
    <Container>
      <Grid container spacing={4} sx={{ py: 4 }}>
        {/* Left Section: Title and Description */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            Find a job that suits
          </Typography>
          <Typography variant="h3" gutterBottom>
            your interests and skills
          </Typography>
          <Typography variant="body1">
          Job matching websites are indispensable in today's job market, connecting job seekers
          with relevant opportunities and streamlining the recruitment process for employers.
          As noted by Mark Smith, CEO of a leading recruitment firm, 
         "These platforms revolutionize how individuals find jobs and businesses 
          recruit talent, offering a centralized hub where skills meet opportunities."
          </Typography>
        </Grid>

        {/* Right Section: Image */}
        <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
          <img src="/heroS.jpg" alt="hero" style={{ maxWidth: '100%', height: 'auto' }} />
        </Grid>

        {/* Details Section */}
        <Grid item xs={12}>
          <Grid container spacing={4}>
            {details.map((element) => (
              <Grid item xs={12} sm={6} md={3} key={element.id}>
                <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>
                    {element.icon}
                  </div>
                  <Typography variant="h4" gutterBottom>
                    {element.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {element.subTitle}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeroSection;

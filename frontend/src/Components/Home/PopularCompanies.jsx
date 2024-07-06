import React from "react";
import { Grid, Typography, Container, Button, Paper } from "@mui/material";
import { FaMicrosoft, FaApple } from "react-icons/fa";
import { SiTesla } from "react-icons/si";

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Bengaluru, India",
      openPositions: 10,
      icon: <FaMicrosoft />,
    },
    {
      id: 2,
      title: "Tesla",
      location: "Delhi  Street-10,India",
      openPositions: 5,
      icon: <SiTesla />,
    },
    {
      id: 3,
      title: "Apple",
      location: "Wagholi,Pune,Maharashtra,India",
      openPositions: 20,
      icon: <FaApple />,
    },
  ];

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        TOP COMPANIES
      </Typography>
      <Grid container spacing={3}>
        {companies.map((element) => (
          <Grid item xs={12} md={4} key={element.id}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {element.icon}
              </div>
              <Typography variant="h5" gutterBottom>
                {element.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {element.location}
              </Typography>
              <Button variant="contained" color="primary">
                Open Positions {element.openPositions}
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PopularCompanies;

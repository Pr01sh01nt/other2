import React from "react";
import { Grid, Typography, Container, Paper } from "@mui/material";
import {
  MdOutlineDesignServices,
  MdOutlineWebhook,
  MdAccountBalance,
  MdOutlineAnimation,
} from "react-icons/md";
import { TbAppsFilled } from "react-icons/tb";
import { FaReact } from "react-icons/fa";
import { GiArtificialIntelligence } from "react-icons/gi";
import { IoGameController } from "react-icons/io5";

const PopularCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Graphics & Design",
      subTitle: "305 Open Positions",
      icon: <MdOutlineDesignServices />,
      link: "/job/jobs",
    },
    {
      id: 2,
      title: "Mobile App Development",
      subTitle: "500 Open Positions",
      icon: <TbAppsFilled />,
      link: "/job/jobs",
    },
    {
      id: 3,
      title: "Frontend Web Development",
      subTitle: "200 Open Positions",
      icon: <MdOutlineWebhook />,
      link: "/job/jobs",
    },
    {
      id: 4,
      title: "MERN STACK Development",
      subTitle: "1000+ Open Positions",
      icon: <FaReact />,
      link: "/job/jobs",
    },
    {
      id: 5,
      title: "Account & Finance",
      subTitle: "150 Open Positions",
      icon: <MdAccountBalance />,
      link: "/job/jobs",
    },
    {
      id: 6,
      title: "Artificial Intelligence",
      subTitle: "867 Open Positions",
      icon: <GiArtificialIntelligence />,
      link: "/job/jobs",
    },
    {
      id: 7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation />,
      link: "/job/jobs",
    },
    {
      id: 8,
      title: "Game Development",
      subTitle: "80 Open Positions",
      icon: <IoGameController />,
      link: "/job/jobs",
    },
  ];

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        POPULAR CATEGORIES
      </Typography>
      <Grid container spacing={3}>
        {categories.map((element) => (
          <Grid item xs={12} sm={6} md={3} key={element.id}>
            <Paper elevation={3} sx={{ p: 2, textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                {element.icon}
              </div>
              <Typography variant="h5" gutterBottom>
                <a href={element.link} style={{ textDecoration: 'none', color: 'inherit' }}>{element.title}</a>
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {element.subTitle}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default PopularCategories;


// NotFound.js

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Typography, Container, Link, Grid, Button } from '@mui/material';

const NotFound = () => {
  return (
    <Container>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" gutterBottom>
            Oops! Page not found.
          </Typography>
          <Typography variant="body1" gutterBottom>
            The page you are looking for might have been removed,
            had its name changed or is temporarily unavailable.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            color="primary"
            size="large"
            sx={{ marginTop: '1rem' }}
          >
            Go to Home
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NotFound;

import React from 'react';
import { Grid, Link, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const footerStyles = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '16px',
  marginTop: '20px', // Adjust as needed
  textAlign: 'center',
};

const socialIconStyles = {
  color: '#fff',
  margin: '0 8px', // Adjust as needed
  fontSize: '24px', // Adjust icon size as needed
};

const Footer = () => {
  return (
    <footer style={footerStyles}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="body2">
            © 2024 JOBJEE. All rights reserved.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link href="https://www.instagram.com/yourinstagram" target="_blank" rel="noopener noreferrer" style={socialIconStyles}>
            <InstagramIcon />
          </Link>
          <Link href="https://www.linkedin.com/company/yourlinkedin" target="_blank" rel="noopener noreferrer" style={socialIconStyles}>
            <LinkedInIcon />
          </Link>
        </Grid>
      </Grid>
    </footer>
  );
};

export default Footer;

import React from 'react';
import { Typography, Slide, useScrollTrigger, useTheme } from '@mui/material';

const Footer = () => {
  const trigger = useScrollTrigger();
  const theme = useTheme();

  return (
    <Slide direction="up" in={trigger}>
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          background: theme.palette.primary.main,
          color: '#fff',
          textAlign: 'center',
          padding: '10px 0',
          
        }}
      >
        <Typography variant="body2">
          Made with <span style={{ color: 'red' }}>❤</span> by Hritik Kesharwani
        </Typography>
      </div>
    </Slide>
  );
};

export default Footer;

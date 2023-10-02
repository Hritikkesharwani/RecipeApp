import { Box, Typography, Slide, useTheme, TextField, Button, IconButton, Fab } from '@mui/material';
import React from 'react';
import { HeaderContent } from './styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import SearchIcon from '@mui/icons-material/Search';

const Header = () => {
    const theme = useTheme();
  const trigger = useScrollTrigger({ disableHysteresis: true });

  return (
    <HeaderContent>
      <Box sx={{display:'flex', flexDirection: 'column',alignItems:'center'}}>
        <Slide direction="left" in={!trigger}>
          <Typography sx={{color : theme.palette.primary.light,marginTop:'6rem', textAlign:'center'}} variant="h2">Welcome to Your Recipe App</Typography>
        </Slide>
        <Slide direction="right" in={!trigger}>
          <Typography sx={{color : theme.palette.primary.light,marginTop:'1rem', textAlign:'center'}} variant="h6">Discover and Create Delicious Recipes</Typography>
        </Slide>
        <Slide direction="up" in={!trigger}>
            <Box display="flex" alignItems="center" sx={{marginTop:'1rem',width:'25%'}}>
              <TextField
                variant="outlined"
                placeholder={"Search for recipes"}
                sx={{backgroundColor : theme.palette.primary.main,
                borderRadius:'25px',
                width:'100%',
                marginRight:'8px',
                '& fieldset': {
                    borderRadius: '25px',
                  },
                }}
                InputProps={{
                    style: {
                      height:40
                    },
                  }}
              />
              <Fab size="medium" color="primary" sx={{height:40}} >
                <SearchIcon/>
              </Fab>
            </Box>
          </Slide>
      </Box>
    </HeaderContent>
  );
};

export default Header;

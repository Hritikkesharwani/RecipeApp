import { Box, Typography, Slide, useTheme, TextField, Button, IconButton, Fab, Snackbar, Alert } from '@mui/material';
import React, {useState} from 'react';
import { HeaderContent } from './styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import SearchIcon from '@mui/icons-material/Search';
import axios from '../../api/axios';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const theme = useTheme();
  const trigger = useScrollTrigger({ disableHysteresis: true });
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [err,setErr] = useState(false);

  const handleChangeText = (e) => {
    setText(e.target.value);
  }

  const handleSearch = async() => {
    try {
      let data = await axios.get(`search.php?s=${text}`)
      const { data:mealData = {} } = data || {};
      const {meals = []} = mealData || {};
      if(!meals?.length > 0) {
        setErr(true);
        return
      }
      const {strCategory = ""} = meals[0];
      navigate(`/meal/category/${strCategory}`);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErr(false);
  };

  return (
    <HeaderContent>
      <Box sx={{display:'flex', flexDirection: 'column',alignItems:'center'}}>
        <Slide direction="left" in={!trigger}>
          <Typography sx={{color : theme.palette.primary.light ,marginTop:'6rem', textAlign:'center'}} variant="h2">Welcome to Your Recipe App</Typography>
        </Slide>
        <Slide direction="right" in={!trigger}>
          <Typography sx={{color : theme.palette.primary.light ,marginTop:'1rem', textAlign:'center'}} variant="h6">Discover and Create Delicious Recipes</Typography>
        </Slide>
        <Slide direction="up" in={!trigger}>
            <Box display="flex" alignItems="center" sx={{marginTop:'1rem',width:'25%'}}>
              <TextField
                variant="outlined"
                placeholder={"Search for recipes"}
                sx={{backgroundColor : theme.palette.secondary.main,
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
                onChange={(e) => handleChangeText(e)}
              />
              <Fab size="medium" color="primary" sx={{height:40}} >
                <SearchIcon onClick={() => handleSearch()}/>
              </Fab>
            </Box>
          </Slide>
          <Snackbar open={err} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          No Recipe Found
        </Alert>
      </Snackbar>
      </Box>
    </HeaderContent>
  );
};

export default Header;

import { Box, Breadcrumbs, Container, Grid, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import React, { useEffect, useState, use } from 'react';
import axios from '../../api/axios';
import { FILTER_ITEM } from '../../contants';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MealListings = ({}) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const {state} = useLocation();
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const parts = pathname.split('/');
  const category = parts[parts.length - 1];
  console.log(state)
  const { strCategoryDescription = '', strCategory = ''} = state || {}

  const getMealData = async () => {
    try {
      const response = await axios.get(`filter.php?c=${category}`);
      const { status = null, data = {}, err = null } = response;
      const { meals = [] } = data || {};
      setData(meals);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getMealData();
  }, []);

  const handleMealCardClick = (item) => {
    navigate(`/meal/${item.idMeal}`,{ state: { ...item } });
    window.scrollTo(0, 0);
  }

  return (
    <Container sx={{ marginTop: '32px' }}>
        <Box sx={{marginBottom: '32px' }}>
    <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          to={''}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography>
      </Breadcrumbs>  
      </Box> 
    <Box sx={{border: `2px solid ${theme.palette.primary.main}`, padding:'16px'}}>
    <Typography sx={{ fontSize: 16, fontWeight: 400}}>
      {strCategoryDescription}
      </Typography>  
    </Box>
      <Typography sx={{ fontSize: 36, fontWeight: 700, marginTop:'32px', borderBottom: `5px solid ${theme.palette.primary.main}`, width: '100px' }}>
        {strCategory}
      </Typography>
      <Grid container items sx={{ marginTop: '32px' }} spacing={4}>
        {data.map((item) => {
          const { strMeal = '', strMealThumb = '' } = item || {};

          return (
              <Grid xs={3} item>
                <Card
                onClick={() => handleMealCardClick(item)}
                  sx={{
                    maxWidth: 345,
                    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)', // Default box shadow
                    transition: 'box-shadow 0.3s ease', // Add a transition for a smooth effect
                    '&:hover': {
                      boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.3)', // Apply box shadow on hover
                    },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="180"
                      image={strMealThumb}
                      alt="meal img"
                      sx={{
                        transition: 'transform 0.3s ease', // Add a transition for a smooth zoom effect
                        '&:hover': {
                          transform: 'scale(1.05)', // Zoom out the image on hover
                        },
                      }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {strMeal}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default MealListings;

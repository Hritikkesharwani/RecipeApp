import { Box, Breadcrumbs, Container, Grid, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import FastfoodIcon from '@mui/icons-material/Fastfood';
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
  const { strCategoryDescription = '', strCategory = '', data:mealData = []} = state || {}

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
    // window.scrollTo(400, 0);
  }

  return (
    <Container sx={{ marginTop: '32px',marginBottom:10 }}>
        <Box sx={{marginBottom: '32px' }}>
    <Breadcrumbs separator={<Typography sx={{color : theme.palette.tertiary.main, fontWeight:700}}> {`>`} </Typography>} aria-label="breadcrumb">
        <Link
          style={{ display: 'flex', alignItems: 'center', textDecoration:'none',fontSize:18, fontWeight:700, color : theme.palette.tertiary.main }}
          to={'/'}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
          Home
        </Link>
        <Typography
          style={{ display: 'flex', alignItems: 'center', textDecoration:'none',fontSize:18, fontWeight:700, color : theme.palette.tertiary.main }}
          color="text.primary"
        >
          <FastfoodIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
          Meals
        </Typography>
      </Breadcrumbs>  
      </Box> 
    {strCategoryDescription && <Box sx={{border: `2px solid ${theme.palette.primary.main}`, padding:'16px'}}>
    <Typography sx={{ color : theme.palette.tertiary.main, fontSize: 16, fontWeight: 400}}>
      {strCategoryDescription}
      </Typography>  
    </Box>}
      <Typography sx={{ color : theme.palette.tertiary.main,fontSize: 36, fontWeight: 700, marginTop:'32px', borderBottom: `5px solid ${theme.palette.primary.main}`, width: '100px' }}>
        {category}
      </Typography>
      <Grid container items sx={{ marginTop: '32px' }} spacing={4}>
        {data.map((item) => {
          const { strMeal = '', strMealThumb = '' } = item || {};

          return (
              <Grid xs={12} sm={6} md={4} lg={3} item sx={{display:'flex', justifyContent:'center'}} item>
                <Card
                onClick={() => handleMealCardClick(item)}
                  sx={{
                    maxWidth: 345,
                    width:300,
                    boxShadow: `0px 4px 6px ${theme.palette.shadow.main}`, 
                    transition: 'box-shadow 0.3s ease', 
                    '&:hover': {
                      boxShadow: `0px 8px 12px ${theme.palette.shadow.main}`, 
                    },
                    backgroundColor: theme.palette.secondary.main,
                    borderRadius:4
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="180"
                      image={strMealThumb}
                      alt="meal img"
                      loading='lazy'
                      sx={{
                        transition: 'transform 0.3s ease', // Add a transition for a smooth zoom effect
                        '&:hover': {
                          transform: 'scale(1.05)', // Zoom out the image on hover
                        },
                      }}
                    />
                    <CardContent sx={{height:60}}>
                      <Typography sx={{color:theme.palette.primary.main, fontWeight: 700}} gutterBottom variant="h5" component="div">
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

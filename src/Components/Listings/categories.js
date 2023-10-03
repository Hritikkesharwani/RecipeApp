import { Box, Container, Grid, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { FILTER_ITEM } from '../../contants';
import { Link, useNavigate } from 'react-router-dom';
import SurpriseMe from '../SurpriseMe';

const CategoryListings = ({}) => {
  const theme = useTheme();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getListingData = async () => {
    try {
      const response = await axios.get(`categories.php`);
      const { status = null, data = {}, err = null } = response;
      const { categories = [] } = data || {};
      setData(categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getListingData();
  }, []);

  const handleCardClick = (item) => {
    navigate(`/meal/category/${item.strCategory}`,{ state: { ...item } });
    window.scrollTo(400, 0);
  }

  return (
    <Container sx={{ marginTop: '32px',marginBottom:10 }}>
      <SurpriseMe />
      <Typography sx={{ color : theme.palette.tertiary.main, fontSize: 36, fontWeight: 700, borderBottom: `5px solid ${theme.palette.primary.main}`, width: '100px' }}>
        Categories
      </Typography>
      <Grid container items sx={{ marginTop: '32px' }} justifyContent={'center'} spacing={4}>
        {data.map((item) => {
          const { strCategory = '', strCategoryThumb = '', strCategoryDescription = '' } = item || {};
          return (
              <Grid xs={12} sm={6} md={4} lg={3} item sx={{display:'flex', justifyContent:'center'}} >
                <Card
                onClick={() => handleCardClick(item)}
                  sx={{
                    maxWidth: 345,
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
                      image={strCategoryThumb}
                      loading='lazy'
                      alt="meal img"
                      sx={{
                        transition: 'transform 0.3s ease', // Add a transition for a smooth zoom effect
                        '&:hover': {
                          transform: 'scale(1.05)', // Zoom out the image on hover
                        },
                      }}
                    />
                    <CardContent sx={{height:120}}>
                      <Typography sx={{color:theme.palette.primary.main, fontWeight: 700}} gutterBottom variant="h5" component="div">
                        {strCategory}
                      </Typography>
                      {strCategoryDescription && (
                        <Typography
                          variant="body2"
                          sx={{
                            color : theme.palette.tertiary.main,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 4, // Limit to 5 lines
                            WebkitBoxOrient: 'vertical',
                            whiteSpace: 'normal', // Use 'normal' to allow wrapping within the box
                          }}
                        >
                          {strCategoryDescription}
                        </Typography>
                      )}
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

export default CategoryListings;

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
    navigate(`/meal/category/${item.strCategory}`, {item});
  }

  return (
    <Container sx={{ marginTop: '32px' }}>
      <Typography sx={{ fontSize: 36, fontWeight: 700, borderBottom: `5px solid ${theme.palette.primary.main}`, width: '100px' }}>
        Categories
      </Typography>
      <Grid container items sx={{ marginTop: '32px' }} spacing={4}>
        {data.map((item) => {
          const { strCategory = '', strCategoryThumb = '', strCategoryDescription = '' } = item || {};
          return (
              <Grid xs={3} item>
                <Card
                onClick={() => handleCardClick(item)}
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
                      image={strCategoryThumb}
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
                        {strCategory}
                      </Typography>
                      {strCategoryDescription && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
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
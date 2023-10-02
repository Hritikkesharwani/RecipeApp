import { useTheme } from '@emotion/react';
import { Container, Typography } from '@mui/material';
import react from 'react';
import { useLocation } from 'react-router-dom';

const RecipeDetails = () => {
   const theme = useTheme();
   const {state} = useLocation();
   console.log('@@@@@',state)
    return (<Container>
    <Typography sx={{ fontSize: 36, fontWeight: 700, marginTop:'32px', borderBottom: `5px solid ${theme.palette.primary.main}`, width: '100px' }}>
    Recipe
  </Typography>
  </Container>)
}
export default RecipeDetails;
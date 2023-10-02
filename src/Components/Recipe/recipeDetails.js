import { useTheme } from '@emotion/react';
import { Box, Breadcrumbs, Container, Grid, Typography } from '@mui/material';
import react, { useEffect, useState } from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import HomeIcon from '@mui/icons-material/Home';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import axios from '../../api/axios';
import { Link, useLocation } from 'react-router-dom';

const RecipeDetails = () => {
   const [recipeData, setRecipeData] = useState({});
   const [ingredients, setIngredient] = useState([]);
   const [measure, setMeasure] = useState([])
   const theme = useTheme();
   const {state} = useLocation();
   const { idMeal = '', isRandom} = state || {};

   const getRecipeDetails = async (idMeal) => {
    try {
        const response = await axios.get(`lookup.php?i=${idMeal}`);
        const { status = null, data = {}, err = null } = response;
        const { meals = [] } = data || {};
        let ingredientsArr = [], measuresArr = []
        if(meals && meals?.length > 0){
            for(let props in meals[0]){
              if(props.includes('strIngredient')){
                if(meals[0][props]) ingredientsArr.push(meals[0][props]);
              }
        
              if(props.includes('strMeasure')){
                if(meals[0][props]){
                  if(meals[0][props].length > 1){
                    measuresArr.push(meals[0][props]);
                  }
                }
              }
            }
        }
        setIngredient(ingredientsArr);
        setMeasure(measuresArr);

        setRecipeData(meals[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
   }

   useEffect(() => {
    if(!idMeal) return;
    getRecipeDetails(idMeal)
   },[idMeal])

   if(!Object.keys(recipeData)?.length > 0) return (<></>)
   

   const { strMeal = '', strYoutube = '', strInstructions = '', strArea = '', strCategory = '', strMealThumb = '', strTags = '', strSource = ''} = recipeData || {}

    return (
      <Container sx={{marginTop: '32px',marginBottom:10}}>
      <Box sx={{marginBottom: '32px' }}>
       <Breadcrumbs aria-label="breadcrumb">
        <Link
          style={{ display: 'flex', alignItems: 'center', textDecoration:'none' }}
          color="inherit"
          to={'/'}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
          Home
        </Link>
       {!isRandom && <Link
          style={{ display: 'flex', alignItems: 'center', textDecoration:'none' }}
          color="inherit"
          to={`/meal/category/${strCategory}`}
        >
          <FastfoodIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
          Meals
        </Link>}
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <FastfoodIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
          Recipe
        </Typography>
      </Breadcrumbs>  
      </Box> 
        <Typography
          sx={{
            fontSize: 36,
            fontWeight: 700,
            marginTop: "32px",
            borderBottom: `5px solid ${theme.palette.primary.main}`,
            width: "100px",
          }}
        >
          Recipe
        </Typography>
        <Grid sx={{ padding: "32px" }} container items spacing={6}>
          <Grid item xs={6}>
            <Box sx={{}}>
              <img src={strMealThumb} alt="" height={"100%"} width={"100%"} />
            </Box>
          </Grid>
          <Grid item container xs={6} flexDirection={"column"}>
            <Typography
              sx={{
                fontSize: 32,
                fontWeight: 700,
                borderBottom: `4px solid ${theme.palette.primary.main}`,
              }}
            >
              {strMeal}
            </Typography>
            <Typography sx={{ marginTop: 3, fontWeight: 700, fontSize:20 }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:20 }}
              >
                CATEGORY -{" "}
              </span>
              {strCategory}
            </Typography>
            <Typography sx={{ marginTop: 2, fontWeight: 700, fontSize:16 }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:16 }}
              >
                Origin -{" "}
              </span>
              {strArea}
            </Typography>
            <Typography sx={{ marginTop: 2, fontWeight: 700, fontSize:16 }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:16 }}
              >
                Video -{" "} 
              </span>
              <a href={strYoutube} style={{textDecoration:'none', color:theme.palette.primary.main}}>{strYoutube}</a>
            </Typography>
            <Typography sx={{ marginTop: 2, fontWeight: 700, fontSize:16 }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:16 }}
              >
                Source -{" "} 
              </span>
              <a href={strSource} style={{textDecoration:'none', color:theme.palette.primary.main}}>{strSource}</a>
            </Typography>
            <Typography sx={{ marginTop: 2, fontWeight: 700, fontSize:16 }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:16 }}
              >
                Tags -{" "} 
              </span>
              {strTags}
            </Typography>
          </Grid>
        </Grid>
        <Container mt={2} sx={{padding:'0px 36px !important'}}>
         <Typography sx={{fontSize:20,fontWeight:500}}>Ingredient and Measures : </Typography>
         <Grid container sx={{border:`1px solid ${theme.palette.primary.main}`}} p={2} mt={2} spacing={1} >
          {ingredients.map((item,index) => <Grid item xs={6} container>
              <RestaurantIcon sx={{marginRight:2}}/><Typography>{item}</Typography>{measure[index] && <Typography>{" - "}{measure[index]}</Typography>}
          </Grid>)}
         </Grid>
        </Container>
        {strInstructions && <Container sx={{padding:'0px 36px !important', marginTop:4}}>
         <Typography sx={{fontSize:20,fontWeight:500}}>Instructions </Typography>
         <Grid container sx={{border:`1px solid ${theme.palette.primary.main}`}} p={2} mt={2} spacing={1} >
            {strInstructions.split('\r\n').filter(instruction => instruction.length > 1).map((item)=> <Box display={'flex'} alignItems={'center'} sx={{marginBottom:2}} >
            <span><TaskAltIcon sx={{marginRight:2}}/></span><Typography>{item}</Typography>
            </Box>)}
         </Grid>
        </Container>}
      </Container>
    );
}
export default RecipeDetails;
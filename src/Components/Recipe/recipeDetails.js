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
       <Breadcrumbs separator={<Typography sx={{color : theme.palette.tertiary.main, fontWeight:700}}> {`>`} </Typography>} aria-label="breadcrumb">
        <Link
          style={{ display: 'flex', alignItems: 'center', textDecoration:'none',fontSize:18, fontWeight:700, color : theme.palette.tertiary.main }}
          color="inherit"
          to={'/'}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
          Home
        </Link>
       {!isRandom && <Link
          style={{ display: 'flex', alignItems: 'center', textDecoration:'none',fontSize:18, fontWeight:700, color : theme.palette.tertiary.main }}
          color="inherit"
          to={`/meal/category/${strCategory}`}
        >
          <FastfoodIcon sx={{ mr: 0.5 }} fontSize="inherit"  />
          Meals
        </Link>}
        <Typography
          sx={{ display: 'flex', alignItems: 'center', fontSize:18, fontWeight:700, color : theme.palette.primary.main }}
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
            color : theme.palette.tertiary.main,
            width: "100px",
          }}
        >
          Recipe
        </Typography>
        <Grid sx={{ padding: "32px" }} container items spacing={6}>
          <Grid item sm={12} md={6}>
            <Box sx={{}}>
              <img src={strMealThumb} alt="" height={"100%"} width={"100%"} style={{borderRadius:4, boxShadow: `0px 4px 6px ${theme.palette.shadow.main}`,}} />
            </Box>
          </Grid>
          <Grid item container sm={12} md={6} flexDirection={"column"}>
            <Typography
              sx={{
                fontSize: 32,
                fontWeight: 700,
                borderBottom: `4px solid ${theme.palette.primary.main}`,
                color : theme.palette.tertiary.main,
              }}
            >
              {strMeal}
            </Typography>
            <Typography sx={{ marginTop: 3, fontWeight: 700, fontSize:20, color : theme.palette.tertiary.main, }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:20 }}
              >
                CATEGORY -{" "}
              </span>
              {strCategory}
            </Typography>
            <Typography sx={{ color : theme.palette.tertiary.main, marginTop: 2, fontWeight: 700, fontSize:16 }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:16 }}
              >
                Origin -{" "}
              </span>
              {strArea}
            </Typography>
            <Typography sx={{ color : theme.palette.tertiary.main, marginTop: 2, fontWeight: 700, fontSize:16 }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:16 }}
              >
                Video -{" "} 
              </span>
              <a href={strYoutube} style={{borderBottom: `2px solid ${theme.palette.primary.main}`, textDecoration:'none', color : theme.palette.tertiary.main}}>Click here</a>
            </Typography>
            <Typography sx={{ color : theme.palette.tertiary.main, marginTop: 2, fontWeight: 700, fontSize:16 }}>
              <span
                style={{ color: theme.palette.primary.main, fontWeight: 700, fontSize:16 }}
              >
                Source -{" "} 
              </span>
              <a href={strSource} style={{borderBottom: `2px solid ${theme.palette.primary.main}`, textDecoration:'none', color : theme.palette.tertiary.main}}>Click here</a>
            </Typography>
            <Typography sx={{ color : theme.palette.tertiary.main, marginTop: 2, fontWeight: 700, fontSize:16 }}>
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
         <Typography sx={{color : theme.palette.tertiary.main, fontSize:20,fontWeight:700}}>Ingredient and Measures : </Typography>
         <Grid container sx={{border:`3px solid ${theme.palette.primary.main}`, boxShadow: `0px 4px 6px ${theme.palette.shadow.main}`, borderRadius:4}} p={2} mt={2} spacing={1} >
          {ingredients.map((item,index) => <Grid item xs={6} container>
              <RestaurantIcon sx={{color : theme.palette.tertiary.main,marginRight:2}}/><Typography sx={{color : theme.palette.tertiary.main,}}>{item}</Typography>{measure[index] && <Typography sx={{color : theme.palette.tertiary.main,}}>{" - "}{measure[index]}</Typography>}
          </Grid>)}
         </Grid>
        </Container>
        {strInstructions && <Container sx={{padding:'0px 36px !important', marginTop:4}}>
         <Typography sx={{color : theme.palette.tertiary.main, fontSize:20,fontWeight:700}}>Instructions </Typography>
         <Grid container sx={{border:`3px solid ${theme.palette.primary.main}`, boxShadow: `0px 4px 6px ${theme.palette.shadow.main}`, borderRadius:4}} p={2} mt={2} spacing={1} >
            {strInstructions.split('\r\n').filter(instruction => instruction.length > 1).map((item)=> <Box display={'flex'} alignItems={'center'} sx={{marginBottom:2}} >
            <span><TaskAltIcon sx={{color : theme.palette.tertiary.main,marginRight:2}}/></span><Typography sx={{color : theme.palette.tertiary.main,}}>{item}</Typography>
            </Box>)}
         </Grid>
        </Container>}
      </Container>
    );
}
export default RecipeDetails;
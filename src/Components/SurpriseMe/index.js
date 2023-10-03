import { Box, Button, Typography, useTheme } from '@mui/material';
import React from 'react'
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const  SurpriseMe = () => {
    const theme = useTheme()
    const navigate = useNavigate();

    const handleRandomClick = async() => {
        try {
            const response = await axios.get(`random.php`);
            console.log(response);
            const {data = {}} = response || {};
            const {meals = []} = data || {};
            const {idMeal = ""} = meals[0] || {};
            navigate(`/meal/${idMeal}`,{state : {idMeal, isRandom : true}});
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap:2,
          alignItems: "center",
          padding: "16px",
          // backgroundColor: theme.palette.primary.main,
          borderRadius: 4,
          marginBottom: 4,
          //boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
         // transition: "box-shadow 0.3s ease",
         // "&:hover": {
         //   boxShadow: "0px 8px 12px rgba(0, 0, 0, 0.3)",
         // },
         border: `5px solid ${theme.palette.primary.main}`
        }}
      >
        <Typography sx={{color : theme.palette.tertiary.main}} variant="h3">Can't decide what to eat today?</Typography>
        <Typography sx={{color : theme.palette.tertiary.main}} variant="h6">Let's Pick for you!!</Typography>
        <Button
          onClick={() => handleRandomClick()}
          sx={{ border:`2px solid ${theme.palette.primary.main}` }}
          
        >
          Random Pick
        </Button>
      </Box>
    );
}

export default SurpriseMe;
import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import axios from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const  SurpriseMe = () => {
    const navigate = useNavigate();

    const handleRandomClick = async() => {
        try {
            const response = await axios.get(`random.php`);
            console.log(response);
            const {data = {}} = response || {};
            const {meals = []} = data || {};
            const {idMeal = ""} = meals[0] || {};
            navigate(`/meal/${idMeal}`);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px'}}>
            <Typography variant="h3">Can't decide what to eat today?</Typography>
            <Typography variant="h6">Let's Pick for you!!</Typography>
            <Button onClick={() => handleRandomClick()}>Random Pick</Button>
        </Box>
    )
}

export default SurpriseMe;
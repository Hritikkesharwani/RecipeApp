import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';
import ResponsiveAppBar from './Components/Appbar/Appbar';
import Header from './Components/Header/header';
import Footer from './Components/Footer/footer';
import CategoryListings from './Components/Listings/categories';
import MealListings from './Components/Listings/mealListings';
import RecipeDetails from './Components/Recipe/recipeDetails';
import SurpriseMe from './Components/SurpriseMe/index';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  document.body.className = isDarkMode ? 'dark-theme' : 'light-theme';

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <ResponsiveAppBar toggleTheme={toggleTheme}/>
      <Header/>
      <Routes>
       <Route path = "/" element = {<CategoryListings />} />
        <Route path = "/meal/:id" element = {<RecipeDetails />} />
        <Route path = "/meal/category/:name" element = {<MealListings />} />
      </Routes>
      <Footer/>
      {/* Your application components */}
      {/* Include the theme toggle button here */}
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;





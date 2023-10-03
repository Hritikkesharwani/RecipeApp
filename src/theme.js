// theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    type: 'light', // Light mode
    primary: {
      main: '#fc8019',
    },
    secondary: {
      main:'#ffffff',
    },
    tertiary: {
      main:'#000000'
    },
    shadow:{
      main:'#4D4D4D4D'
    }
    
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark', // Dark mode
    primary: {
      main: '#fc8019',
    },
    secondary: {
      main:'#000000',
    },
    tertiary: {
      main:'#ffffff'
    },
    shadow:{
      main:'#ffffff'
    }
  },
});

export { lightTheme, darkTheme };

// theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    type: 'light', // Light mode
    primary: {
      //main: '#007acc',
      light:'#FAF3F0',
      main:'#E97777'
    },
    secondary: {
      main:'#EFFFFD',
      dark:'#85F4FF'
    }
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark', // Dark mode
    primary: {
     // main: '#90caf9',
      light:'#FAF0E6',
      main:'#FAF0E6',
      dark:'#18122B'
    },
    secondary: {
      main:'#5C5470',
      dark:'#B9B4C7'
    }
  },
});

export { lightTheme, darkTheme };

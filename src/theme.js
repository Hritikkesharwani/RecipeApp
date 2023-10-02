// theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    type: 'light', // Light mode
    primary: {
      //main: '#007acc',
      light:'#FAF3F0',
      main:'#FFCF9D'
    },
  },
});

const darkTheme = createTheme({
  palette: {
    type: 'dark', // Dark mode
    primary: {
     // main: '#90caf9',
      light:'#393053',
      main:'#393053',
      dark:'#18122B'
    },
  },
});

export { lightTheme, darkTheme };

// 1. GlobalStyles.js
import { makeStyles, createStyles } from "@material-ui/core";
const useStyles = makeStyles(() =>
  createStyles({
    '@global': {
      html: {
        height: '100%',
        margin:0,
      },
      '*, *::before, *::after': {
        boxSizing: 'border-box'
      },
      body: {
        height:'100%',
        margin:0,
        fontFamily:[
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            'Oxygen-Sans',
            'Ubuntu',
            'Cantarell',
            '"Helvetica Neue"',
            'sans-serif',
        ].join(','),
        backgroundColor:'#fff',
        lineHeight:1.4,
      },
      link: {
        color:'#0077cc',
        '&:hover,&:focus':{
            color:'#004499'
        }
      },
      h1:{
        color: 'red',
      }
    }
  })
);

const GlobalStyles = () => {
  useStyles();

  return null;
};

export default GlobalStyles;
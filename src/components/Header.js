
import React from "react";
import logo from '../img/logo.svg';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  headerBar:{
    width:"100%",
    padding: "0.5em 1em",
    height: 64,
    display: "flex",
    position:"fixed",
    alignItems:"center",    
    backgroundColor:"#fff",
    boxShadow:"0 0 5px 0 rgba(0,0,0,0.25)",
    zIndex:1,        
  },
  logText: {
    margin:0,
    padding:0,
    display:'inline',
  },
}));


const Header = () => {
  const styles = useStyles();
  return (
    <header className={styles.headerBar}>
      <img src={logo} alt="eMenu logo" height="40"/>
      <h1 className={styles.logText}>eMenu</h1>
    </header>
  );
};

export default Header;
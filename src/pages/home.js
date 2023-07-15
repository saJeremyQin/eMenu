
import React from "react";
// import Link component from react-router
import { Link } from 'react-router-dom';
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
// Define custom styles using JSS
const useStyles = makeStyles((theme) => ({
    button: {
        // some styels here
        backgroundColor:'#0077cc',
        color:'#fff',
        '&:hover':{
            opacity: 0.8,
        },
        '&:active':{
            backgroundColor: 'red',
        }
    },
}));


const Home = () => {
    const styles = useStyles();
    return (
        <div>
            {/* <Header />
            <Navigation /> */}
            {/* <h1>This is h1</h1> */}
            <p>This is the home page</p>
            <Button className={styles.button}>
                Click me!
            </Button>
        </div>
    );
 
};

export default Home;
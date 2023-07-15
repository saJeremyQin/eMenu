import React from "react";

import Header from "./Header";
import Navigation from "./Navigation";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        [theme.breakpoints.up("md")]:{
            display: "flex",
            top: 64,
            position:"relative",
            height:`calc(100% - 64px)`,
            width:"100%",
            flex:"auto",
            flexDirection:"column"
        }
    },
    main:{
        position: "fixed",
        height: `calc(100% - 185px)`,
        width: "100%",
        padding: "1em",
        overflowY: "scroll",
        [theme.breakpoints.up("md")]: {
            flex: 1,
            marginLeft: 220,
            height: `calc(100% - 64px)`,
            width: `calc(100% - 220px)`
        }   
    },
}));

const Layout = ({children}) => {
    const styles = useStyles();
    return (
        <React.Fragment>
            <Header />
            <div className={styles.wrapper}>
                <Navigation />
                <main className={styles.main}>
                    {children}
                </main>
            </div>
        </React.Fragment>
    );
}

export default Layout;
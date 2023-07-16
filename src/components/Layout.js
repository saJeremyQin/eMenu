import React from "react";
import Header from "./Header";
import Navigation from "./Navigation";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        // borderTop:'1px solid red',
        [theme.breakpoints.up("md")]:{
            display: "flex",
            top: 64,
            position:"relative",        //cause it to be adjusted away 64px from its normal position. 
                                        //Other content will not be adjusted to fit into any gap left by the element.
            height:`calc(100% - 64px)`,
            width:"100%",
            flex:"auto",
            flexDirection:"column",
        }
    },
    main:{
        position:"fixed",               //is positioned relative to the viewport,
                                        //which means it always stays in the same place even if the page is scrolled.
        height: `calc(100% - 185px)`,
        width: "100%",
        padding: "1em",
        overflowY: "scroll",
        borderLeft:'1px solid pink',
        // borderTop:'1px solid blue',
        [theme.breakpoints.up("md")]: {
            flex: 1,
            marginLeft: 230,
            height: `calc(100% - 64px)`,
            width: `calc(100% - 230px)`
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
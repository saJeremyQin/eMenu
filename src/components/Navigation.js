import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@material-ui/core";
import {
  Home as HomeIcon,
  Restaurant as RestaurantIcon,
  Fastfood as FastfoodIcon,
  Person as PersonIcon,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import { makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    navBar:{
        background:'#f4f5f0',
        padding:'1em',
        [theme.breakpoints.down("md")]:{
            paddigTop:64,
        },
        [theme.breakpoints.up("md")]:{
            position:"fixed",
            width:230,
            height:`calc(100% - 64px)`,
            overflowY:"scroll",
        }
    },

}));

const Navigation = () => {
    const styles = useStyles();
    const [dishManagementOpen, setDishManagementOpen] = useState(false);

    const handleDishManagementClick = () => {
        setDishManagementOpen(!dishManagementOpen);
    };

    return (
        <nav className={styles.navBar}>
        <List component="ul">
            <ListItem component="li" button component={Link} to="/">
            <ListItemIcon>
                <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={handleDishManagementClick}>
            <ListItemIcon>
                <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="Dish Opt." />
            {dishManagementOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={dishManagementOpen} timeout="auto" unmountOnExit>
            <List component="ul" disablePadding>
                <ListItem
                component="li"
                button
                component={Link}
                to="/dishTypes"
                >
                <ListItemText primary="DishTypes" />
                </ListItem>
                <ListItem component="li" button component={Link} to="/dishes">
                <ListItemText primary="Dishes" />
                </ListItem>
            </List>
            </Collapse>
            <ListItem component="li" button  component={Link} to="/restaurantInfo">
            <ListItemIcon>
                <RestaurantIcon />
            </ListItemIcon>
            <ListItemText primary="RestaurantInfo" />
            </ListItem>
            <ListItem component="li" button  component={Link} to="/appUsers">
            <ListItemIcon>
                <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="AppUsers" />
            </ListItem>
        </List>
        </nav>
    );
};

export default Navigation;

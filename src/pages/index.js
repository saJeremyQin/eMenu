import React from "react";
// update our react-router import to include Redirect
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./home";
import DishTypes from "./dishTypes";
import Dishes from "./dishes";
import ToVerify from "./toVerify";
import AppUsers from "./appUsers";
import RestaurantInfo from "./restaurantInfo";
import Layout from "../components/Layout";

const Pages = () => {
    return (
        <Router>
            <Layout>
                <Route exact path="/" component={Home}/>
                <Route path="/toverify" component={ToVerify} />
                <Route path="/dishTypes" component={DishTypes} />
                <Route path="/dishes" component={Dishes}/>
                <Route path="/appUsers" component={AppUsers}/>
                <Route path="/restaurantInfo" component={RestaurantInfo}/>
            </Layout>
        </Router>

    );

};

export default Pages;
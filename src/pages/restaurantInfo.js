

import React,{ useEffect } from "react";

const RestaurantInfo = () => {
    useEffect(() => {
        document.title = 'RestaurantInfo - eMenu';
    });
    return (
        <div>
            <h1>eMenu</h1>
            <p>RestaurantInfo for eMenu</p>
        </div>
    );
};

export default RestaurantInfo;
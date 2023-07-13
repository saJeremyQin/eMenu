

import React,{ useEffect } from "react";

const Dishes = () => {
    useEffect(() => {
        document.title = 'Dishes - eMenu';
    });
    return (
        <div>
            <h1>eMenu</h1>
            <p>Dishes for eMenu</p>
        </div>
    );
};

export default Dishes;
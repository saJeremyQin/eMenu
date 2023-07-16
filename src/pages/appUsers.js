

import React,{ useEffect } from "react";

const AppUsers = () => {
    useEffect(() => {
        document.title = 'AppUsers - eMenu';
    });
    return (
        <div>
            {/* <h1>eMenu</h1> */}
            <p>AppUsers for eMenu</p>
        </div>
    );
};

export default AppUsers;
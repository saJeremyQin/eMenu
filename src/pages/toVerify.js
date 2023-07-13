

import React,{ useEffect } from "react";

const ToVerify = () => {
    useEffect(() => {
        document.title = 'To verify - eMenu';
    });
    return (
        <div>
            <h1>eMenu</h1>
            <p>Please verify your email before use eMenu</p>
        </div>
    );
};

export default ToVerify;
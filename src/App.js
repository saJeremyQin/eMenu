
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";


const App = () => {
    return (
       <div>
            {/* <h1>eMenu</h1>
            <p>Welcome to eMenu application!</p> */}
            <Pages />
       </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
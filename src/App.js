
import React from "react";
import ReactDOM from "react-dom";
import Pages from "./pages";
import GlobalStyles from "./components/GlobalStyles";


const App = () => {
    return (
       <div>
            <GlobalStyles />            
            <Pages />
       </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
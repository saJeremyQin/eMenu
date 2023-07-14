import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
      <nav>
        <ul>
          <li>
            <Link to="/" >Home</Link>
          </li>
          <li>
            <Link to="/dishTypes">DishTypes</Link>
          </li>
          <li>
            <Link to="/dishes">Dishes</Link>
          </li>
          <li>
            <Link to="/restaurantInfo">RestaurantInfo</Link>
          </li>
        </ul>
      </nav>
    );
};

export default Navigation;
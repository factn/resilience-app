import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Login">Login</Link>
      </li>
    </ul>
  );
};

export default HomePage;

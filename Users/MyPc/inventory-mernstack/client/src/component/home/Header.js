import React from "react";
import { useNavigate } from "react-router-dom";
 import "../../App.css"
import { Link } from "react-router-dom";
import "../../Header.css";
const Header = (props) => {
  return (
    <div className="header">
      <h1 className="head"> INVENTORY MANAGEMENT SYSTEM</h1>
      <Link to={`/login`} className="btn1">
        Login/Register
      </Link>
    </div>
  );
};

export default Header;

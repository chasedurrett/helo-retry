import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./Nav.css";

function Nav(props) {
  console.log(props);
  return (
    <div className="nav-container">
      <div className="top-nav">
        <img
          className="profile-pic"
          alt="profile-pic"
          src="https://robohash.org/fgh"
        />
        <h1 className="username">{props.username}</h1>
        <Link to="/dashboard">
          <img
            className="icon"
            alt="Home"
            src="https://img.icons8.com/ios/2x/home.png"
          />
        </Link>
        <Link to="/new">
          <img
            className="icon"
            alt="new-post"
            src="https://img.icons8.com/ios/2x/create-order.png"
          />
        </Link>
      </div>

      <Link to="/"> 
        <img
          className="icon logout-icon"
          alt="logout"
          src="https://img.icons8.com/ios/2x/power-off-button--v2.png"
        />
      </Link>
    </div>
  );
}

const mapStateToProps = (reduxState) => reduxState;

export default connect(mapStateToProps)(Nav);

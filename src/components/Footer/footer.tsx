import React from "react";

import "./footer.scss";

import { Link } from "react-router-dom";

import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <div className="footer" style={{ backgroundImage: `url(${bg})` }}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
        </div>
        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/">Movies</Link>
            <Link to="/">Tv Show</Link>
            <Link to="/">Profile</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">About us</Link>
            <Link to="/">Policy</Link>
            <Link to="/">Contact</Link>
          </div>
          <div className="footer__content__menu">
            <Link to="/">Favorite</Link>
            <Link to="/">WatchList</Link>
            <Link to="/">Your List</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

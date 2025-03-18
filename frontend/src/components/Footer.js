import React from "react";
import "./Footer.css";
import logo from "../assets/logo.png";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* ✅ Fixed missing alt text in logo */}
        <div className="footer-logo">
          <img src={logo} alt="EcoBite Logo" />
        </div>

        {/* ✅ Wrapped text inside a div for better spacing */}
        <div className="footer-section">
          <h3>EcoBite</h3>
          <p>
            Saving food and ensuring health safety with sustainable shopping
            options. Join us in reducing food wastage!
          </p>
        </div>

        {/* ✅ Fixed spacing issues for quick links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/home">Home</a>
            </li>
            <li>
              <a href="/products">Products</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
          </ul>
        </div>

        {/* ✅ Fixed spacing for contact section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: support@ecobite.com</p>
          <p>Phone: +123 456 7890</p>
          <p>Address: 123 Eco Street, Green City</p>
        </div>

        {/* ✅ Replaced font-awesome with react-icons */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com">
              <FaFacebook />
            </a>
            <a href="https://twitter.com">
              <FaTwitter />
            </a>
            <a href="https://instagram.com">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 EcoBite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

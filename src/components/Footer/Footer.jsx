
import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="satta-footer">
      <div className="footer-glow"></div>
      
      <div className="footer-container">
        <div className="footer-section about-section">
          <h3>About Us</h3>
          <p className="footer-description">
            Your trusted gaming platform providing secure and fair entertainment since 2023.
          </p>
          <div className="social-icons">
            <a href="#" className="social-icon"><i className="fab fa-telegram"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-whatsapp"></i></a>
            <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/refund"><i className="fas fa-undo"></i>Refund Policy</Link></li>
            <li><Link to="/game-rules"><i className="fas fa-gamepad"></i>Game Rules</Link></li>
            <li><Link to="/about"><i className="fas fa-info-circle"></i>About Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><Link to="/disclaimer"><i className="fas fa-gavel"></i>Disclaimer</Link></li>
            <li><Link to="/privacy"><i className="fas fa-lock"></i>Privacy Policy</Link></li>
            <li><Link to="/terms"><i className="fas fa-file-contract"></i>Terms</Link></li>
          </ul>
        </div>

        <div className="footer-section contact-section">
          <h3>Support 24/7</h3>
          <div className="contact-info">
            <p><i className="fab fa-telegram"></i>Telegram: @SattaSupport</p>
            <p><i className="fas fa-envelope"></i>Email: support@sattaking.com</p>
            <p><i className="fas fa-clock"></i>Available: 24/7</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 <span className="brand-name">Satta King</span>. All Rights Reserved.</p>
        <p className="disclaimer">This website is for entertainment purposes only.</p>
      </div>
    </footer>
  );
};

export default Footer;

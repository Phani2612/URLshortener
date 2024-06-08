import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-links">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact" >Contact</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Products</h3>
          <ul>
            <li><Link to="/">URL Shortener</Link></li>
            <li><Link to="/">QR Codes</Link></li>
            <li><Link to="/">Custom URLs</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Resources</h3>
          <ul>
            <li><Link to="/">Blog</Link></li>
            <li></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Legal</h3>
          <ul>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
            <li><Link to="/">Code of Conduct</Link></li>
          </ul>
        </div>
        <div className="footer-links">
          <h3>Social Media</h3>
          <ul>
            <li><Link to="/">Facebook</Link></li>
            <li><Link to="/">Instagram</Link></li>
            <li> <Link to="/">X</Link> </li>
            <li><Link to="https://www.linkedin.com/company/4necotech/?viewAsMember=true">LinkedIn</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-right">
      <img src="./logo.png" alt="Company Logo" />
        <p id="company-name">
            <span className="fourN">4N</span> <span className="eco">Eco</span><span className="tech">Tech</span>
        </p>
        <p>© 2024 4N EcoTech. All rights reserved.</p>  
      </div>
      
      
      
    </footer>
  );
}

export default Footer;

// Header.js
import React from 'react';
import './Header.css';

// Replace '4RYkey-LogoMakr.png' with the actual path to your logo file
import logo from '../../image/4RYkey-LogoMakr.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={logo} alt="LogoMakr Logo" className="logo-image" />
      </div>
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/cars">Cars</a>
        <a href="/contact">Contact</a>
        {/* Add more navigation links as needed */}
      </nav>
    </header>
  );
};

export default Header;

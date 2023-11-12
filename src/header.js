import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Make sure the path to your CSS file is correct
import logoImage from './logo.png';

function Header() {
    return (
        <header className="header">
            <div className="logo">
            <img width="80" height="80" src={logoImage} alt="Company Logo" />
            </div>
            <nav>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                <NavLink to="/services" activeClassName="active">Services</NavLink>
                <NavLink to="/contact" activeClassName="active">Contact</NavLink>
                <NavLink to="/about" activeClassName="active">About</NavLink>
                {/* Other navigation links */}
            </nav>
            <span className="book-now-container">
                <NavLink to="/book" className="book-now">Book Now</NavLink>
            </span>
        </header>
    );
}

export default Header;

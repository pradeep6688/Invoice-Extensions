import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Make sure the path to your CSS file is correct
import logoImage from './logo.png';
import BookNowModal from './components/BookNowModal';

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
                <NavLink to="/booknow"  activeClassName="active">Book Now</NavLink>
                {/* Other navigation links */}
            </nav>
        </header>
    );
}

export default Header;

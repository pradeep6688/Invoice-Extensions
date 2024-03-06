// TopBar.js
import React from 'react';
import './TopBar.css'; // Make sure the path to your CSS file is correct

function TopBar() {
    return (
        <div className="top-bar">
            <div className="location">
                <span className="icon">📍</span> {/* Replace with an actual icon if available */}
                <span className='address'> <a href="https://www.google.com/maps/search/?api=1&query=550+Showers+Dr+D0006+studio+9,+Mountain+View,+CA+94040" target="_blank" rel="noopener noreferrer">
                550 Showers Dr D0006 studio 9, Mountain View, CA 94040
                    </a></span>
            </div>
            <div className="phone">
                <span className="icon">📞</span> {/* Replace with an actual icon if available */}
                <a href="tel:+17036748828">(703) 674-8828</a>
            </div>
        </div>
    );
}

export default TopBar;

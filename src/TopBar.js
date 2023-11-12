// TopBar.js
import React from 'react';
import './TopBar.css'; // Make sure the path to your CSS file is correct

function TopBar() {
    return (
        <div className="top-bar">
            <div className="location">
                <span className="icon">📍</span> {/* Replace with an actual icon if available */}
                <span>550 Showers Dr D0006 studio 9, Mountain View, CA 94040</span>
            </div>
            <div className="phone">
                <span className="icon">📞</span> {/* Replace with an actual icon if available */}
                <span>Call: 703-674-8828</span>
            </div>
        </div>
    );
}

export default TopBar;

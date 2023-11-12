// Footer.js
import React from 'react';
import './Footer.css'; // Make sure the path to your CSS file is correct

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-section">
                <h4>Visit Us</h4>
                <p>550 Showers Dr D0006 studio 9, Mountain View, CA 94040</p>
            </div>
            <div className="footer-section">
                <h4>Contact</h4>
                <p>SarabiAesthetics@gmail.com<br />(703) 674-8828</p>
            </div>
            <div className="footer-section">
                <h4>Social Media</h4>
                {/* Replace these spans with actual icons or images */}
                <span>📷</span>
                <span>✨</span>
            </div>
        </footer>
    );
}

export default Footer;

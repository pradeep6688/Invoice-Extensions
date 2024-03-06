// MainBanner.js
import React, { useState, useEffect } from 'react';
import '../MainBanner.css'; // Make sure the path to your CSS file is correct
import background1 from '../images/background1.jpg';
import background2 from '../images/background2.jpg';
import background3 from '../images/background3.jpg';


const images = [background1, background2, background3];
function MainBanner() {
  // State to hold the current background image
  const [background, setBackground] = useState(images[0]);
  

  useEffect(() => {
    // Change the background image every 1 second
    const intervalId = setInterval(() => {
      setBackground((current) => {
       // console.log(current)
        // Find the index of the current image
        const index = images.indexOf(current);
        //console.log(index)
        console.log((index + 1) % images.length)
        // Move to the next image, or go back to the first one if at the end
        return images[(index + 1) % images.length];
      });
    }, 5000); // 1000ms = 1 second

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <div className="main-banner" style={{ backgroundImage: `url(${background})` }}>
      <div className="banner-content">
        <h1>FLORECER AESTHETICS</h1>
        <p className="subtitle">Spa services in Mountain View California</p>
        <button className="book-service-button">BOOK YOUR NEXT SERVICE</button>
      </div>
    </div>
      <div className="text-section">
      <h1>Sarabi Aesthetics</h1>
      <p className="subtitle">Frisco Esthetician</p>
      <p>Welcome to Sarabi Aesthetics, your trusted spa in Frisco, Texas! As a local business, we’re proud to offer personalized skincare and beauty services to our community...</p>
      <div className="button-group">
        <button className="button view-services">VIEW SPA SERVICES</button>
        <button className="button book-now">BOOK NOW</button>
      </div>
    </div>
    <div className="image-section">
      {/* <img src={spaImage} alt="Spa Services" /> */}
    </div>
    </>
  );
}

export default MainBanner;

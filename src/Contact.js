import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

function App() {
  const [ip, setIP] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const getLocalIP = async () => {
      const RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
      if (!RTCPeerConnection) {
        setError('WebRTC is not supported by your browser');
        return;
      }

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] // Public STUN server
      });

      pc.createDataChannel('');
      
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
      } catch (error) {
        console.error('Error creating offer:', error);
        setError('Error creating offer: ' + error.message);
        return;
      }

      pc.onicecandidate = (event) => {
        if (event && event.candidate) {
          console.log('ICE candidate:', event.candidate.candidate);
          const ipMatch = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(event.candidate.candidate);
          if (ipMatch) {
            setIP(ipMatch[1]);
            pc.onicecandidate = null;
            pc.close(); // Close the connection once the IP is found
          }
        } else if (!event.candidate) {
          setError('No more ICE candidates');
          pc.close(); // Close the connection if no more candidates
        }
      };

      // Close the connection after a short timeout to ensure all candidates are collected
      setTimeout(() => {
        if (!ip) {
          setError('No IP address found');
          pc.close();
        }
      }, 5000);
    };

    getLocalIP();
  }, [ip]);

  return (
    <div>
      <h1>Your Local IP Address is: {ip}</h1>
      {error && <p>Error: {error}</p>}
    </div>
  );
}

// React 18 rendering using createRoot
const container = document.querySelector("#react-root");
const root = createRoot(container);
root.render(<App />);

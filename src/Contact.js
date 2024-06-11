import React, { useEffect, useState } from 'react';

const App = () => {
  const [environment, setEnvironment] = useState('Detecting environment...');
  const [detectionLog, setDetectionLog] = useState('');

  useEffect(() => {
    const webGLInfo = getWebGLInfo();
    const additionalInfo = getAdditionalInfo();
    gatherICECandidates().then(candidates => {
      analyzeEnvironment(webGLInfo, additionalInfo, candidates);
    });
  }, []);

  const getWebGLInfo = () => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      return { renderer: 'None', vendor: 'None' };
    }
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    return {
      renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
      vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
    };
  };

  const getAdditionalInfo = () => {
    return {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      hardwareConcurrency: navigator.hardwareConcurrency,
      deviceMemory: navigator.deviceMemory || 'Unknown',
      touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0
    };
  };

  const gatherICECandidates = () => {
    return new Promise((resolve) => {
      const rtc = new RTCPeerConnection({ iceServers: [] });
      const candidates = [];
      rtc.onicecandidate = (event) => {
        if (event.candidate) {
          candidates.push(event.candidate.candidate);
        } else {
          resolve(candidates);
        }
      };
      rtc.createDataChannel('');
      rtc.createOffer().then(offer => rtc.setLocalDescription(offer));
    });
  };

  const analyzeEnvironment = (webGLInfo, additionalInfo, candidates) => {
    const { renderer, vendor } = webGLInfo;
    const { screenWidth, screenHeight, hardwareConcurrency, deviceMemory, touchSupport } = additionalInfo;

    let isCitrix = false;
    let logMessage = 'Conditions met: ';

    // Check WebGL renderer and vendor
    if (renderer.includes('VirtualBox') || vendor.includes('VMware')) {
      isCitrix = true;
      logMessage += 'WebGL renderer/vendor; ';
    }

    // Check screen resolution
    if (screenWidth <= 1280 && screenHeight <= 1024) {
      isCitrix = true;
      logMessage += 'Screen resolution; ';
    }

    // Check hardware concurrency and device memory
    if (hardwareConcurrency <= 4 && deviceMemory <= 4) {
      isCitrix = true;
      logMessage += 'Hardware concurrency/device memory; ';
    }

    // Check touch support
    if (!touchSupport) {
      isCitrix = true;
      logMessage += 'No touch support; ';
    }

    // Check ICE candidates
    if (candidates.some(candidate => candidate.includes('relay'))) {
      isCitrix = true;
      logMessage += 'WebRTC relay candidate; ';
    }

    if (isCitrix) {
      setEnvironment('User is in a Citrix environment.');
      setDetectionLog(logMessage);
    } else {
      setEnvironment('User is in a normal environment.');
      setDetectionLog('No conditions met.');
    }
  };

  return (
    <div>
      <h1>Environment Detection</h1>
      <p>{environment}</p>
      <p><strong>Detection Log:</strong> {detectionLog}</p>
    </div>
  );
};

export default App;

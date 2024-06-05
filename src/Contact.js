const express = require('express');
const os = require('os');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

// Function to get local IP address
const getLocalIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const address of addresses) {
      if (address.family === 'IPv4' && !address.internal) {
        return address.address;
      }
    }
  }
  return 'Unable to determine local IP address';
};

// Endpoint to get local IP address
app.get('/api/ip', (req, res) => {
  const ipAddress = getLocalIPAddress();
  res.json({ ip: ipAddress });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});





const express = require('express');
const os = require('os');
const cors = require('cors');
const { exec } = require('child_process');

const app = express();
const port = 3001;

app.use(cors());

const isCitrixEnvironment = () => {
  // Check for specific environment variables
  if (process.env.CTX_CLIENT_NAME) {
    return true;
  }

  // Check for Citrix-related processes
  if (os.platform() === 'win32') {
    // Command to list processes on Windows
    return new Promise((resolve) => {
      exec('tasklist', (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          resolve(false);
          return;
        }
        if (stdout.includes('wfcrun32.exe') || stdout.includes('Receiver.exe')) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  } else if (os.platform() === 'linux' || os.platform() === 'darwin') {
    // Command to list processes on Linux/macOS
    return new Promise((resolve) => {
      exec('ps aux', (err, stdout, stderr) => {
        if (err) {
          console.error(`exec error: ${err}`);
          resolve(false);
          return;
        }
        if (stdout.includes('wfcrun32') || stdout.includes('Receiver')) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  return false;
};

app.get('/api/environment', async (req, res) => {
  const isCitrix = await isCitrixEnvironment();
  res.json({ isCitrix });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

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

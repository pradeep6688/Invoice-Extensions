const os = require('os');
const { exec } = require('child_process');
const logger = require('your-logger-module'); // Replace with your actual logger

const getSystemInfo = (req, res) => {
  const systemInfo = {
    operatingSystem: os.platform(),
    osVersion: os.release(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuArchitecture: os.arch(),
    cpuInfo: os.cpus(),
    homeDirectory: os.homedir(),
    hostName: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
  };

  logger.trace('networkutilities :: SystemInfo :: Gathering system information', systemInfo);

  checkCitrixProcesses((isCitrixProcess) => {
    const isCitrixEnv = checkCitrixEnvVariables();
    systemInfo.isCitrix = isCitrixProcess || isCitrixEnv;

    logger.info('networkutilities :: SystemInfo :: Citrix check completed', { isCitrix: systemInfo.isCitrix });

    res.status(200).send({
      message: 'System information gathered successfully',
      systemInfo,
    });
  });
};

// Function to check for Citrix processes
function checkCitrixProcesses(callback) {
  exec('tasklist', (error, stdout, stderr) => {
    if (error) {
      logger.error('networkutilities :: SystemInfo :: Error executing tasklist command', { error });
      callback(false);
      return;
    }

    const citrixProcesses = ['wfica32.exe', 'Receiver.exe', 'concentr.exe'];
    const isCitrix = citrixProcesses.some(process => stdout.includes(process));
    logger.trace('networkutilities :: SystemInfo :: Citrix process check', { isCitrix });

    callback(isCitrix);
  });
}

// Function to check for Citrix environment variables
function checkCitrixEnvVariables() {
  const citrixEnvVariables = ['CTX_SESSION', 'CTX_EMULATE'];
  const isCitrixEnv = citrixEnvVariables.some(env => process.env[env] !== undefined);

  logger.trace('networkutilities :: SystemInfo :: Citrix environment variable check', { isCitrixEnv });
  return isCitrixEnv;
}

const systemInfoExport = {
  getSystemInfo,
};

module.exports = systemInfoExport;
const os = require('os');
const { exec } = require('child_process');
const logger = require('your-logger-module'); // Replace with your actual logger

const getSystemInfo = (req, res) => {
  const systemInfo = {
    operatingSystem: os.platform(),
    osVersion: os.release(),
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpuArchitecture: os.arch(),
    cpuInfo: os.cpus(),
    homeDirectory: os.homedir(),
    hostName: os.hostname(),
    networkInterfaces: os.networkInterfaces(),
  };

  logger.trace('networkutilities :: SystemInfo :: Gathering system information', systemInfo);

  checkCitrixProcesses((isCitrixProcess) => {
    const isCitrixEnv = checkCitrixEnvVariables();
    systemInfo.isCitrix = isCitrixProcess || isCitrixEnv;

    logger.info('networkutilities :: SystemInfo :: Citrix check completed', { isCitrix: systemInfo.isCitrix });

    res.status(200).send({
      message: 'System information gathered successfully',
      systemInfo,
    });
  });
};

// Function to check for Citrix processes
function checkCitrixProcesses(callback) {
  exec('tasklist', (error, stdout, stderr) => {
    if (error) {
      logger.error('networkutilities :: SystemInfo :: Error executing tasklist command', { error });
      callback(false);
      return;
    }

    const citrixProcesses = ['wfica32.exe', 'Receiver.exe', 'concentr.exe'];
    const isCitrix = citrixProcesses.some(process => stdout.includes(process));
    logger.trace('networkutilities :: SystemInfo :: Citrix process check', { isCitrix });

    callback(isCitrix);
  });
}

// Function to check for Citrix environment variables
function checkCitrixEnvVariables() {
  const citrixEnvVariables = ['CTX_SESSION', 'CTX_EMULATE'];
  const isCitrixEnv = citrixEnvVariables.some(env => process.env[env] !== undefined);

  logger.trace('networkutilities :: SystemInfo :: Citrix environment variable check', { isCitrixEnv });
  return isCitrixEnv;
}

const systemInfoExport = {
  getSystemInfo,
};

module.exports = systemInfoExport;

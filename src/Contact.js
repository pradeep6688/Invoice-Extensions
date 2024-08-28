const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

// Define the directory and file pattern to look for
const dir = 'build/static/js/';
const filePattern = /^main\..*\.chunk\.js$/;

// Read the directory and find the file that matches the pattern
fs.readdir(dir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  const mainChunkFile = files.find(file => filePattern.test(file));

  if (!mainChunkFile) {
    console.error('No main chunk file found matching the pattern.');
    return;
  }

  const inputFilePath = path.join(dir, mainChunkFile);
  const outputFilePath = path.join(dir, mainChunkFile.replace('.js', '.min.js'));

  // Read the contents of the found JavaScript file
  fs.readFile(inputFilePath, 'utf8', async (err, code) => {
    if (err) {
      console.error('Error reading input file:', err);
      return;
    }

    // Automatically detect and split regex patterns that start with `^`
    const transformedCode = code.replace(/\/\^([^\n\r]+?)\/[gimsuy]*/g, (match, p1) => {
      // Split the regex into parts and concatenate them
      const splitPattern = p1.split('').map(char => `"${char}"`).join(' + ');
      return `new RegExp(${splitPattern}, '${match.split('/')[2]}')`;
    });

    try {
      // Use Terser to minify and obfuscate the transformed code
      const result = await minify(transformedCode, {
        mangle: {
          toplevel: true,  // Mangle top-level variable and function names
        },
        compress: {
          drop_console: true,  // Remove console logs
          drop_debugger: true, // Remove debugger statements
          passes: 3,           // Perform multiple passes for better compression
        },
        output: {
          comments: false,  // Remove all comments
        },
      });

      // Write the minified and obfuscated code to a new file
      fs.writeFile(outputFilePath, result.code, 'utf8', (err) => {
        if (err) {
          console.error('Error writing output file:', err);
          return;
        }
        console.log(`Minification and obfuscation complete: ${outputFilePath}`);
      });
    } catch (err) {
      console.error('Error during minification:', err);
    }
  });
});

const path = require('path');

module.exports = {
  // Other webpack configuration options...
  resolve: {
    // Other resolve configurations...
    fallback: {
      "buffer": require.resolve("buffer/")
    }
  },
};

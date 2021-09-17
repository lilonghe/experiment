const path = require('path');
const HelloPlugin = require('./hello.plugin');

const config = {
    mode: 'development',
    entry: './index.js',
    output: {
      filename: 'index.min.js',
    },
    plugins: [
      new HelloPlugin()
    ]
  };
  
  module.exports = config;
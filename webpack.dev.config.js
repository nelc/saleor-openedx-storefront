const path = require('path');
const { createConfig } = require('@openedx/frontend-build');

const config = createConfig('webpack-dev');

config.resolve.alias = {
  ...config.resolve.alias,
  '@src': path.resolve(__dirname, 'src'),
};
config.devServer = {
  port: 18055,
  hot: true,
  historyApiFallback: true,
  allowedHosts: [
    'local.overhang.io'
  ],
}

module.exports = config;

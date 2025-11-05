const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const common = require('./webpack.common.js');
const packageJson = require('../package.json');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 8085,
    historyApiFallback: {
      index: '/index.html',
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container',
      remotes: {
        marketing: 'marketing@http://localhost:8086/remoteEntry.js',
      },
      shared: packageJson.dependencies,
    })
  ],
});
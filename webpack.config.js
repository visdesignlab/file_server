let webpack = require('webpack');
let path = require('path');
let fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules').filter(function (x) {
    return ['bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  entry: './src/server',
  target: 'node',
  node: {
    __filename: true,
    __dirname: true
  },
  mode: 'development',
  output: {
    path: path.join(__dirname),
    filename: 'server.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".css", ".html"],
    modules: ["src", "node_modules"]
  },
  module: {
    rules: [{
      test: /\.ts$/,
      loader: "awesome-typescript-loader"
    }]
  },
  externals: nodeModules,
  watch: true
};
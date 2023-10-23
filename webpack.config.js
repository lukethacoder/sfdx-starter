const path = require('path')
const LwcWebpackPlugin = require('@lukethacoder/lwc-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const lwcConfig = require('./lwc.config.json')

// automatically pull from lwc.config.json
const namePathModules = lwcConfig.modules.reduce((acc, module) => {
  if (!!module.name && !!module.path) {
    return {
      ...acc,
      [module.name]: path.resolve(
        __dirname,
        module.path.replace('$rootDir/', './')
      ),
    }
  }

  return acc
}, {})

module.exports = {
  mode: 'development',
  entry: {
    app: './config/index.js',
  },
  devServer: {
    static: './dist',
    hot: true,
  },
  plugins: [
    new LwcWebpackPlugin({
      rootDir: './',
    }),
    new HtmlWebpackPlugin({ template: './config/index.html' }),
  ],
  resolve: {
    alias: namePathModules,
  },
}

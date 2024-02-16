const path = require('path')
const LwcWebpackPlugin = require('@lukethacoder/lwc-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

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
    new CopyPlugin({
      patterns: ['assets'],
    }),
  ],
  resolve: {
    alias: {
      ...namePathModules,
      public: path.resolve(__dirname, 'public'),
      '@salesforce/label': path.resolve(
        __dirname,
        `./__mocks__/@salesforce/label`
      ),
      '@salesforce/i18n': path.resolve(
        __dirname,
        `./__mocks__/@salesforce/i18n`
      ),
      'lightning/uiRecordApi': path.resolve(
        __dirname,
        `./__mocks__/lightning/uiRecordApi`
      ),
      '@salesforce/messageChannel': path.resolve(
        __dirname,
        `./__mocks__/@salesforce/messageChannel`
      ),
      'lightning/messageService': path.resolve(
        __dirname,
        `./__mocks__/lightning/messageService`
      ),
    },
  },
}

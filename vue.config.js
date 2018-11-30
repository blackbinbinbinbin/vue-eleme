const appData = require('./data/data.json')
const webpack = require('webpack')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings
const path = require('path');
function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },
  devServer: {
    before (app) {
      app.get('/api/seller', function (req, res) {
        res.json({
          error: 0,
          msg: 'success',
          data: seller
        })
      })
      app.get('/api/goods', function (req, res) {
        res.json({
          error: 0,
          msg: 'success',
          data: goods
        })
      })
      app.get('/api/ratings', function (req, res) {
        res.json({
          error: 0,
          msg: 'success',
          data: ratings
        })
      })
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack (config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('api', resolve('src/api'))

    config.plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }
}

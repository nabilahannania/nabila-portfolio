const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/nabila-portfolio/',
  
  transpileDependencies: [
    'quasar'
  ],

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})

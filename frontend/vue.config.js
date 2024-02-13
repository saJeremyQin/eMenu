const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:'http://localhost:8000'           //with this configuration, avoid using cors on the server
  }
})


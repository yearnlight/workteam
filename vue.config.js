'use strict'
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/work',
    lintOnSave: false,
    devServer: {
        https: false,
        proxy: {
            '^/(task|auth|doc|event|host|project|regular|server-config|store|user|demand)': {
                // target: 'http://81.68.200.164:4001/',//订单接口
                target: 'http://localhost:4001/',//订单接口
                ws: true,
                changOrigin: true,
            },
            '^/(socket.io)': {
                // target: 'http://81.68.200.164:4001/',//订单接口
                target: 'http://localhost:4002/',//订单接口
                ws: true,
                changOrigin: true,
            }
        }
    },
    chainWebpack(config) {
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()
    }
}
module.exports = {
    publicPath: '/work',
    lintOnSave: false,
    devServer: {
        https: false,
        proxy: {
            '^/(task)': {
                // target: 'http://120.77.220.70:4001/',//订单接口
                target: 'http://localhost:4001/',//订单接口
                ws: true,
                changOrigin: true,
            }
        }
    }
}
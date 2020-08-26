module.exports = {
    publicPath: '/work',
    lintOnSave: false,
    devServer: {
        https: false,
        proxy: {
            '^/(task)': {
                target: 'http://localhost:4001/',//订单接口
                ws: true,
                changOrigin: true,
            }
        }
    }
}
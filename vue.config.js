module.exports = {
    publicPath: '/work',
    lintOnSave: false,
    devServer: {
        https: false,
        proxy: {
            '^/(sys)': {
                target: 'http://139.155.203.208:8080/',//订单接口
                ws: true,
                changOrigin: true,
            }
        }
    }
}
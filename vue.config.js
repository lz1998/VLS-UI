module.exports = {
    publicPath:'./',
    productionSourceMap:false,
    assetsDir:'static',
    devServer:{
        proxy:"http://127.0.0.1/"
    }
}

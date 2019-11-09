module.exports = {
    publicPath:'./',
    productionSourceMap:false,
    assetsDir:'static',
    devServer:{
        proxy:"http://192.168.31.134/"
    }
}

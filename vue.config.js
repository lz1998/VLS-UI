module.exports = {
    publicPath:'./',
    productionSourceMap:false,
    assetsDir:'static',
    devServer:{
        proxy:"http://vls.lz1998.xin:80/"
    }
}

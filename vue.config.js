module.exports = {
    publicPath:'./',
    productionSourceMap:false,
    assetsDir:'static',
    devServer:{
        proxy:"http://pi.lz1998.xin:50003/"
    }
}

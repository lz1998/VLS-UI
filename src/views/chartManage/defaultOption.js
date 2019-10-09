export const chartDefaultOption={
    title:{
        desc:'标题组件，包含主标题和副标题',
        show:()=>{return{default:true, desc:'是否显示标题组件'}},
        text:()=>{return{default:'主标题', desc:'主标题文本'}},
        textStyle:{
            desc:'主标题文本样式',
            color:()=>{return{default:'red', desc:'主标题文字的颜色'}},
            fontStyle:()=>{return{default:'normal', desc:'主标题文字字体的风格'}},
            fontWeight:()=>{return{default:'normal', desc:'主标题文字字体的粗细'}},
            fontSize:()=>{return{default:18, desc:'主标题文字的字体大小'}},
            lineHeight:()=>{return{default:56, desc:'行高'}}
        },
        subText:()=>{return{default:'副标题', desc:'副标题文本'}},
        subtextStyle:{
            desc:'副标题文本样式',
            color:()=>{return{default:'white', desc:'副标题文字的颜色'}},
            fontStyle:()=>{return{default:'normal', desc:'副标题文字字体的风格'}},
            fontWeight:()=>{return{default:'normal', desc:'副标题文字字体的粗细'}},
            fontSize:()=>{return{default:12, desc:'副标题文字的字体大小'}},
            lineHeight:()=>{return{default:56, desc:'行高'}}
        },
        textAlign:()=>{return{default:'auto', desc:'整体的水平对齐'}},
        padding:()=>{return{default:5, desc:'标题内边距，单位px'}},
        left:()=>{return{default:'auto', desc:'grid 组件离容器左侧的距离'}},
        top:()=>{return{default:'auto', desc:'grid 组件离容器上侧的距离'}},
        right:()=>{return{default:'auto', desc:'grid 组件离容器右侧的距离'}},
        bottom:()=>{return{default:'auto', desc:'grid 组件离容器下侧的距离'}},
        backgroundColor:()=>{return{default:'transparent', desc:'标题背景色'}},
        borderColor:()=>{return{default:'#ccc', desc:'标题的边框颜色'}},
        borderWidth:()=>{return{default:0, desc:'标题的边框线宽'}},
        borderRadius:()=>{return{default:0, desc:'圆角半径'}}
    },
    legend:{
        desc:'图例组件',
        show:()=>{return{default:true, desc:'是否显示图例组件'}},
        left:()=>{return{default:'auto', desc:'图例组件离容器左侧的距离'}},
        top:()=>{return{default:'auto', desc:'图例组件离容器上侧的距离'}},
        right:()=>{return{default:'auto', desc:'图例组件离容器右侧的距离'}},
        bottom:()=>{return{default:'auto', desc:'图例组件离容器下侧的距离'}},
        width:()=>{return{default:'auto', desc:'图例组件的宽度'}},
        height:()=>{return{default:'auto', desc:'图例组件的高度'}},
        orient:()=>{return{default:'horizontal', desc:'图例列表的布局朝向'}},
        align:()=>{return{default:'auto', desc:'图例标记和文本的对齐'}},
        padding:()=>{return{default:5, desc:'图例内边距，单位px'}},
        itemGap:()=>{return{default:10, desc:'图例每项之间的间隔'}},
        itemWidth:()=>{return{default:25, desc:'图例标记的图形宽度'}},
        itemHeight:()=>{return{default:14, desc:'图例标记的图形高度'}},
        textStyle:{
            desc:'图例的公用文本样式',
            color:()=>{return{default:'#333', desc:'文字的颜色'}},
            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格'}},
            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细'}},
            fontSize:()=>{return{default:12, desc:'文字的字体大小'}},
            lineHeight:()=>{return{default:56, desc:'行高'}}
        },
        icon:()=>{return{default:'circle', desc:'图例项的 icon'}},
        backgroundColor:()=>{return{default:'transparent', desc:'图例背景色'}},
        borderColor:()=>{return{default:'#ccc', desc:'图例的边框颜色'}},
        borderWidth:()=>{return{default:1, desc:'图例的边框线宽'}},
        borderRadius:()=>{return{default:0, desc:'圆角半径，单位px'}}
    },
    grid:{
        desc:'直角坐标系内绘图网格组件',
        show:()=>{return{default:false, desc:'是否显示直角坐标系网格'}},
        left:()=>{return{default:'10%', desc:'组件离容器左侧的距离'}},
        top:()=>{return{default:60, desc:'组件离容器上侧的距离'}},
        right:()=>{return{default:'10%', desc:'组件离容器右侧的距离'}},
        bottom:()=>{return{default:60, desc:'组件离容器下侧的距离'}},
        width:()=>{return{default:'auto', desc:'组件的宽度'}},
        height:()=>{return{default:'auto', desc:'组件的高度'}},
        backgroundColor:()=>{return{default:'transparent', desc:'网格背景色'}},
        borderColor:()=>{return{default:'#ccc', desc:'网格的边框颜色'}},
        borderWidth:()=>{return{default:1, desc:'网格的边框线宽'}}
    },
    xAxis:{
        desc:'直角坐标系 grid 中的 x 轴',
        show:()=>{return{default:true, desc:'是否显示 x 轴'}},
        position:()=>{return{default:'bottom', desc:'x 轴的位置'}},
        type:()=>{return{default:'category', desc:'坐标轴类型'}},
        name:()=>{return{default:'', desc:'坐标轴名称'}},
        nameLocation:()=>{return{default:'end', desc:'坐标轴名称显示位置'}},
        nameTextStyle:{
            desc:'坐标轴名称的文字样式',
            color:()=>{return{default:'white', desc:'坐标轴名称的颜色'}},
            fontStyle:()=>{return{default:'normal', desc:'坐标轴名称文字字体的风格'}},
            fontWeight:()=>{return{default:'normal', desc:'坐标轴名称文字字体的粗细'}},
            fontSize:()=>{return{default:12, desc:'坐标轴名称文字的字体大小'}},
            lineHeight:()=>{return{default:56, desc:'行高'}}
        },
        nameGap:()=>{return{default:15, desc:'坐标轴名称与轴线之间的距离'}},
        splitNumber:()=>{return{default:5, desc:'坐标轴的分割段数'}},
        axisLine:{
            desc:'坐标轴轴线相关设置',
            show:()=>{return{default:true, desc:'是否显示坐标轴轴线'}},
            symbol:()=>{return{default:'none', desc:'轴线两边的箭头'}},
            symbolSize:()=>{return{default:[10, 15], desc:'轴线两边的箭头的大小'}},
            symbolOffset:()=>{return{default:[0, 0] , desc:'轴线两边的箭头的偏移'}},
            lineStyle:{
                desc:'线条样式',
                color:()=>{return{default:'#333', desc:'轴线颜色'}},
                width:()=>{return{default:1, desc:'轴线宽度'}},
                type:()=>{return{default:'solid', desc:'轴线类型'}}
            }
        },
        axisTick:{
            desc:'坐标轴刻度相关设置',
            show:()=>{return{default:true, desc:'是否显示坐标轴刻度'}},
            interval:()=>{return{default:'auto', desc:'坐标轴刻度的显示间隔'}},
            inside:()=>{return{default:'false', desc:'坐标轴刻度是否朝内'}},
            length:()=>{return{default:5, desc:'坐标轴刻度的长度'}},
            lineStyle:{
                desc:'线条样式',
                color:()=>{return{default:'#333', desc:'刻度线的颜色'}},
                width:()=>{return{default:1, desc:'坐标轴刻度线宽'}},
                type:()=>{return{default:'solid', desc:'坐标轴刻度线的类型'}}
            }
        },
        axisLabel:{
            desc:'坐标轴刻度标签的相关设置',
            show:()=>{return{default:true, desc:'是否显示刻度标签'}},
            interval:()=>{return{default:'auto', desc:'坐标轴刻度标签的显示间隔'}},
            inside:()=>{return{default:false, desc:'刻度标签是否朝内，默认朝外'}},
            rotate:()=>{return{default:0, desc:'刻度标签旋转的角度'}},
            margin:()=>{return{default:8, desc:'刻度标签与轴线之间的距离'}},
            color:()=>{return{default:'white', desc:'刻度标签文字的颜色'}},
            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格'}},
            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细'}},
            fontSize:()=>{return{default:12, desc:'文字的字体大小'}},
            lineHeight:()=>{return{default:56, desc:'行高'}},
            backgroundColor:()=>{return{default:'transparent', desc:'文字块背景色'}},
            borderColor:()=>{return{default:'transparent', desc:'文字块边框颜色'}},
            borderWidth:()=>{return{default:0, desc:'文字块边框宽度'}},
            borderRadius:()=>{return{default:0, desc:'文字块的圆角'}},
            padding:()=>{return{default:0, desc:'文字块的内边距'}}
        }
    },
    yAxis:{
        desc:'直角坐标系 grid 中的 y 轴',
        show:()=>{return{default:true, desc:'是否显示 y 轴'}},
        position:()=>{return{default:'left', desc:'y 轴的位置'}},
        type:()=>{return{default:'value', desc:'坐标轴类型'}},
        name:()=>{return{default:'xx', desc:'坐标轴名称'}},
        nameLocation:()=>{return{default:'end', desc:'坐标轴名称显示位置'}},
        nameTextStyle:{
            desc:'坐标轴名称的文字样式',
            color:()=>{return{default:'white', desc:'坐标轴名称的颜色'}},
            fontStyle:()=>{return{default:'normal', desc:'坐标轴名称文字字体的风格'}},
            fontWeight:()=>{return{default:'normal', desc:'坐标轴名称文字字体的粗细'}},
            fontSize:()=>{return{default:12, desc:'坐标轴名称文字的字体大小'}},
            lineHeight:()=>{return{default:56, desc:'行高'}}
        },
        nameGap:()=>{return{default:15, desc:'x坐标轴名称与轴线之间的距离'}},
        splitNumber:()=>{return{default:5, desc:'坐标轴的分割段数'}},
        axisLine:{
            desc:'坐标轴轴线相关设置',
            show:()=>{return{default:true, desc:'是否显示坐标轴轴线'}},
            symbol:()=>{return{default:'none', desc:'轴线两边的箭头'}},
            symbolSize:()=>{return{default:[10, 15], desc:'轴线两边的箭头的大小'}},
            symbolOffset:()=>{return{default:[0, 0] , desc:'轴线两边的箭头的偏移'}},
            lineStyle:{
                desc:'轴线样式',
                color:()=>{return{default:'#333', desc:'轴线颜色'}},
                width:()=>{return{default:1, desc:'轴线宽度'}},
                type:()=>{return{default:'solid', desc:'轴线类型'}}
            }
        },
        axisTick:{
            desc:'坐标轴刻度相关设置',
            show:()=>{return{default:true, desc:'是否显示坐标轴刻度'}},
            interval:()=>{return{default:'auto', desc:'坐标轴刻度的显示间隔'}},
            inside:()=>{return{default:false, desc:'坐标轴刻度是否朝内，默认朝外'}},
            length:()=>{return{default:5, desc:'坐标轴刻度的长度'}},
            lineStyle:{
                desc:'线条样式',
                color:()=>{return{default:'#333', desc:'刻度线的颜色'}},
                width:()=>{return{default:1, desc:'坐标轴刻度线宽'}},
                type:()=>{return{default:'solid', desc:'坐标轴刻度线的类型'}}
            }
        },
        axisLabel:{
            desc:'坐标轴刻度标签的相关设置',
            show:()=>{return{default:true, desc:'是否显示刻度标签'}},
            interval:()=>{return{default:'auto', desc:'坐标轴刻度标签的显示间隔'}},
            inside:()=>{return{default:false, desc:'刻度标签是否朝内，默认朝外'}},
            rotate:()=>{return{default:0, desc:'刻度标签旋转的角度'}},
            margin:()=>{return{default:8 , desc:'刻度标签与轴线之间的距离'}},
            color:()=>{return{default:'white', desc:'刻度标签文字的颜色'}},
            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格'}},
            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细'}},
            fontSize:()=>{return{default:12, desc:'文字的字体大小'}},
            lineHeight:()=>{return{default:56, desc:'行高'}},
            backgroundColor:()=>{return{default:'transparent', desc:'文字块背景色'}},
            borderColor:()=>{return{default:'transparent', desc:'文字块边框颜色'}},
            borderWidth:()=>{return{default:0, desc:'文字块边框颜色'}},
            borderRadius:()=>{return{default:0, desc:'文字块的圆角'}},
            padding:()=>{return{default:0, desc:'文字块的内边距'}}
        }
    },
    backgroundColor:()=>{return{default:'', desc:'背景色'}},
    series:()=>{
        return{
            desc:"图形",
            default:[]
        }
    }
}
export const lineSeriesDefaultOption={
    desc:'折线',
    type:()=>{return{desc:'类型',default:'line'}},// TODO 不可改
    symbol:()=>{return{desc:'标记的图形',default:'emptyCircle'}},
    symbolSize:()=>{return{desc:'标记的大小',default:4}},
    symbolKeepAspect:()=>{return{desc:'缩放时保持图形长宽比',default:false}},
    showSymbol:()=>{return{desc:'是否显示标记',default:true}},
    showAllSymbol:()=>{return{desc:'是否显示全部标记',default:'auto'}},
    hoverAnimation:()=>{return{desc:'开启鼠标悬浮动画',default:true}},
    connectNulls:()=>{return{desc:'是否连接空数据',default:false}},
    clipOverflow:()=>{return{desc:'是否对超出部分裁剪',default:true}},
    step:()=>{return{desc:'是否是阶梯线图',default:false}},
    // label暂时不想做，以后可以考虑
    itemStyle:{
        desc:'折线拐点标志的样式',
        color:()=>{return{desc:'图形的颜色',default:'自适应'}},// TODO ???
        borderColor:()=>{return{desc:'图形的描边颜色',default:'#000'}},
        borderWidth:()=>{return{desc:'描边线宽',default:0}},
        borderType:()=>{return{desc:'柱条的描边类型',default:'solid'}},
        opacity:()=>{return{desc:'图形透明度',default:1}}
    },
    lineStyle:{
        desc:'线条样式',
        color:()=>{return{desc:'线的颜色',default:'#000'}},
        width:()=>{return{desc:'线宽',default:2}},
        type:()=>{return{desc:'线的类型',default:'solid'}},
        opacity:()=>{return{desc:'图形透明度',default:1}}
    },
    areaStyle:{
        desc:'区域填充样式',
        color:()=>{return{desc:'填充的颜色',default:'#000'}},
        origin:()=>{return{desc:'图形区域的起始位置',default:'auto'}},
        opacity:()=>{return{desc:'图形透明度',default:1}}
    },
    // emphasis暂行不想做
    smooth:()=>{return{desc:'是否平滑曲线显示',default:false}},
    // TODO dimensions看上去很重要，但是没看懂，暂时不管
    // TODO encode看上去很重要，但是没看懂，暂时不管
    seriesLayoutBy:()=>{return{desc:'数据按行还是列',default:'column'}},
    // TODO datasetIndex看上去很重要，但是没看懂，暂时不管
    // TODO markPoint 不太好做，暂时不做
    // TODO markLine 不太好做，暂时不做
    silent:()=>{return{desc:'不响应和触发鼠标事件',default:false}},
    animation:()=>{return{desc:'是否开启动画',default:true}},
    animationThreshold:()=>{return{desc:'动画的阈值',default:2000}},
    animationDuration:()=>{return{desc:'初始动画的时长',default:1000}},
    animationEasing:()=>{return{desc:'初始动画的缓动效果',default:'linear'}},
    animationDelay:()=>{return{desc:'初始动画的延迟',default:0}},
    animationDurationUpdate:()=>{return{desc:'数据更新动画的时长',default:300}},
    animationDelayUpdate:()=>{return{desc:'数据更新动画的延迟',default:0}},
    // tooltip:{desc:'提示框'} TODO 不好做，暂时不做
}
export const barSeriesDefaultOption={
    desc:'柱子',
    type:()=>{return{desc:'类型',default:'bar'}},// TODO 不可改
    legendHoverLink:()=>{return{desc:'是否启用图例 hover 时的联动高亮',default:'true'}},
    coordinateSystem:()=>{return{desc:'该系列使用的坐标系',default:'cartesian2d'}},
    xAxisIndex:()=>{return{desc:'使用的 x 轴的 index',default:0}},
    yAxisIndex:()=>{return{desc:'使用的 y 轴的 index',default:0}},
    itemStyle:{
        desc:'图形样式',
        color:()=>{return{desc:'柱条的颜色',default:'自适应'}},// TODO ???
        borderColor:()=>{return{desc:'柱条的描边颜色',default:'#000'}},
        borderWidth:()=>{return{desc:'柱条的描边宽度',default:0}},
        borderType:()=>{return{desc:'柱条的描边类型',default:'solid'}},
        barBorderRadius:()=>{return{desc:'圆角半径',default:0}},
        shadowBlur:()=>{return{desc:'图形阴影的模糊大小',default:10}},
        shadowColor:()=>{return{desc:'阴影颜色',default:'#000'}},
        shadowOffsetX:()=>{return{desc:'阴影水平方向上的偏移距离',default:0}},
        shadowOffsetY:()=>{return{desc:'阴影垂直方向上的偏移距离',default:0}},
        opacity:()=>{return{desc:'图形透明度',default:1}},

    },
    //stack:()=>{return{desc:'数据堆叠',default:null}},
    cursor:()=>{return{desc:'鼠标悬浮时在图形元素上时鼠标的样式是什么',default:'pointer'}},
    barWidth:()=>{return{desc:'柱条的宽度',default:'自适应'}},
    barMaxWidth:()=>{return{desc:'柱条最大宽度',default:'自适应'}},
    barMinHeight:()=>{return{desc:'柱条最小高度',default:0}},
    barGap:()=>{return{desc:'不同系列的柱间距离',default:"30%"}},
    barCategoryGap:()=>{return{desc:'同一系列的柱间距离',default:'20%'}},
    large:()=>{return{desc:'是否开启大数据量优化',default:false}},
    largeThreshold:()=>{return{desc:'开启绘制优化的阈值',default:400}},
    progressive:()=>{return{desc:'渐进式渲染时每一帧绘制图形数量',default:5000}},
    animation:()=>{return{desc:'是否开启动画',default:'true'}},
    animationThreshold:()=>{return{desc:'是否开启动画的阈值',default:2000}},
    animationDuration:()=>{return{desc:'同一系列的柱间距离',default:1000}},
    animationEasing:()=>{return{desc:'初始动画的缓动效果',default:'cubicOut'}},
    animationDelay:()=>{return{desc:'初始动画的延迟',default:0}},
    animationDurationUpdate:()=>{return{desc:'数据更新动画的时长',default:300}},
    animationEasingUpdate:()=>{return{desc:'数据更新动画的缓动效果',default:'cubicOut'}},
    animationDelayUpdate:()=>{return{desc:'数据更新动画的延迟',default:0}},
}

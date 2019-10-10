export const chartDefaultOption={
    title:{
        desc:'标题组件，包含主标题和副标题',
        show:()=>{return{default:true, desc:'是否显示标题组件',inputType:'text'}},
        text:()=>{return{default:'主标题', desc:'主标题文本',inputType:'text'}},
        textStyle:{
            desc:'主标题文本样式',
            color:()=>{return{default:'red', desc:'主标题文字的颜色',inputType:'color'}},
            fontStyle:()=>{return{default:'normal', desc:'主标题文字字体的风格',inputType:'text'}},
            fontWeight:()=>{return{default:'normal', desc:'主标题文字字体的粗细',inputType:'text'}},
            fontSize:()=>{return{default:18, desc:'主标题文字的字体大小',inputType:'text'}},
            lineHeight:()=>{return{default:56, desc:'行高',inputType:'text'}}
        },
        subText:()=>{return{default:'副标题', desc:'副标题文本',inputType:'text'}},
        subtextStyle:{
            desc:'副标题文本样式',
            color:()=>{return{default:'white', desc:'副标题文字的颜色',inputType:'color'}},
            fontStyle:()=>{return{default:'normal', desc:'副标题文字字体的风格',inputType:'text'}},
            fontWeight:()=>{return{default:'normal', desc:'副标题文字字体的粗细',inputType:'text'}},
            fontSize:()=>{return{default:12, desc:'副标题文字的字体大小',inputType:'text'}},
            lineHeight:()=>{return{default:56, desc:'行高',inputType:'text'}}
        },
        textAlign:()=>{return{default:'auto', desc:'整体的水平对齐',inputType:'text'}},
        padding:()=>{return{default:5, desc:'标题内边距，单位px',inputType:'text'}},
        left:()=>{return{default:'auto', desc:'grid 组件离容器左侧的距离',inputType:'text'}},
        top:()=>{return{default:'auto', desc:'grid 组件离容器上侧的距离',inputType:'text'}},
        right:()=>{return{default:'auto', desc:'grid 组件离容器右侧的距离',inputType:'text'}},
        bottom:()=>{return{default:'auto', desc:'grid 组件离容器下侧的距离',inputType:'text'}},
        backgroundColor:()=>{return{default:'transparent', desc:'标题背景色',inputType:'color'}},
        borderColor:()=>{return{default:'#ccc', desc:'标题的边框颜色',inputType:'color'}},
        borderWidth:()=>{return{default:0, desc:'标题的边框线宽',inputType:'text'}},
        borderRadius:()=>{return{default:0, desc:'圆角半径',inputType:'text'}}
    },
    legend:{
        desc:'图例组件',
        show:()=>{return{default:true, desc:'是否显示图例组件',inputType:'text'}},
        left:()=>{return{default:'auto', desc:'图例组件离容器左侧的距离',inputType:'text'}},
        top:()=>{return{default:'auto', desc:'图例组件离容器上侧的距离',inputType:'text'}},
        right:()=>{return{default:'auto', desc:'图例组件离容器右侧的距离',inputType:'text'}},
        bottom:()=>{return{default:'auto', desc:'图例组件离容器下侧的距离',inputType:'text'}},
        width:()=>{return{default:'auto', desc:'图例组件的宽度',inputType:'text'}},
        height:()=>{return{default:'auto', desc:'图例组件的高度',inputType:'text'}},
        orient:()=>{return{default:'horizontal', desc:'图例列表的布局朝向',inputType:'text'}},
        align:()=>{return{default:'auto', desc:'图例标记和文本的对齐',inputType:'text'}},
        padding:()=>{return{default:5, desc:'图例内边距，单位px',inputType:'text'}},
        itemGap:()=>{return{default:10, desc:'图例每项之间的间隔',inputType:'text'}},
        itemWidth:()=>{return{default:25, desc:'图例标记的图形宽度',inputType:'text'}},
        itemHeight:()=>{return{default:14, desc:'图例标记的图形高度',inputType:'text'}},
        textStyle:{
            desc:'图例的公用文本样式',
            color:()=>{return{default:'#333', desc:'文字的颜色',inputType:'color'}},
            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格',inputType:'text'}},
            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细',inputType:'text'}},
            fontSize:()=>{return{default:12, desc:'文字的字体大小',inputType:'text'}},
            lineHeight:()=>{return{default:56, desc:'行高',inputType:'text'}}
        },
        icon:()=>{return{default:'circle', desc:'图例项的 icon',inputType:'text'}},
        backgroundColor:()=>{return{default:'transparent', desc:'图例背景色',inputType:'color'}},
        borderColor:()=>{return{default:'#ccc', desc:'图例的边框颜色',inputType:'color'}},
        borderWidth:()=>{return{default:1, desc:'图例的边框线宽',inputType:'text'}},
        borderRadius:()=>{return{default:0, desc:'圆角半径，单位px',inputType:'text'}}
    },
    grid:{
        desc:'直角坐标系内绘图网格组件',
        show:()=>{return{default:false, desc:'是否显示直角坐标系网格',inputType:'text'}},
        left:()=>{return{default:'10%', desc:'组件离容器左侧的距离',inputType:'text'}},
        top:()=>{return{default:60, desc:'组件离容器上侧的距离',inputType:'text'}},
        right:()=>{return{default:'10%', desc:'组件离容器右侧的距离',inputType:'text'}},
        bottom:()=>{return{default:60, desc:'组件离容器下侧的距离',inputType:'text'}},
        width:()=>{return{default:'auto', desc:'组件的宽度',inputType:'text'}},
        height:()=>{return{default:'auto', desc:'组件的高度',inputType:'text'}},
        backgroundColor:()=>{return{default:'transparent', desc:'网格背景色',inputType:'color'}},
        borderColor:()=>{return{default:'#ccc', desc:'网格的边框颜色',inputType:'color'}},
        borderWidth:()=>{return{default:1, desc:'网格的边框线宽',inputType:'text'}}
    },
    xAxis:{
        desc:'直角坐标系 grid 中的 x 轴',
        show:()=>{return{default:true, desc:'是否显示 x 轴',inputType:'text'}},
        position:()=>{return{default:'bottom', desc:'x 轴的位置',inputType:'text'}},
        type:()=>{return{default:'category', desc:'坐标轴类型',inputType:'text'}},
        name:()=>{return{default:'', desc:'坐标轴名称',inputType:'text'}},
        nameLocation:()=>{return{default:'end', desc:'坐标轴名称显示位置',inputType:'text'}},
        nameTextStyle:{
            desc:'坐标轴名称的文字样式',
            color:()=>{return{default:'white', desc:'坐标轴名称的颜色',inputType:'color'}},
            fontStyle:()=>{return{default:'normal', desc:'坐标轴名称文字字体的风格',inputType:'text'}},
            fontWeight:()=>{return{default:'normal', desc:'坐标轴名称文字字体的粗细',inputType:'text'}},
            fontSize:()=>{return{default:12, desc:'坐标轴名称文字的字体大小',inputType:'text'}},
            lineHeight:()=>{return{default:56, desc:'行高',inputType:'text'}}
        },
        nameGap:()=>{return{default:15, desc:'坐标轴名称与轴线之间的距离',inputType:'text'}},
        splitNumber:()=>{return{default:5, desc:'坐标轴的分割段数',inputType:'text'}},
        axisLine:{
            desc:'坐标轴轴线相关设置',
            show:()=>{return{default:true, desc:'是否显示坐标轴轴线',inputType:'text'}},
            symbol:()=>{return{default:'none', desc:'轴线两边的箭头',inputType:'text'}},
            symbolSize:()=>{return{default:[10, 15], desc:'轴线两边的箭头的大小',inputType:'text'}},
            symbolOffset:()=>{return{default:[0, 0] , desc:'轴线两边的箭头的偏移',inputType:'text'}},
            lineStyle:{
                desc:'线条样式',
                color:()=>{return{default:'#333', desc:'轴线颜色',inputType:'color'}},
                width:()=>{return{default:1, desc:'轴线宽度',inputType:'text'}},
                type:()=>{return{default:'solid', desc:'轴线类型',inputType:'text'}}
            }
        },
        axisTick:{
            desc:'坐标轴刻度相关设置',
            show:()=>{return{default:true, desc:'是否显示坐标轴刻度',inputType:'text'}},
            interval:()=>{return{default:'auto', desc:'坐标轴刻度的显示间隔',inputType:'text'}},
            inside:()=>{return{default:'false', desc:'坐标轴刻度是否朝内',inputType:'text'}},
            length:()=>{return{default:5, desc:'坐标轴刻度的长度',inputType:'text'}},
            lineStyle:{
                desc:'线条样式',
                color:()=>{return{default:'#333', desc:'刻度线的颜色',inputType:'color'}},
                width:()=>{return{default:1, desc:'坐标轴刻度线宽',inputType:'text'}},
                type:()=>{return{default:'solid', desc:'坐标轴刻度线的类型',inputType:'text'}}
            }
        },
        axisLabel:{
            desc:'坐标轴刻度标签的相关设置',
            show:()=>{return{default:true, desc:'是否显示刻度标签',inputType:'text'}},
            interval:()=>{return{default:'auto', desc:'坐标轴刻度标签的显示间隔',inputType:'text'}},
            inside:()=>{return{default:false, desc:'刻度标签是否朝内，默认朝外',inputType:'text'}},
            rotate:()=>{return{default:0, desc:'刻度标签旋转的角度',inputType:'text'}},
            margin:()=>{return{default:8, desc:'刻度标签与轴线之间的距离',inputType:'text'}},
            color:()=>{return{default:'white', desc:'刻度标签文字的颜色',inputType:'color'}},
            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格',inputType:'text'}},
            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细',inputType:'text'}},
            fontSize:()=>{return{default:12, desc:'文字的字体大小',inputType:'text'}},
            lineHeight:()=>{return{default:56, desc:'行高',inputType:'text'}},
            backgroundColor:()=>{return{default:'transparent', desc:'文字块背景色',inputType:'color'}},
            borderColor:()=>{return{default:'transparent', desc:'文字块边框颜色',inputType:'color'}},
            borderWidth:()=>{return{default:0, desc:'文字块边框宽度',inputType:'text'}},
            borderRadius:()=>{return{default:0, desc:'文字块的圆角',inputType:'text'}},
            padding:()=>{return{default:0, desc:'文字块的内边距',inputType:'text'}}
        }
    },
    yAxis:{
        desc:'直角坐标系 grid 中的 y 轴',
        show:()=>{return{default:true, desc:'是否显示 y 轴',inputType:'text'}},
        position:()=>{return{default:'left', desc:'y 轴的位置',inputType:'text'}},
        type:()=>{return{default:'value', desc:'坐标轴类型',inputType:'text'}},
        name:()=>{return{default:'xx', desc:'坐标轴名称',inputType:'text'}},
        nameLocation:()=>{return{default:'end', desc:'坐标轴名称显示位置',inputType:'text'}},
        nameTextStyle:{
            desc:'坐标轴名称的文字样式',
            color:()=>{return{default:'white', desc:'坐标轴名称的颜色',inputType:'color'}},
            fontStyle:()=>{return{default:'normal', desc:'坐标轴名称文字字体的风格',inputType:'text'}},
            fontWeight:()=>{return{default:'normal', desc:'坐标轴名称文字字体的粗细',inputType:'text'}},
            fontSize:()=>{return{default:12, desc:'坐标轴名称文字的字体大小',inputType:'text'}},
            lineHeight:()=>{return{default:56, desc:'行高',inputType:'text'}}
        },
        nameGap:()=>{return{default:15, desc:'x坐标轴名称与轴线之间的距离',inputType:'text'}},
        splitNumber:()=>{return{default:5, desc:'坐标轴的分割段数',inputType:'text'}},
        axisLine:{
            desc:'坐标轴轴线相关设置',
            show:()=>{return{default:true, desc:'是否显示坐标轴轴线',inputType:'text'}},
            symbol:()=>{return{default:'none', desc:'轴线两边的箭头',inputType:'text'}},
            symbolSize:()=>{return{default:[10, 15], desc:'轴线两边的箭头的大小',inputType:'text'}},
            symbolOffset:()=>{return{default:[0, 0] , desc:'轴线两边的箭头的偏移',inputType:'text'}},
            lineStyle:{
                desc:'轴线样式',
                color:()=>{return{default:'#333', desc:'轴线颜色',inputType:'color'}},
                width:()=>{return{default:1, desc:'轴线宽度',inputType:'text'}},
                type:()=>{return{default:'solid', desc:'轴线类型',inputType:'text'}}
            }
        },
        axisTick:{
            desc:'坐标轴刻度相关设置',
            show:()=>{return{default:true, desc:'是否显示坐标轴刻度',inputType:'text'}},
            interval:()=>{return{default:'auto', desc:'坐标轴刻度的显示间隔',inputType:'text'}},
            inside:()=>{return{default:false, desc:'坐标轴刻度是否朝内，默认朝外',inputType:'text'}},
            length:()=>{return{default:5, desc:'坐标轴刻度的长度',inputType:'text'}},
            lineStyle:{
                desc:'线条样式',
                color:()=>{return{default:'#333', desc:'刻度线的颜色',inputType:'color'}},
                width:()=>{return{default:1, desc:'坐标轴刻度线宽',inputType:'text'}},
                type:()=>{return{default:'solid', desc:'坐标轴刻度线的类型',inputType:'text'}}
            }
        },
        axisLabel:{
            desc:'坐标轴刻度标签的相关设置',
            show:()=>{return{default:true, desc:'是否显示刻度标签',inputType:'text'}},
            interval:()=>{return{default:'auto', desc:'坐标轴刻度标签的显示间隔',inputType:'text'}},
            inside:()=>{return{default:false, desc:'刻度标签是否朝内，默认朝外',inputType:'text'}},
            rotate:()=>{return{default:0, desc:'刻度标签旋转的角度',inputType:'text'}},
            margin:()=>{return{default:8 , desc:'刻度标签与轴线之间的距离',inputType:'text'}},
            color:()=>{return{default:'white', desc:'刻度标签文字的颜色',inputType:'color'}},
            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格',inputType:'text'}},
            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细',inputType:'text'}},
            fontSize:()=>{return{default:12, desc:'文字的字体大小',inputType:'text'}},
            lineHeight:()=>{return{default:56, desc:'行高',inputType:'text'}},
            backgroundColor:()=>{return{default:'transparent', desc:'文字块背景色',inputType:'color'}},
            borderColor:()=>{return{default:'transparent', desc:'文字块边框颜色',inputType:'color'}},
            borderWidth:()=>{return{default:0, desc:'文字块边框颜色',inputType:'text'}},
            borderRadius:()=>{return{default:0, desc:'文字块的圆角',inputType:'text'}},
            padding:()=>{return{default:0, desc:'文字块的内边距',inputType:'text'}}
        }
    },
    backgroundColor:()=>{return{default:'', desc:'背景色',inputType:'color'}},
    series:()=>{
        return{
            desc:"图形",
            default:[]
        }
    }
}
export const lineSeriesDefaultOption={
    desc:'折线',
    type:()=>{return{desc:'类型',default:'line',inputType:'uneditable'}},// TODO 不可改
    symbol:()=>{return{desc:'标记的图形',default:'emptyCircle',inputType:'text'}},
    symbolSize:()=>{return{desc:'标记的大小',default:4,inputType:'text'}},
    symbolKeepAspect:()=>{return{desc:'缩放时保持图形长宽比',default:false,inputType:'text'}},
    showSymbol:()=>{return{desc:'是否显示标记',default:true,inputType:'text'}},
    showAllSymbol:()=>{return{desc:'是否显示全部标记',default:'auto',inputType:'text'}},
    hoverAnimation:()=>{return{desc:'开启鼠标悬浮动画',default:true,inputType:'text'}},
    connectNulls:()=>{return{desc:'是否连接空数据',default:false,inputType:'text'}},
    clipOverflow:()=>{return{desc:'是否对超出部分裁剪',default:true,inputType:'text'}},
    step:()=>{return{desc:'是否是阶梯线图',default:false,inputType:'text'}},
    // label暂时不想做，以后可以考虑
    itemStyle:{
        desc:'折线拐点标志的样式',
        color:()=>{return{desc:'图形的颜色',default:'自适应',inputType:'color'}},// TODO ???
        borderColor:()=>{return{desc:'图形的描边颜色',default:'#000',inputType:'color'}},
        borderWidth:()=>{return{desc:'描边线宽',default:0,inputType:'text'}},
        borderType:()=>{return{desc:'柱条的描边类型',default:'solid',inputType:'text'}},
        opacity:()=>{return{desc:'图形透明度',default:1,inputType:'text'}}
    },
    lineStyle:{
        desc:'线条样式',
        color:()=>{return{desc:'线的颜色',default:'#000',inputType:'color'}},
        width:()=>{return{desc:'线宽',default:2,inputType:'text'}},
        type:()=>{return{desc:'线的类型',default:'solid',inputType:'text'}},
        opacity:()=>{return{desc:'图形透明度',default:1,inputType:'text'}}
    },
    areaStyle:{
        desc:'区域填充样式',
        color:()=>{return{desc:'填充的颜色',default:'#000',inputType:'color'}},
        origin:()=>{return{desc:'图形区域的起始位置',default:'auto',inputType:'text'}},
        opacity:()=>{return{desc:'图形透明度',default:1,inputType:'text'}}
    },
    // emphasis暂行不想做
    smooth:()=>{return{desc:'是否平滑曲线显示',default:false,inputType:'text'}},
    // TODO dimensions看上去很重要，但是没看懂，暂时不管
    // TODO encode看上去很重要，但是没看懂，暂时不管
    seriesLayoutBy:()=>{return{desc:'数据按行还是列',default:'column',inputType:'text'}},
    // TODO datasetIndex看上去很重要，但是没看懂，暂时不管
    // TODO markPoint 不太好做，暂时不做
    // TODO markLine 不太好做，暂时不做
    silent:()=>{return{desc:'不响应和触发鼠标事件',default:false,inputType:'text'}},
    animation:()=>{return{desc:'是否开启动画',default:true,inputType:'text'}},
    animationThreshold:()=>{return{desc:'动画的阈值',default:2000,inputType:'text'}},
    animationDuration:()=>{return{desc:'初始动画的时长',default:1000,inputType:'text'}},
    animationEasing:()=>{return{desc:'初始动画的缓动效果',default:'linear',inputType:'text'}},
    animationDelay:()=>{return{desc:'初始动画的延迟',default:0,inputType:'text'}},
    animationDurationUpdate:()=>{return{desc:'数据更新动画的时长',default:300,inputType:'text'}},
    animationDelayUpdate:()=>{return{desc:'数据更新动画的延迟',default:0,inputType:'text'}},
    // tooltip:{desc:'提示框'} TODO 不好做，暂时不做
}
export const barSeriesDefaultOption={
    desc:'柱子',
    type:()=>{return{desc:'类型',default:'bar',inputType:'uneditable'}},// TODO 不可改
    legendHoverLink:()=>{return{desc:'是否启用图例 hover 时的联动高亮',default:'true',inputType:'text'}},
    coordinateSystem:()=>{return{desc:'该系列使用的坐标系',default:'cartesian2d',inputType:'text'}},
    xAxisIndex:()=>{return{desc:'使用的 x 轴的 index',default:0,inputType:'text'}},
    yAxisIndex:()=>{return{desc:'使用的 y 轴的 index',default:0,inputType:'text'}},
    itemStyle:{
        desc:'图形样式',
        color:()=>{return{desc:'柱条的颜色',default:'自适应',inputType:'color'}},// TODO ???
        borderColor:()=>{return{desc:'柱条的描边颜色',default:'#000',inputType:'color'}},
        borderWidth:()=>{return{desc:'柱条的描边宽度',default:0,inputType:'text'}},
        borderType:()=>{return{desc:'柱条的描边类型',default:'solid',inputType:'text'}},
        barBorderRadius:()=>{return{desc:'圆角半径',default:0,inputType:'text'}},
        shadowBlur:()=>{return{desc:'图形阴影的模糊大小',default:10,inputType:'text'}},
        shadowColor:()=>{return{desc:'阴影颜色',default:'#000',inputType:'color'}},
        shadowOffsetX:()=>{return{desc:'阴影水平方向上的偏移距离',default:0,inputType:'text'}},
        shadowOffsetY:()=>{return{desc:'阴影垂直方向上的偏移距离',default:0,inputType:'text'}},
        opacity:()=>{return{desc:'图形透明度',default:1,inputType:'text'}},

    },
    //stack:()=>{return{desc:'数据堆叠',default:null,inputType:'text'}},
    cursor:()=>{return{desc:'鼠标悬浮时在图形元素上时鼠标的样式是什么',default:'pointer',inputType:'text'}},
    barWidth:()=>{return{desc:'柱条的宽度',default:'自适应',inputType:'text'}},
    barMaxWidth:()=>{return{desc:'柱条最大宽度',default:'自适应',inputType:'text'}},
    barMinHeight:()=>{return{desc:'柱条最小高度',default:0,inputType:'text'}},
    barGap:()=>{return{desc:'不同系列的柱间距离',default:"30%",inputType:'text'}},
    barCategoryGap:()=>{return{desc:'同一系列的柱间距离',default:'20%',inputType:'text'}},
    large:()=>{return{desc:'是否开启大数据量优化',default:false,inputType:'text'}},
    largeThreshold:()=>{return{desc:'开启绘制优化的阈值',default:400,inputType:'text'}},
    progressive:()=>{return{desc:'渐进式渲染时每一帧绘制图形数量',default:5000,inputType:'text'}},
    animation:()=>{return{desc:'是否开启动画',default:'true',inputType:'text'}},
    animationThreshold:()=>{return{desc:'是否开启动画的阈值',default:2000,inputType:'text'}},
    animationDuration:()=>{return{desc:'同一系列的柱间距离',default:1000,inputType:'text'}},
    animationEasing:()=>{return{desc:'初始动画的缓动效果',default:'cubicOut',inputType:'text'}},
    animationDelay:()=>{return{desc:'初始动画的延迟',default:0,inputType:'text'}},
    animationDurationUpdate:()=>{return{desc:'数据更新动画的时长',default:300,inputType:'text'}},
    animationEasingUpdate:()=>{return{desc:'数据更新动画的缓动效果',default:'cubicOut',inputType:'text'}},
    animationDelayUpdate:()=>{return{desc:'数据更新动画的延迟',default:0,inputType:'text'}},
}

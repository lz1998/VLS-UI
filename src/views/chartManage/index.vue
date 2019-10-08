<template>
    <div class="chart-manage">

        <el-form :inline="true" :model="queryChartForm">
            <el-form-item label="图表标题">
                <el-input v-model="queryChartForm.title" placeholder="图表标题"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryChart">查询图表</el-button>
                <el-button type="primary" @click="showAddChartDialog">新增图表</el-button>
            </el-form-item>
        </el-form>

        <div class="chart-container">
            <div class="chart-item" v-for="(chartItem,index) in chartFormList">
                <div class="chart-title">
                    {{chartItem.title}}(id:{{chartItem.id}})
                </div>
                <div class="chart">
                    <chart
                            :options="chartItem.option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="manage">
                    <el-button type="primary" size="small" @click="showEditChartDialog(index)">编辑</el-button>
                    <el-button type="danger" size="small" @click="delChart(index)" >删除</el-button>
                </div>
            </div>
        </div>

        <!--新增/编辑图表对话框-->
        <el-dialog :model="chartForm" :visible.sync="chartDialogVisible" :title="isAddOperation?'新增图表':'编辑图表'">
            <el-form>
                <el-form-item :label-width="chartFormLabelWidth" label="图表标题">
                    <el-input v-model="chartForm.title"></el-input>
                </el-form-item>
                <el-form-item :label-width="chartFormLabelWidth" label="数据源URL">
                    <el-input></el-input>
                </el-form-item>
                <el-tree :data="optionTreeData" ref="optionTree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span style="width: 200px;display: inline-block;text-align: left;" @click="currentOptionDataId=node.id">{{data.desc}}</span>
                            <!--{{data.id}}-->
<!--                        {{data.label}}-->
<!--                        {{node.parent.parent.data.label}}-->
                        <!--叶子节点，非series，可编辑value-->
                        <span v-if="node.isLeaf && data.id!='series'">
                            <!--非series-->
                            <span v-if="currentOptionDataId!=node.id">{{data.value}}</span>
                            <span v-if="currentOptionDataId==node.id">
                                <input size="mini" v-model="data.value"></input>
                            </span>
                        </span>
                        <!--如果是series，有新增按钮-->
                        <span v-if="data.id=='series'">
                            <!--加上stop防止树形控件被点击到-->
                            <span class="btn-add" @click.stop="appendSeries(data)">添加</span>
                        </span>
                        <!--如果是series的子节点，有删除按钮-->
                        <span v-if="node.parent.data.id=='series'">
                            <span class="btn-del" @click.stop="deleteSeries(node,data)">删除</span>
                        </span>
                    </span>
                </el-tree>
                <el-form-item>
                    <el-button type="primary" @click="saveChart">保存</el-button>
                    <el-button @click="chartDialogVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import chartline from "@/components/chartline.vue"
    import {listChart,setChart,getChartsByTitleContaining,delChartById} from "@/api/chart.js"
    export default {
        name: "index",
        components:{
            chartline
        },
        data(){
            return{
                queryChartForm:{
                    title:""
                },
                chartFormList:[],

                isAddOperation:true, // true是新增，false是编辑
                chartDialogVisible:false, // 显示对话框
                chartFormLabelWidth:'120px',
                // TODO 模板内容需要抽出放入另一个js文件中
                defaultChartOption:{
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
                }, // 默认的option
                defaultLineOption:{
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
                },
                defaultBarOption:{
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


                },// TODO 数据纯属虚构，需要删除，重写
                optionTreeData:[],
                currentOptionDataId:'', // 树形控件中当前正在编辑的option的id
                chartForm:{
                    id:null,
                    title:'',
                    option:''
                }
            }
        },
        methods:{

            loadData(){
                listChart().then(res=>{
                    res.chartList.forEach(item=>{item.option=JSON.parse(item.option)})
                    this.chartFormList=res.chartList
                    console.log(this.chartFormList[2].option)
                })
            },
            // 根据option生成树形控件
            constructTreeData(myjson,id){
                const list=[]
                for(let key in myjson){
                    if(key=='desc'){
                        continue
                    }
                    const obj={}
                    obj.label=key
                    if(id==''){
                        obj.id=key
                    }else{
                        obj.id=id+'.'+key
                    }
                    obj.value=null

                    if(typeof(myjson[key])!='function'){

                        obj.children=this.constructTreeData(myjson[key],obj.id)
                        if(myjson[key]!=null){
                            obj.desc=myjson[key].desc
                        }
                    }else if(myjson[key]!=null){
                        obj.value=myjson[key]().default
                        obj.desc=myjson[key]().desc
                    }
                    list.push(obj)
                }
                // console.log(list)
                return list
            },
            // 根据树形控件data生成option
            constructOptionData(mylist){
                const obj={}
                mylist.forEach(item=>{
                    if(item.children==undefined){
                        obj[item.label]=item.value
                    }else{
                        if(item.label=='series'){
                            // series 特殊处理，把childres逐个转换，加入到数组
                            obj.series=[]
                            item.children.forEach(child=>{
                                obj.series.push(this.constructOptionData(child.children))
                            })
                        }else{
                            obj[item.label]=this.constructOptionData(item.children)
                        }
                    }
                })
                return obj
            },
            // 通过id设置树节点值，参数treeData，需要设置的id，值
            setTreeNodeValueById(mylist, id, value){
                mylist.forEach(item=>{
                    if(item.id==id){
                        item.value=value
                    }else if(id.substring(0,item.id.length+1)==item.id+"."){
                        //多匹配一个点，防止title.text，title.textStyle混淆
                        this.setTreeNodeValueById(item.children,id,value)
                    }
                })
            },
            // 树加载option，参数treeData,需要加载到treeData的option(后端获取)
            treeLoadOption(treeData,myjson, id){
                for(let key in myjson){
9
                    let _id=''
                    if(id=='' || id==null || id==undefined){
                        _id=key
                    }else{
                        _id=id+'.'+key
                    }

                    if(typeof(myjson[key]) == "object" && Object.prototype.toString.call(myjson[key]).toLowerCase() == "[object object]" && !myjson[key].length){
                        // 是json，继续深入一层
                        this.treeLoadOption(treeData,myjson[key],_id)
                    }else if(key=='series'){
                        // TODO 这里要构造series的treeData
                        // TODO 先判断类型套用模板,读到描述，然后把series加载到模板中
                        // TODO 最后setTreeNodeValueById到series
                        let seriesList=myjson[key]
                        let seriesOption={
                            label:'',
                            id:'',
                            children:[]
                        }
                        console.log(seriesList)
                    }else{
                        // 不是json，根据id赋值
                        this.setTreeNodeValueById(treeData,_id,myjson[key])
                    }
                }
            },
            // 增加图形
            appendSeries(data){
                // 如果原本没有，先变成[]
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                //console.log(data.children)
                let seriesLabel='0';
                if(data.children.length>0){
                    // 如果数组原先就有元素，label是最后一个+1
                    seriesLabel=(parseInt(data.children.slice(-1)[0].label)+1).toString()
                }
                let seriesId='series.'+seriesLabel
                // TODO 弹出对话框，让用户选择新增类型

                let seriesTreeData=this.constructTreeData(this.defaultLineOption,seriesId)
                const newSeries = {
                    label: seriesLabel,//当前的编号n
                    id: seriesId,//series.n
                    children: seriesTreeData,
                    desc:'折线'
                };

                data.children.push(newSeries);
                // console.log(this.optionTreeData)
            },
            // 删除图形
            deleteSeries(node,data){
                // TODO 这里是直接抄饿了么的，没仔细读过
                const parent=node.parent
                const children=parent.data.children || parent.data
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            queryChart(){
                let data=new URLSearchParams()
                data.append("title",this.queryChartForm.title)
                getChartsByTitleContaining(data).then(res=>{
                    res.chartList.forEach(item=>{item.option=JSON.parse(item.option)})
                    //console.log(res)
                    this.chartFormList=res.chartList
                    //console.log(this.chartFormList)
                })
            },
            showAddChartDialog(){
                // 新增，清空表单数据
                this.isAddOperation=true
                this.chartDialogVisible=true
                this.optionTreeData=this.constructTreeData(this.defaultChartOption,'')
                this.chartForm={
                    id:null,
                    title:'',
                    option:''
                }

            },
            showEditChartDialog(index){
                // 编辑，读取表单数据
                this.isAddOperation=false
                this.chartDialogVisible=true
                //加载已有数据
                this.chartForm=JSON.parse(JSON.stringify(this.chartFormList[index]))
                this.optionTreeData=this.constructTreeData(this.defaultChartOption,'')
                this.treeLoadOption(this.optionTreeData,this.chartForm.option,'')
            },
            delChart(index){

                this.$confirm('确认删除图表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data=new URLSearchParams()
                    data.append("id",this.chartFormList[index].id)
                    delChartById(data).then(res=>{
                        if(res.status){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.loadData()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除失败'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
            },
            saveChart(){
                this.chartDialogVisible=false
                // 根据treeData生成option，并转换字符串
                console.log(this.constructOptionData(this.optionTreeData))
                this.chartForm.option=JSON.stringify(this.constructOptionData(this.optionTreeData))
                console.log(this.chartForm)
                // 调用后端接口，保存图表
                let data=new URLSearchParams()
                if(!this.isAddOperation){
                    data.append("id",this.chartForm.id)
                }

                data.append("title",this.chartForm.title)
                data.append("option",this.chartForm.option)
                setChart(data).then(res=>{
                    if(res.status){
                        // success
                        this.$message({
                            message: "保存成功",
                            type: 'success',
                            duration: 3000
                        })
                        this.loadData()
                    }else{
                        this.$message({
                            message: "保存失败",
                            type: 'error',
                            duration: 3000
                        })
                    }
                })

            }

        },
        created() {
            this.loadData()
        }
    }
</script>

<style lang="scss">
    .chart-manage{
        height:100%;
        width:100%;
        .chart-container{
            height:100%;
            width:100%;
            .chart-item{
                float: left;
                margin:1vw;
                width:25vw;
                height:42vh;
                border:1px solid #aaa;
                border-radius: 5px;
                background-color: #000080;
                .chart-title{
                    width:90%;
                    margin-left: 5%;
                    height:5vh;
                    line-height:5vh;
                    font-size: 3vh;
                    font-weight: 700;
                    color:yellow;
                }
                .chart{
                    margin:1vh 1vw;
                    width:23vw;
                    height:28vh;
                    background-color: #000080;
                }
            }
        }
        .btn-add{
            display: inline-block;
            background-color: #67C23A;
            color: white;
            width: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .btn-del{
            display: inline-block;
            background-color: #F56C6C;
            color: white;
            width: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    }
</style>

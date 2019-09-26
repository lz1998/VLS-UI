<template>
    <div class="chart-manage">

        <el-form :inline="true" :model="queryChartForm">
            <el-form-item label="图表标题">
                <el-input v-model="queryChartForm.title" placeholder="图表标题"/>
            </el-form-item>
            <el-form-item label="图表编号">
                <el-input v-model="queryChartForm.id" placeholder="图表编号" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryChart">查询图表</el-button>
                <el-button type="primary" @click="showAddChartDialog">新增图表</el-button>
            </el-form-item>
        </el-form>

        <div class="chart-container">
            <div class="chart-item" v-for="chartItem in chartList">
                <div class="chart-title">
                    {{chartItem.title}}(id:{{chartItem.id}})
                </div>
                <div class="chart">
                    <chartline seriesType="scatter"></chartline>
                </div>
                <div class="manage">
                    <el-button type="primary" size="small" @click="showEditChartDialog">编辑</el-button>
                    <el-button type="danger" size="small" @click="delChart">删除</el-button>
                </div>
            </div>
        </div>

        <!--新增/编辑图表对话框-->
        <el-dialog :visible.sync="chartDialogVisible" :title="isAddOperation?'新增图表':'编辑图表'">
            <el-form>
                <el-form-item :label-width="chartFormLabelWidth" label="图表标题">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item :label-width="chartFormLabelWidth" label="数据源URL">
                    <el-input></el-input>
                </el-form-item>
                <el-tree :data="treeData" ref="optionTree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span style="width: 200px;display: inline-block;text-align: left;" @click="currentOptionDataId=node.id">{{data.desc}}</span>
                        <span v-if="currentOptionDataId!=node.id && data.value!=null">{{data.value}}</span>
                        <span v-if="currentOptionDataId==node.id && node.isLeaf">
                            <input size="mini" v-model="data.value"></input>
                        </span>
                    </span>
                </el-tree>
                <el-form-item>
                    <el-button v-if="isAddOperation" type="primary" @click="addChart">保存</el-button>
                    <el-button v-if="!isAddOperation" type="primary" @click="updateChart">保存</el-button>
                    <el-button @click="chartDialogVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import chartline from "@/components/chartline.vue"
    export default {
        name: "index",
        components:{
            chartline
        },
        data(){
            return{
                queryChartForm:{
                    title:"",
                    id:""
                },
                chartList:[
                    {
                        id:1,
                        title:"标题1",
                        option:{}
                    },
                    {
                        id:2,
                        title:"标题2",
                        option:{}
                    },
                    {
                        id:3,
                        title:"标题3",
                        option:{}
                    }
                ],

                isAddOperation:true, // true是新增，false是编辑
                chartDialogVisible:false, // 显示对话框
                chartFormLabelWidth:'120px',
                chartOption:{
                    title:{
                        desc:'标题组件，包含主标题和副标题',
                        show:()=>{
                            return{
                                default:true,
                                desc:'是否显示标题组件'
                            }
                        },
                        text:()=>{
                            return{
                                default:'主标题',
                                desc:'主标题文本'
                            }
                        },
                        textStyle:{
                            desc:'主标题文本样式',
                            color:()=>{
                                return{
                                    default:'red',
                                    desc:'主标题文字的颜色'
                                }
                            },
                            fontStyle:()=>{
                                return{
                                    default:'normal',
                                    desc:'主标题文字字体的风格'
                                }
                            },
                            fontWeight:()=>{
                                return{
                                    default:'normal',
                                    desc:'主标题文字字体的粗细'
                                }
                            },
                            fontSize:()=>{
                                return{
                                    default:18,
                                    desc:'主标题文字的字体大小'
                                }
                            },
                            lineHeight:()=>{
                                return{
                                    default:56,
                                    desc:'行高'
                                }
                            }
                        },
                        subText:()=>{
                            return{
                                default:'副标题',
                                desc:'副标题文本'
                            }
                        },
                        subtextStyle:{
                            desc:'副标题文本样式',
                            color:()=>{
                                return{
                                    default:'white',
                                    desc:'副标题文字的颜色'
                                }
                            },
                            fontStyle:()=>{
                                return{
                                    default:'normal',
                                    desc:'副标题文字字体的风格'
                                }
                            },
                            fontWeight:()=>{
                                return{
                                    default:'normal',
                                    desc:'副标题文字字体的粗细'
                                }
                            },
                            fontSize:()=>{
                                return{
                                    default:12,
                                    desc:'副标题文字的字体大小'
                                }
                            },
                            lineHeight:()=>{
                                return{
                                    default:56,
                                    desc:'行高'
                                }
                            }
                        },
                        textAlign:()=>{
                            return{
                                default:'auto',
                                desc:'整体的水平对齐'
                            }
                        },
                        padding:()=>{
                            return{
                                default:'5',
                                desc:'标题内边距，单位px'
                            }
                        },
                        left:()=>{
                            return{
                                default:'auto',
                                desc:'grid 组件离容器左侧的距离'
                            }
                        },
                        top:()=>{
                            return{
                                default:'auto',
                                desc:'grid 组件离容器上侧的距离'
                            }
                        },
                        right:()=>{
                            return{
                                default:'auto',
                                desc:'grid 组件离容器右侧的距离'
                            }
                        },
                        bottom:()=>{
                            return{
                                default:'auto',
                                desc:'grid 组件离容器下侧的距离'
                            }
                        },
                        backgroundColor:()=>{
                            return{
                                default:'transparent',
                                desc:'标题背景色'
                            }
                        },
                        borderColor:()=>{
                            return{
                                default:'#ccc',
                                desc:'标题的边框颜色'
                            }
                        },
                        borderWidth:()=>{
                            return{
                                default:0,
                                desc:'标题的边框线宽'
                            }
                        },
                        borderRadius:()=>{
                            return{
                                default:0,
                                desc:'圆角半径'
                            }
                        }
                    },
                    legend:{
                        desc:'图例组件',
                        show:()=>{
                            return{
                                default:true,
                                desc:'是否显示图例组件'
                            }
                        },
                        left:()=>{
                            return{
                                default:'auto',
                                desc:'图例组件离容器左侧的距离'
                            }
                        },
                        top:()=>{
                            return{
                                default:'auto',
                                desc:'图例组件离容器上侧的距离'
                            }
                        },
                        right:()=>{
                            return{
                                default:'auto',
                                desc:'图例组件离容器右侧的距离'
                            }
                        },
                        bottom:()=>{
                            return{
                                default:'auto',
                                desc:'图例组件离容器下侧的距离'
                            }
                        },
                        width:()=>{
                            return{
                                default:'auto',
                                desc:'图例组件的宽度'
                            }
                        },
                        height:()=>{
                            return{
                                default:'auto',
                                desc:'图例组件的高度'
                            }
                        },
                        orient:()=>{
                            return{
                                default:'horizontal',
                                desc:'图例列表的布局朝向'
                            }
                        },
                        align:()=>{
                            return{
                                default:'auto',
                                desc:'图例标记和文本的对齐'
                            }
                        },
                        padding:()=>{
                            return{
                                default:'5',
                                desc:'图例内边距，单位px'
                            }
                        },
                        itemGap:()=>{
                            return{
                                default:10,
                                desc:'图例每项之间的间隔'
                            }
                        },
                        itemWidth:()=>{
                            return{
                                default:25,
                                desc:'图例标记的图形宽度'
                            }
                        },
                        itemHeight:()=>{
                            return{
                                default:14,
                                desc:'图例标记的图形高度'
                            }
                        },
                        textStyle:{
                            desc:'图例的公用文本样式',
                            color:()=>{
                                return{
                                    default:'#333',
                                    desc:'文字的颜色'
                                }
                            },
                            fontStyle:()=>{
                                return{
                                    default:'normal',
                                    desc:'文字字体的风格'
                                }
                            },
                            fontWeight:()=>{
                                return{
                                    default:'normal',
                                    desc:'文字字体的粗细'
                                }
                            },
                            fontSize:()=>{
                                return{
                                    default:12,
                                    desc:'文字的字体大小'
                                }
                            },
                            lineHeight:()=>{
                                return{
                                    default:56,
                                    desc:'行高'
                                }
                            }
                        },
                        icon:()=>{
                            return{
                                default:'circle',
                                desc:'图例项的 icon'
                            }
                        },
                        backgroundColor:()=>{
                            return{
                                default:'transparent',
                                desc:'图例背景色'
                            }
                        },
                        borderColor:()=>{
                            return{
                                default:'#ccc',
                                desc:'图例的边框颜色'
                            }
                        },
                        borderWidth:()=>{
                            return{
                                default:1,
                                desc:'图例的边框线宽'
                            }
                        },
                        borderRadius:()=>{
                            return{
                                default:0,
                                desc:'圆角半径，单位px'
                            }
                        }
                    },
                    grid:{
                        show:null,
                        left:null,
                        top:null,
                        right:null,
                        bottom:null,
                        width:null,
                        height:null,
                        backgroundColor:null,
                        borderColor:null,
                        borderWidth:null
                    },
                    xAxis:{
                        show:null,
                        position:null,
                        type:null,
                        name:null,
                        nameLocation:null,
                        nameTextStyle:{
                            color:null,
                            fontStyle:null,
                            fontWeight:null,
                            fontSize:null,
                            lineHeight:null,
                            width:null,
                            height:null
                        },
                        nameGap:null,
                        splitNumber:null,
                        axisLine:{
                            show:null,
                            symbol:null,
                            symbolSize:null,
                            symbolOffset:null,
                            lineStyle:{
                                color:null,
                                width:null,
                                type:null
                            }
                        },
                        axisTick:{
                            show:null,
                            interval:null,
                            inside:null,
                            length:null,
                            lineStyle:{
                                color:null,
                                width:null,
                                type:null
                            }
                        },
                        axisLabel:{
                            show:null,
                            interval:null,
                            inside:null,
                            rotate:null,
                            margin:null,
                            color:null,
                            fontStyle:null,
                            fontWeight:null,
                            fontSize:null,
                            lineHeight:null,
                            backgroundColor:null,
                            borderColor:null,
                            borderWidth:null,
                            borderRadius:null,
                            padding:null,
                            width:null,
                            height:null
                        }
                    },
                    yAxis:{
                        show:null,
                        position:null,
                        type:null,
                        name:null,
                        nameLocation:null,
                        nameTextStyle:{
                            color:null,
                            fontStyle:null,
                            fontWeight:null,
                            fontSize:null,
                            lineHeight:null,
                            width:null,
                            height:null
                        },
                        nameGap:null,
                        splitNumber:null,
                        axisLine:{
                            show:null,
                            symbol:null,
                            symbolSize:null,
                            symbolOffset:null,
                            lineStyle:{
                                color:null,
                                width:null,
                                type:null
                            }
                        },
                        axisTick:{
                            show:null,
                            interval:null,
                            inside:null,
                            length:null,
                            lineStyle:{
                                color:null,
                                width:null,
                                type:null
                            }
                        },
                        axisLabel:{
                            show:null,
                            interval:null,
                            inside:null,
                            rotate:null,
                            margin:null,
                            color:null,
                            fontStyle:null,
                            fontWeight:null,
                            fontSize:null,
                            lineHeight:null,
                            backgroundColor:null,
                            borderColor:null,
                            borderWidth:null,
                            borderRadius:null,
                            padding:null,
                            width:null,
                            height:null
                        }
                    },
                    backgroundColor:null
                },
                treeData:[],
                currentOptionDataId:''
            }
        },
        methods:{
            // test()
            loadData(){
                // 在这里读取chartList
            },
            // 根据option生成树形控件
            constructTreeData(myjson,id){
                const list=[]
                for(let key in myjson){
                    if(key=='desc'){
                        console.log('desc')
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
                    console.log(item.label)
                    if(item.children==undefined){
                        obj[item.label]=item.value
                    }else{
                        obj[item.label]=this.constructOptionData(item.children)
                    }
                })
                return obj
            },

            queryChart(){

            },
            showAddChartDialog(){
                // 新增，清空表单数据
                this.isAddOperation=true
                this.chartDialogVisible=true
            },
            showEditChartDialog(){
                // 编辑，读取表单数据
                this.isAddOperation=false
                this.chartDialogVisible=true
            },
            delChart(){

            },
            addChart(){
                this.chartDialogVisible=false

            },
            updateChart(){
                this.chartDialogVisible=false

            }

        },
        created() {
            this.loadData()
            this.treeData=this.constructTreeData(this.chartOption,'')
            console.log(this.treeData)
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
    }
</style>

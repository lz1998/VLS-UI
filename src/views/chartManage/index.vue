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
                        <span style="width: 120px;display: inline-block;text-align: left;" @click="currentOptionDataId=node.id">{{ node.label}}</span>
                        <span v-if="currentOptionDataId!=node.id && node.value!=null">{{node.value}}</span>
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
                        show:null,
                        text:null,
                        textStyle:{
                            color:null,
                            fontStyle:null,
                            fontWeight:null,
                            fontSize:null,
                            lineHeight:null,
                            width:null,
                            height:null
                        },
                        subText:null,
                        subtextStyle:{
                            color:null,
                            fontStyle:null,
                            fontWeight:null,
                            fontSize:null,
                            lineHeight:null,
                            width:null,
                            height:null
                        },
                        textAlign:null,
                        padding:null,
                        left:null,
                        top:null,
                        right:null,
                        bottom:null,
                        backgroundColor:null,
                        borderColor:null,
                        borderWidth:null,
                        borderRadius:null
                    },
                    legend:{
                        show:null,
                        left:null,
                        top:null,
                        right:null,
                        bottom:null,
                        width:null,
                        height:null,
                        orient:null,
                        align:null,
                        padding:null,
                        itemGap:null,
                        itemWidth:null,
                        itemHeight:null,
                        textStyle:{
                            color:null,
                            fontStyle:null,
                            fontWeight:null,
                            fontSize:null,
                            lineHeight:null,
                            width:null,
                            height:null
                        },
                        icon:null,
                        backgroundColor:null,
                        borderColor:null,
                        borderWidth:null,
                        borderRadius:null
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
                    const obj={}
                    obj.label=key
                    if(id==''){
                        obj.id=key
                    }else{
                        obj.id=id+'.'+key
                    }
                    obj.value=null

                    if(myjson[key]!=null){
                        obj.children=this.constructTreeData(myjson[key],obj.id)
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
                console.log(this.constructOptionData(this.treeData))

            },
            updateChart(){
                this.chartDialogVisible=false

            }

        },
        created() {
            this.loadData()
            this.treeData=this.constructTreeData(this.chartOption,'')
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

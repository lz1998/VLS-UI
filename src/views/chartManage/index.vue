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
                <el-form-item :label-width="chartFormLabelWidth" label="标题">
                    <el-input></el-input>
                </el-form-item>
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
                chartFormLabelWidth:'120px'
            }
        },
        methods:{
            loadData(){
                // 在这里读取chartList
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

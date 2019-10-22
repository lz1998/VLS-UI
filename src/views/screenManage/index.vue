<template>
    <div class="screen-manage">
        <div class="screen-header">
            <div style="width:100%;border: 1px solid;">123</div>
            <div style="width:200%;border: 1px solid;">123</div>
            <div style="width:100%;"><time1></time1></div>
        </div>
        <div class="screen-body">
            <div class="left-right">
                <div class="chart-box"  @click="sendId(1)">
                    <chart
                            :options="chartList[1].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box"  @click="sendId(2)">
                    <chart
                            :options="chartList[2].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box"  @click="sendId(3)">

                </div>
            </div>
            <div class="middle">
                <div class="chart-map"  @click="sendId(0)">123</div>
                <div class="bottom-box">
                    <div class="chart-bottombox"  @click="sendId(4)">123</div>
                    <div class="chart-bottombox"  @click="sendId(5)">123</div>
                </div>
            </div>
            <div class="left-right">
                <div class="chart-box"  @click="sendId(8)">123</div>
                <div class="chart-box"  @click="sendId(7)">123</div>
                <div class="chart-box"  @click="sendId(6)">123</div>
            </div>
        </div>
        <el-dialog :visible.sync="chartDialogShow" >
            <el-form :model="chartForm">
                <el-form-item>
                    <span style="width: 200px;display: inline-block;text-align: left;font-size: 20px">请选择图表：</span>
                    <span style="width: 500px;display: inline-block;text-align: left;font-size: 20px">
                            <!--加上stop防止树形控件被点击到-->
                            <el-select v-model="previewChart.previewIndex">
                                <el-option :value="index" :label="chartItem.title+' id:'+chartItem.id" v-for="(chartItem,index) in chartFormList"></el-option>
                            </el-select>
                            <span class="btn-add" @click="refreshPreview">预览</span>
                    </span>
                </el-form-item>
                <el-form-item v-if="previewChart.previewOption">
                    <div style="margin:0 auto;width:25vw;height:30vh;" >
                        <chart
                                :options="previewChart.previewOption"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" >保存</el-button>
                    <el-button >取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import time1 from '../../components/Time'
    import {listChart} from "@/api/chart.js"
    import {getChartData} from "@/api/data.js"
    export default {
        name: "index",
        components: {
            time1
        },
        data() {
            return {
                previewChart: {
                    previewIndex:null,
                    previewId:null,
                    previewOption:{},
                    previewUrl:null
                },
                chartFormList: [],
                chartDialogShow: false,
                chartForm: {
                    chartid: null,
                    positionId: null
                },
                chartList: [
                    {
                        chartId: 33,
                        option: {
                            xAxis: {
                                type: 'category',
                                boundaryGap: false,
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line',
                                areaStyle: {}
                            }]
                        }
                    },
                    {
                        chartId: 10,
                        option: {
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line'
                            }]
                        }
                    },
                    {
                        chartId: 40,
                        option: {
                            xAxis: {
                                type: 'category',
                                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                            },
                            yAxis: {
                                type: 'value'
                            },
                            series: [{
                                data: [820, 932, 901, 934, 1290, 1330, 1320],
                                type: 'line'
                            }]
                        }
                    }
                ],

            }
        },
        methods: {
            sendId(positionId) {
                this.chartForm.positionId = positionId;
                this.chartDialogShow = true
                listChart().then(res => {
                    res.chartList.forEach(item => {
                        item.option = JSON.parse(item.option)
                    })
                    this.chartFormList = res.chartList
                     this.chartFormList.forEach(chartFormItem => {
                        console.log(chartFormItem.dataSourceUrl)
                         this.loadChartData(chartFormItem.option, chartFormItem.dataSourceUrl)
                     })
                })

            },
            loadChartData(chartOption, dataSourceUrl){
                getChartData(dataSourceUrl).then(res=>{
                    this.$set(chartOption, 'dataset', {source:res.data})
                })
            },
            refreshPreview(){
                this.previewChart.previewId=this.chartFormList[this.previewChart.previewIndex].id;
                this.previewChart.previewOption=this.chartFormList[this.previewChart.previewIndex].option;
                this.previewChart.previewUrl=this.chartFormList[this.previewChart.previewIndex].dataSourceUrl;
                this.loadChartData(this.previewChart.previewOption, this.previewChart.previewUrl)

            }

        }
    }
</script>

<style lang="scss">
    .screen-manage{
        width: 100%;
        height: 100%;
        .screen-header{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            width: 100%;
            height: 10%;
        }
        .screen-body{
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            width: 100%;
            height: 90%;
            .left-right{
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;
                .chart-box{
                    width: 100%;
                    height: 100%;
                    border: 1px solid;

                }
            }
            .middle{
                display: flex;
                flex-direction: column;
                width: 200%;
                height: 100%;
                .chart-map{
                    width: 100%;
                    height: 200%;
                    border: 1px solid;
                    background-color: #80FFFF ;
                }
                .bottom-box{
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    .chart-bottombox{
                        width: 100%;
                        height: 100%;
                        border: 1px solid;

                    }
                }
            }
        }
    }
    .btn-add{
        margin-left: 20px;
        display: inline-block;
        background-color: #67C23A;
        color: white;
        width: 60px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 20px;
        text-align: center;
        height: 40px;
    }

</style>

<template>
    <div class="screen-manage">
        <div class="screen-header">
            <div style="width:100%;border: 1px solid;">123</div>
            <div style="width:200%;border: 1px solid;">
                <div style="width:100%;height: 100%" v-if="isNoticeEditing!=false" @click="addNotice">
                    <marquee class="roll-info">{{notice}}</marquee>
                </div>
                <div style="width:100%;height: 100%;" v-if="isNoticeEditing==false" >
                    <el-input   v-model="notice" style="height: 100%;width: 70%;font-size: large;margin-top: 20px"></el-input>
                    <el-button @click="saveNotice">保存</el-button>
                </div>
            </div>
            <div style="width:100%;">
                <time1></time1>
            </div>
        </div>
        <div class="screen-body">
            <div class="left-right">
                <div class="chart-box" @click="sendId(1)">
                    <chart
                            v-if="screenChartList.length>1"
                            :options="screenChartList[1].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box" @click="sendId(2)">
                    <chart
                            v-if="screenChartList.length>2"
                            :options="screenChartList[2].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box" @click="sendId(3)">
                    <chart
                            v-if="screenChartList.length>3"
                            :options="screenChartList[3].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
            </div>
            <div class="middle">
                <div class="chart-map" @click="sendId(0)">
                    <chart
                            v-if="screenChartList.length>0"
                            :options="screenChartList[0].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="bottom-box">
                    <div class="chart-bottombox" @click="sendId(4)">
                        <chart
                                v-if="screenChartList.length>4"
                                :options="screenChartList[4].option"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />
                    </div>
                    <div class="chart-bottombox" @click="sendId(5)">
                        <chart
                                v-if="screenChartList.length>5"
                                :options="screenChartList[5].option"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />
                    </div>
                </div>
            </div>
            <div class="left-right">
                <div class="chart-box" @click="sendId(8)">
                    <chart
                            v-if="screenChartList.length>8"
                            :options="screenChartList[8].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box" @click="sendId(7)">
                    <chart
                            v-if="screenChartList.length>7"
                            :options="screenChartList[7].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box" @click="sendId(6)">
                    <chart
                            v-if="screenChartList.length>6"
                            :options="screenChartList[6].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
            </div>
        </div>
        <el-dialog :visible.sync="chartDialogShow">
            <el-form :model="chartForm">
                <el-form-item>
                    <span style="width: 200px;display: inline-block;text-align: left;font-size: 20px">请选择图表：</span>
                    <span style="width: 500px;display: inline-block;text-align: left;font-size: 20px">
                            <!--加上stop防止树形控件被点击到-->
                            <el-select v-model="chartForm.chartIndex">
                                <el-option :value="index" :label="chartItem.title+' id:'+chartItem.id"
                                           v-for="(chartItem,index) in chartList"></el-option>
                            </el-select>
                            <span class="btn-add" @click="refreshPreview">预览</span>
                    </span>
                </el-form-item>
                <el-form-item v-if="chartForm.chartOption">
                    <div style="margin:0 auto;width:25vw;height:30vh;">
                        <chart
                                :options="chartForm.chartOption"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="setChart()">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import time1 from '../../components/Time'
    import {listChart} from "@/api/chart.js"
    import {getChartData} from "@/api/data.js"
    import {getScreen} from "@/api/screen.js"
    import {setScreen} from "@/api/screen.js"

    export default {
        name: "index",
        components: {
            time1
        },
        data() {
            return {
                isNoticeEditing:true,
                notice:"热烈欢迎李政前来参观",
                chartForm: {
                    chartIndex: null,
                    chartId: null,
                    chartOption: {},
                    dataUrl: null,
                    positionId: null
                },
                chartList: [],
                chartDialogShow: false,
                /* chartForm: {
                     chartid: null,
                     positionId: null
                 },*/
                screenChartList: [],

            }
        },
        methods: {
            addNotice(){
              this.isNoticeEditing=!this.isNoticeEditing
            },
            saveNotice(){
                let data = new URLSearchParams()
                data.append("backgroundColor", "red")
                data.append("id", 1)
                data.append("imgUrl", "1")
                data.append("notice", this.notice)

                for (let i = 0; i < 9; i++) {
                    data.append("chart"+i.toString()+"Id", this.screenChartList[i].chartId)
                }
                setScreen(data).then(res => {
                    if (res.status) {
                        // success
                        this.$message({
                            message: "保存成功",
                            type: 'success',
                            duration: 3000
                        })
                        this.loadScreenData()
                    } else {
                        this.$message({
                            message: "保存失败",
                            type: 'error',
                            duration: 3000
                        })
                    }
                })
                this.isNoticeEditing=!this.isNoticeEditing
            },
            sendId(positionId) {
                this.chartForm.positionId = positionId;
                this.chartDialogShow = true

            },
            loadChartData(chartOption, dataSourceUrl) {
                getChartData(dataSourceUrl).then(res => {
                    this.$set(chartOption, 'dataset', {source: res.data})
                })
            },
            refreshPreview() {
                this.chartForm.chartId = this.chartList[this.chartForm.chartIndex].id;
                this.chartForm.chartOption = this.chartList[this.chartForm.chartIndex].option;
                this.chartForm.dataUrl = this.chartList[this.chartForm.chartIndex].dataSourceUrl;
                this.loadChartData(this.chartForm.chartOption, this.chartForm.dataUrl)

            },
            async loadScreenData(){
                // TODO 假设最初没有screen，初始化一个
                this.screenChartList=[]
                await getScreen().then(res => {
                    if (!res.status) {
                        this.$message("失败")
                        return
                    } else {
                        let screen = res.screen;
                        for (let i = 0; i < 9; i++) {
                            let tmp = {}
                            tmp.chartId = screen["chart" + i.toString() + "Id"];
                            if (tmp.chartId > 0) {
                                tmp.option = this.chartList.filter(chartItem => {
                                    return chartItem.id == tmp.chartId;
                                })[0].option
                            } else {
                                tmp.option = {}
                            }
                            this.screenChartList.push(tmp)

                        }
                        // console.log(this.screenChartList)
                    }
                })
            },
            async loadChartList() {
                await listChart().then(res => {
                    res.chartList.forEach(item => {
                        item.option = JSON.parse(item.option)
                    })
                    this.chartList = res.chartList
                    this.chartList.forEach(chartFormItem => {
                        this.loadChartData(chartFormItem.option, chartFormItem.dataSourceUrl)
                    })
                })
            },
            setChart() {
                let data = new URLSearchParams()
                data.append("backgroundColor", "red")
                data.append("id", 1)
                data.append("imgUrl", "1")
                data.append("notice", "1")

                for (let i = 0; i < 9; i++) {
                    if (this.chartForm.positionId == i) {
                        data.append("chart"+i.toString()+"Id", this.chartForm.chartId)
                    } else {
                        data.append("chart"+i.toString()+"Id", this.screenChartList[i].chartId)
                    }
                }
                setScreen(data).then(res => {
                    if (res.status) {
                        // success
                        this.$message({
                            message: "保存成功",
                            type: 'success',
                            duration: 3000
                        })
                        this.loadScreenData()
                    } else {
                        this.$message({
                            message: "保存失败",
                            type: 'error',
                            duration: 3000
                        })
                    }
                })
                this.chartDialogShow = false

            }
        },

        async mounted() {
            await this.loadChartList()
            await this.loadScreenData()
        }
    }
</script>

<style lang="scss">
    .screen-manage {
        width: 100%;
        height: 100%;

        .screen-header {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            width: 100%;
            height: 10%;
            .roll-info{
                width:100%;
                height:5vh;
                line-height: 5vh;
                margin-top:2.5vh;
                font-size:3vh;
                font-weight: 700;
                border-radius: 2vh;
                background-color: #000080;
                color:#80FFFF
            }
        }

        .screen-body {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            width: 100%;
            height: 90%;

            .left-right {
                display: flex;
                flex-direction: column;
                width: 100%;
                height: 100%;

                .chart-box {
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    box-sizing: border-box;


                }
            }

            .middle {
                display: flex;
                flex-direction: column;
                width: 200%;
                height: 100%;

                .chart-map {
                    width: 100%;
                    height: 200%;
                    border: 1px solid;
                    box-sizing: border-box;
                    background-color: #80FFFF;
                }

                .bottom-box {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    height: 100%;
                    border: 1px solid;
                    box-sizing: border-box;

                    .chart-bottombox {
                        width: 100%;
                        height: 100%;
                        border: 1px solid;
                        box-sizing: border-box;
                    }
                }
            }
        }
    }

    .btn-add {
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

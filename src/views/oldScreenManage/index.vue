<template>
    <div class="screen-manage">
        <div style="margin-bottom: 10px;float: left">
            <span style="font-size: xx-large;margin-right: 100px">请给大屏背景选择颜色</span>
            <el-color-picker v-model="backgroundColor" show-alpha @change="showColor" @active-change="showActivecolor"></el-color-picker>
        </div>
        <div style="margin-bottom: 20px;float: right">
            <el-button @click="toChild" style="background-color: greenyellow">确认布置到home界面中</el-button>
        </div>
        <div class="screen-header">
            <div style="width:100%;border: 1px solid;">
<!--            <img v-if="imgUrl" :src="imgUrl" @click="clickUpload" class="Image" >-->
                <img v-show="imgUrl" :src="imgUrl" @click="clickUpload" class="Image" >
                <el-upload v-show="!imgUrl"
                           v-bind:class="{'avatar-uploader':!imgUrl}"
                           action="https://jsonplaceholder.typicode.com/posts/"
                           :show-file-list="false"
                           :on-success="handleAvatarSuccess"
                >
                    <i ref="clickupload" class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div style="width:200%;border: 1px solid;">
                <div style="width:100%;height: 100%" v-if="isNoticeEditing!=false" @click="addNotice">
                    <marquee class="roll-info">{{notice}}</marquee>
                </div>
                <div style="width:100%;height: 100%;" v-if="isNoticeEditing==false">
                    <el-input v-model="notice"
                              style="height: 100%;width: 70%;font-size: large;margin-top: 20px"></el-input>
                    <el-button @click="handleSaveNotice">保存</el-button>
                </div>
            </div>
            <div style="width:100%; border:1px solid;">
                <time1></time1>
            </div>
        </div>
        <div class="screen-body">
            <div class="left-right">
                <div class="chart-box" @click="sendId(1)" v-if="screenChartList.length>1">
                    <div class="add-chart" v-if="screenChartList[1].chartId<0">点击添加图表</div>
                    <chart
                            :options="screenChartList[1].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box" @click="sendId(2)" v-if="screenChartList.length>2">
                    <div class="add-chart" v-if="screenChartList[2].chartId<0">点击添加图表</div>
                    <chart
                            :options="screenChartList[2].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box" @click="sendId(3)" v-if="screenChartList.length>3">
                    <div class="add-chart" v-if="screenChartList[3].chartId<0">点击添加图表</div>
                    <chart
                            :options="screenChartList[3].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
            </div>
            <div class="middle">
                <div class="chart-map" @click="sendId(0)" v-if="screenChartList.length>0">
                    <div class="add-chart" v-if="screenChartList[0].chartId<0">点击添加图表</div>
                    <chart
                            :options="screenChartList[0].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="bottom-box">
                    <div class="chart-bottombox" @click="sendId(4)" v-if="screenChartList.length>4">
                        <div class="add-chart" v-if="screenChartList[4].chartId<0">点击添加图表</div>
                        <chart
                                :options="screenChartList[4].option"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />
                    </div>
                    <div class="chart-bottombox" @click="sendId(5)" v-if="screenChartList.length>5">
                        <div class="add-chart" v-if="screenChartList[5].chartId<0">点击添加图表</div>
                        <chart
                                :options="screenChartList[5].option"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />
                    </div>
                </div>
            </div>
            <div class="left-right">
                <div class="chart-box" @click="sendId(8)" v-if="screenChartList.length>8">
                    <div class="add-chart" v-if="screenChartList[8].chartId<0">点击添加图表</div>
                    <chart
                            :options="screenChartList[8].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box" @click="sendId(7)" v-if="screenChartList.length>7">
                    <div class="add-chart" v-if="screenChartList[7].chartId<0">点击添加图表</div>
                    <chart
                            :options="screenChartList[7].option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="chart-box" @click="sendId(6)" v-if="screenChartList.length>6">
                    <div class="add-chart" v-if="screenChartList[6].chartId<0">点击添加图表</div>
                    <chart
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
                            <el-button class="btn-add" @click="refreshPreview">预览</el-button>
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
                    <el-button type="primary" @click="handleSaveScreenChart">保存</el-button>
                    <el-button @click="chartDialogShow=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="logoDialogShow">
            <el-form :model="chartForm">
                <el-form-item>
                    <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove"
                            :on-success="getImageUrl"
                            :file-list="fileList"
                            :limit="1"
                            list-type="picture"
                    >
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                    <el-button size="small" type="primary" @click="saveLogo">保存logo</el-button>
                    <!--                    <input @change="getImageFile" ref="gallery"  type="file"
                                               accept="image/jpg, image/jpeg, image/gif, image/png">-->
                </el-form-item>

            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import time1 from '../../components/Time'
    import uploadLogo1 from '../../components/uploadLogo'
    import {listChart} from "@/api/chart.js"
    import {getChartData} from "@/api/data.js"
    import {getScreen} from "@/api/screen.js"
    import {setScreen} from "@/api/screen.js"

    export default {
        name: "index",
        components: {
            time1,
            uploadLogo1
        },
        data() {
            return {
                backgroundColor:'rgba(16, 22, 54, 1)',
                fileList: [],
                imgUrl: '',
                logoShow: false,
                logoForm: {
                    name: "",
                    url: ""
                },
                isNoticeEditing: true,
                notice: "热烈欢迎李政前来参观",
                chartForm: {
                    chartIndex: null,
                    chartId: null,
                    chartOption: {},
                    dataUrl: null,
                    positionId: null
                },
                chartList: [],
                chartDialogShow: false,
                logoDialogShow: false,
                /* chartForm: {
                     chartid: null,
                     positionId: null
                 },*/
                screenChartList: [],
                screenId: null

            }
        },
        methods: {
            toChild(){

                this.saveScreen()
                this.$router.push({
                    path:'/home',
                    query:{
                        id:this.screenId
                    }
                })
            },
            showActivecolor(s){
                console.log(s)
            },
            showColor(color){
                this.backgroundColor=color;
                console.log(this.backgroundColor)

            },
            handleLogoFile() {
                this.$refs.logo.click();
            },
            getImageFile(e) {
                let file = e.target.files[0];
                console.log(file)
                let reader = new FileReader()
                reader.onload = () => {
                    this.imgUrl = reader.result
                    this.saveScreen()
                }
                reader.readAsDataURL(file);
            },
            getImageUrl(response, file, fileList) {
                file = file.raw;
                let reader = new FileReader()
                reader.onload = () => {
                    this.imgUrl = reader.result
                    console.log(this.imgUrl)
                }
                reader.readAsDataURL(file);
            },
            saveLogo() {
                this.logoDialogShow = false
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
                console.log(this.imgUrl)
            },
            send() {
                this.logoDialogShow = true
            },
            addNotice() {
                this.isNoticeEditing = !this.isNoticeEditing
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
                this.loadChartData(this.chartForm.chartOption, this.chartList[this.chartForm.chartIndex].dataSourceUrl)
            },
            async loadScreenData() {
                // TODO 假设最初没有screen，初始化一个
                this.screenChartList = []
                await getScreen().then(res => {
                    if (!res.status) {
                        this.$message("失败")
                        return
                    } else if (res.screen != undefined && res.screen != null) {
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
                        this.notice = screen.notice
                        this.imgUrl = screen.imgUrl
                        this.screenId = screen.id
                        this.backgroundColor=screen.backgroundColor;
                        // console.log(this.screenChartList)
                    } else {
                        for (let i = 0; i < 9; i++) {
                            let tmp = {
                                chartId: -1,
                                option: {}
                            }
                            this.screenChartList.push(tmp)
                        }
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
            handleSaveScreenChart() {
                // 保存图表id
                this.screenChartList[this.chartForm.positionId] = this.chartList[this.chartForm.chartIndex]
                this.chartDialogShow = false


            },
            handleSaveNotice() {
                // 保存顶部通知
                this.isNoticeEditing = !this.isNoticeEditing
            },
            saveScreen() {
                // 保存所有数据到后端
                let data = new FormData()
                if (this.screenId) {
                    data.append("id", this.screenId)
                }
                if (this.backgroundColor) {
                    data.append("backgroundColor", this.backgroundColor)
                }

                if (this.imgUrl) {
                    data.append("imgUrl", this.imgUrl)
                }
                console.log(this.imgUrl)
                data.append("notice", this.notice)
                for (let i = 0; i < 9; i++) {
                    data.append("chart" + i.toString() + "Id", this.screenChartList[i].chartId)
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
            },

            handleAvatarSuccess(res, file) {
                let reader = new FileReader()
                reader.onload = () => {
                    this.imgUrl = reader.result
                    console.log(this.imgUrl)
                    this.saveScreen()
                }
                reader.readAsDataURL(file.raw);
            },
            clickUpload(){
                this.$refs.clickupload.click()
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
            .Image{
                z-index: 100;
                display: block;
                width: 100%;
                height: 100%;
            }
            .avatar-uploader .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;
                z-index: 100;
            }
            .avatar-uploader .el-upload:hover {
                border-color: #409EFF;
            }
            .avatar-uploader-icon {
                font-size: 25px;
                color: #8c939d;
                width: 62px;
                height: 62px;
                line-height: 62px;
                text-align: center;
            }
            .roll-info {
                width: 100%;
                height: 5vh;
                line-height: 5vh;
                margin-top: 2.5vh;
                font-size: 3vh;
                font-weight: 700;
                border-radius: 2vh;
                background-color: #000080;
                color: #80FFFF
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
        text-align: center;
    }

    .add-chart {
        text-align: center;
        font-size: x-large;
    }

</style>

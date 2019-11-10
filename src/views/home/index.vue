<template>
    <div class="home">
        <el-row class="header">
            <el-col :span="6" class="header-item">
                <div class="wrapper-in">
                    <logo :img="screen.imgUrl"></logo>
                </div>
            </el-col>
            <el-col :span="12" class="header-item">
                <marquee class="roll-info">{{screen.notice}}</marquee>

            </el-col>
            <el-col :span="6" class="header-item">
                <div class="wrapper-in">
                    <Time1></Time1>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="6">
                <el-row class="wrapper-out">
                    <div class="wrapper-in" v-if="screen">
                        <chart
                                :options="chartOptionList[1]"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />

                    </div>
                </el-row>
                <el-row class="wrapper-out">
                    <div class="wrapper-in" v-if="screen">
                        <chart
                                :options="chartOptionList[2]"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />

                    </div>
                </el-row>
                <el-row class="wrapper-out" v-if="screen">
                    <div class="wrapper-in">
                        <chart
                                :options="chartOptionList[3]"
                                :auto-resize="true"
                                style="width: 100%; height: 100%;"
                        />
                    </div>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="wrapper-map-out">
                    <div class="wrapper-in">
                        <map1></map1>

                    </div>
                </el-row>
                <el-row>
                    <el-col :span="12" class="wrapper-out">
                        <div class="wrapper-in">
                            <chartline seriesType="line"></chartline>
                        </div>
                    </el-col>
                    <el-col :span="12" class="wrapper-out">
                        <div class="wrapper-in">
                            <chartline seriesType="bar"></chartline>
                        </div>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="6">
                <el-row class="wrapper-out">
                    <div class="wrapper-in">
                        <chartline seriesType="line"></chartline>
                    </div>
                </el-row>
                <el-row class="wrapper-out">
                    <div class="wrapper-in">
                        <chartline seriesType="effectScatter"></chartline>
                    </div>
                </el-row>
                <el-row class="wrapper-out">
                    <div class="wrapper-in">
                        <chartline seriesType="line"></chartline>
                    </div>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import Time1 from "@/components/Time.vue"
    import logo from "@/components/logo.vue"
    import img from '@/image/logo.png'
    import chartline from "@/components/chartline.vue"
    import map1 from "@/components/map1.vue"
    import {getScreenById} from "@/api/screen.js"
    import {getChartById} from "@/api/chart.js"
    import {getChartData} from "@/api/data.js"


    export default {
        name: 'home',
        components: {
            Time1,
            logo,
            chartline,
            map1
        },
        data() {
            return {
                screen:{},
                chartOptionList:[]
            }
        },
        methods: {
            async loadScreen(screenId) {
                let data=new FormData()
                data.append("id",screenId)
                await getScreenById(data).then(res=>{
                    if(res.status){
                        this.screen=res.screen
                    }
                })
                this.chartOptionList=[]
                for(let i=0;i<9;i++){
                    let id=this.screen['chart'+i+'Id']
                    if(id<0){
                        this.chartOptionList.push({})
                    }else{
                        let data=new URLSearchParams()
                        data.append("id",id)
                        console.log("id======")
                        console.log(id)
                        getChartById(data).then(async res=>{
                            console.log("res======")
                            console.log(res)
                            let option=res.chart.option
                            let dataSourceUrl=res.chart.dataSourceUrl

                            await this.loadChartData(option,dataSourceUrl)
                            console.log("op====")
                            console.log(option)
                            this.chartOptionList.push(option)
                        })
                    }

                }
            },

            loadChartData(chartOption, dataSourceUrl){
                // console.log(chartOption)
                // console.log(dataSourceUrl)
                getChartData(dataSourceUrl).then(res => {
                    console.log("data====")
                    console.log(res)
                    chartOption.dataset={}
                    chartOption.dataset.source=res.data
                    // this.$set(chartOption, 'dataset', {source: res.data})
                    console.log("data end====")
                })
            }
        },
        mounted() {
            this.loadScreen(2)
        }
    }
</script>
<style lang="scss">
    .header {
        width: 100%;
        height: 10vh;
        background-color: #000080;
    }

    .wrapper-out {
        width: 25vw;
        height: 30vh;
        padding: 1vh 1vw;
        background-color: #0000BF;
    }

    .wrapper-in {
        width: 100%;
        height: 100%;
        background-color: #000080;
        border-radius: 10px;
    }

    .wrapper-map-out {
        width: 50vw;
        height: 60vh;
        padding: 1vh 1vw;
        background-color: #0000BF;
    }

    .header-item {
        height: 100%;
        padding: 0 1vw;
        background-color: #0000BF;
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
</style>

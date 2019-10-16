<template>
    <div class="screen-manage">
        <el-row class="screen-header">
            <el-col style="width:100%;border: 1px solid;">123</el-col>
            <el-col style="width:200%;border: 1px solid;">123</el-col>
            <el-col style="width:100%;"><time1></time1></el-col>
        </el-row>
        <el-row class="screen-body">
            <el-col class="left-right">
                <el-row class="chart-box">123</el-row>
                <el-row class="chart-box">123</el-row>
                <el-row class="chart-box">123</el-row>
            </el-col>
            <el-col class="middle">
                <el-row class="chart-map">123</el-row>
                <el-row class="bottom-box">
                    <el-col class="chart-bottombox">123</el-col>
                    <el-col class="chart-bottombox">123</el-col>
                </el-row>
            </el-col>
            <el-col class="left-right">
                <el-row class="chart-box">123</el-row>
                <el-row class="chart-box">123</el-row>
                <el-row class="chart-box">123</el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import time1 from '../../components/Time'
    export default {
        name: "index",
        components: {
            time1
        },
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

</style>

<template>
    <div class="time">
        <div class="nowTime">
            {{getCurDate()}}
        </div>
        <div class="nowTime">
            {{getCurTime()}}
        </div>
    </div>

</template>

<script type="text/ecmascript-6">
    import img from '../image/logo.png'
    export default {
        name: "Time",
        data() {
            return {
                time:new Date(),
            }
        },
        methods:{
            getCurDate(){
                let year = this.time.getFullYear();
                let month = this.time.getMonth() + 1;
                let day = this.time.getDate();
                if(month<10){
                    month="0"+month;
                }
                return `${year}年${month}月${day}日`
            },
            getCurTime(){
                let hours = new Date().getHours();
                let minutes = new Date().getMinutes();
                let seconds = new Date().getSeconds();
                if(hours<10){
                    hours = "0"+hours
                }
                if(minutes<10){
                    minutes = "0"+minutes
                }
                if(seconds<10){
                    seconds = "0"+seconds
                }
                return `${hours}:${minutes}:${seconds}`
            }
        },
        mounted() {
            let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
            this.timer = setInterval(() => {
                _this.time=new Date();

            }, 1000)
        },
        beforeDestroy() {
            if (this.timer) {
            clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
        }

    }
</script>

<style lang="scss">
    .time{
        width:100%;
        height:100%;
        .nowTime{
            width:100%;
            height:50%;
            line-height: 5vh;
            text-align: center;
            font-size: 20px;
            color: #ffffff;
            background-color: rgba(16, 22, 54, 1);
        }
    }
</style>

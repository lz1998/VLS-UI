<template>
    <div>
        <div class="nowTime">
            {{curdate1}}
        </div>

        <div class="nowTime">
            {{curdate2}}
        </div>

    </div>

</template>

<script type="text/ecmascript-6">
    function getNowtime() {
        var year = new Date().getFullYear();
        var month = new Date().getMonth()+1;
        var day = new Date().getDate();
        var hours = new Date().getHours();
        var minutes = new Date().getMinutes();
        var seconds = new Date().getSeconds();
        if(hours>=0&&hours<=9){
            hours = "0"+hours
        }
        if(minutes>=0&&minutes<=9){
            minutes = "0"+minutes
        }
        if(seconds>=0&&seconds<=9){
            seconds = "0"+seconds
        }
        var date = new Array(2);
        date[0] = year+"年"+month+"月"+day+"日";
        date[1]= hours+":"+minutes+":"+seconds;

        return date;
    }

    export default {
        name: "Time",

        data() {
            return {
                curdate1:getNowtime()[0],
                curdate2:getNowtime()[1]




            };
        },
        mounted() {
            let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
            this.timer = setInterval(() => {
                _this.curdate1 = getNowtime()[0];
                _this.curdate2 = getNowtime()[1]; // 修改数据date

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
    .nowTime{
        width:100%;
        height:100%;
        line-height: 5vh;
        background-color: #000080;
        text-align: center;
        font-size: 30px;
        color: #80FFFF;
    }

</style>

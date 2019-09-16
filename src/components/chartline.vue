<template>
    <chart
            :options="option"
            :auto-resize="true"
            style="width: 100%; height: 100%;"
    />

</template>

<script type="text/ecmascript-6">
    export default {
        name: "chartline",
        props: {
            data: {
                type: Array,
                default: () => {
                    return [
                        ['Mon',790, 500],
                        ['Tue', 932, 500],
                        ['Wed', 901, 500],
                        ['Thu', 934, 500],
                        ['Fri', 1290, 500],
                        ['Sat', 1330, 500],
                        ['Sun', 1320, 500]

                    ]
                }
            },
            itemColorList: {
                type: Array,
                default: () => {
                    return ['red','green']
                }
            },
            seriesType: {
                type: String,
                default: () => {
                    return 'line'
                }
            }
        },
        data() {
            return {
                option: {}
            }
        },
        mounted() {
            let _this = this;

            this.option = {
                dataset: {
                    source: _this.data
                },


                title: {
                    text: '这是一个折线图',

                    left: '5%',

                    textStyle: {
                        color: "white",
                        fontSize: "90%"
                    }

                },
                grid: {
                    left: '5%',
                    right: '5%',
                    bottom: '10%',
                    top: '20%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisLabel: {
                        color: 'white'
                    },
                    axisLine: {
                        lineStyle: {
                            show: true,
                            color: 'white'
                        }
                    }

                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        color: 'white'
                    },
                    axisLine: {
                        lineStyle: {
                            show: true,
                            color: 'white'
                        }
                    },
                    axisTick: {
                        length: 0
                    }
                },
                series: [
                ]
            };

            for (let i = 0; i < this.data[0].length - 1; i++) {

                this.option.series.push(
                    {
                        type:this.seriesType,
                        itemStyle:{
                            color:this.itemColorList[i]
                        }
                    }
                )
            }
        }


    }
</script>

<style lang="scss">

</style>

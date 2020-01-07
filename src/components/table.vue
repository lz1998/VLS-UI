<template>
    <div class="table" style="background-color: rgba(16, 22, 54, 1)" >
        <v-window v-model="step"  vertical style="height: 25vh"  reverse>
            <v-window-item v-for="n in numOfwindow" :key="n">
                <v-simple-table fixed-header  dark style="background-color: rgba(16, 22, 54, 1);" >
                    <template v-slot:default>
                        <thead>
                        <tr>
                            <th class="text-left" style="background-color: rgba(16, 22, 54, 1);">title</th>
                            <th class="text-left" style="background-color: rgba(16, 22, 54, 1);">status</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="item in list.slice(3*(n-1),3*(n-1)+3)"
                            :key="item.title">
                            <td>{{ item.title }}</td>
                            <td>{{ item.status }}</td>
                        </tr>
                        </tbody>
                    </template>
                </v-simple-table>
            </v-window-item>
        </v-window>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                list: [
                    {
                        title: "1231",
                        status: "未整改"
                    }, {
                        title: "dsad",
                        status: "未整改"
                    }, {
                        title: "xixi",
                        status: "未整改"
                    }, {
                        title: "1睡大觉降低哦1",
                        status: "未整改"
                    }, {
                        title: "就覅万佛i问",
                        status: "未整改"
                    }, {
                        title: "试点单位就",
                        status: "未整改"
                    }, {
                        title: "试单位就",
                        status: "未整改"
                    },
                ],
                step: 0
            }
        },
        computed: {
            numOfwindow() {
                let listNum = this.list.length
                let mo = Math.floor(listNum / 3)
                if (listNum % 3 == 0)
                    return mo
                else
                    return mo + 1
            },
        },
        created () {
            setInterval(() => {
                if(false) return
                if (++this.step >= this.numOfwindow) this.step = 0
            }, 3000)
        },

    }
</script>

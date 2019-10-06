<template>
    <div class="chart-manage">

        <el-form :inline="true" :model="queryChartForm">
            <el-form-item label="图表标题">
                <el-input v-model="queryChartForm.title" placeholder="图表标题"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryChart">查询图表</el-button>
                <el-button type="primary" @click="showAddChartDialog">新增图表</el-button>
            </el-form-item>
        </el-form>

        <div class="chart-container">
            <div class="chart-item" v-for="(chartItem,index) in chartFormList">
                <div class="chart-title">
                    {{chartItem.title}}(id:{{chartItem.id}})
                </div>
                <div class="chart">
                    <chart
                            :options="chartItem.option"
                            :auto-resize="true"
                            style="width: 100%; height: 100%;"
                    />
                </div>
                <div class="manage">
                    <el-button type="primary" size="small" @click="showEditChartDialog(index)">编辑</el-button>
                    <el-button type="danger" size="small" @click="delChart">删除</el-button>
                </div>
            </div>
        </div>

        <!--新增/编辑图表对话框-->
        <el-dialog :model="chartForm" :visible.sync="chartDialogVisible" :title="isAddOperation?'新增图表':'编辑图表'">
            <el-form>
                <el-form-item :label-width="chartFormLabelWidth" label="图表标题">
                    <el-input v-model="chartForm.title"></el-input>
                </el-form-item>
                <el-form-item :label-width="chartFormLabelWidth" label="数据源URL">
                    <el-input></el-input>
                </el-form-item>
                <el-tree :data="treeData" ref="optionTree">
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span style="width: 200px;display: inline-block;text-align: left;" @click="currentOptionDataId=node.id">{{data.desc}}</span>
                        <span v-if="currentOptionDataId!=node.id && data.value!=null">{{data.value}}</span>
                        <span v-if="currentOptionDataId==node.id && node.isLeaf">
                            <input size="mini" v-model="data.value"></input>
                        </span>
                    </span>
                </el-tree>
                <el-form-item>
                    <el-button type="primary" @click="saveChart">保存</el-button>
                    <el-button @click="chartDialogVisible=false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script type="text/ecmascript-6">
    import chartline from "@/components/chartline.vue"
    import {listChart,setChart,getChartsByTitleContaining} from "@/api/chart.js"
    export default {
        name: "index",
        components:{
            chartline
        },
        data(){
            return{
                queryChartForm:{
                    title:""
                },
                chartFormList:[
                    {
                        id:1,
                        title:"标题1",
                        option:{
                            title:{
                                show:false
                            }
                        }
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
                chartFormLabelWidth:'120px',
                defaultChartOption:{
                    title:{
                        desc:'标题组件，包含主标题和副标题',
                        show:()=>{return{default:true, desc:'是否显示标题组件'}},
                        text:()=>{return{default:'主标题', desc:'主标题文本'}},
                        textStyle:{
                            desc:'主标题文本样式',
                            color:()=>{return{default:'red', desc:'主标题文字的颜色'}},
                            fontStyle:()=>{return{default:'normal', desc:'主标题文字字体的风格'}},
                            fontWeight:()=>{return{default:'normal', desc:'主标题文字字体的粗细'}},
                            fontSize:()=>{return{default:18, desc:'主标题文字的字体大小'}},
                            lineHeight:()=>{return{default:56, desc:'行高'}}
                        },
                        subText:()=>{return{default:'副标题', desc:'副标题文本'}},
                        subtextStyle:{
                            desc:'副标题文本样式',
                            color:()=>{return{default:'white', desc:'副标题文字的颜色'}},
                            fontStyle:()=>{return{default:'normal', desc:'副标题文字字体的风格'}},
                            fontWeight:()=>{return{default:'normal', desc:'副标题文字字体的粗细'}},
                            fontSize:()=>{return{default:12, desc:'副标题文字的字体大小'}},
                            lineHeight:()=>{return{default:56, desc:'行高'}}
                        },
                        textAlign:()=>{return{default:'auto', desc:'整体的水平对齐'}},
                        padding:()=>{return{default:5, desc:'标题内边距，单位px'}},
                        left:()=>{return{default:'auto', desc:'grid 组件离容器左侧的距离'}},
                        top:()=>{return{default:'auto', desc:'grid 组件离容器上侧的距离'}},
                        right:()=>{return{default:'auto', desc:'grid 组件离容器右侧的距离'}},
                        bottom:()=>{return{default:'auto', desc:'grid 组件离容器下侧的距离'}},
                        backgroundColor:()=>{return{default:'transparent', desc:'标题背景色'}},
                        borderColor:()=>{return{default:'#ccc', desc:'标题的边框颜色'}},
                        borderWidth:()=>{return{default:0, desc:'标题的边框线宽'}},
                        borderRadius:()=>{return{default:0, desc:'圆角半径'}}
                    },
                    legend:{
                        desc:'图例组件',
                        show:()=>{return{default:true, desc:'是否显示图例组件'}},
                        left:()=>{return{default:'auto', desc:'图例组件离容器左侧的距离'}},
                        top:()=>{return{default:'auto', desc:'图例组件离容器上侧的距离'}},
                        right:()=>{return{default:'auto', desc:'图例组件离容器右侧的距离'}},
                        bottom:()=>{return{default:'auto', desc:'图例组件离容器下侧的距离'}},
                        width:()=>{return{default:'auto', desc:'图例组件的宽度'}},
                        height:()=>{return{default:'auto', desc:'图例组件的高度'}},
                        orient:()=>{return{default:'horizontal', desc:'图例列表的布局朝向'}},
                        align:()=>{return{default:'auto', desc:'图例标记和文本的对齐'}},
                        padding:()=>{return{default:5, desc:'图例内边距，单位px'}},
                        itemGap:()=>{return{default:10, desc:'图例每项之间的间隔'}},
                        itemWidth:()=>{return{default:25, desc:'图例标记的图形宽度'}},
                        itemHeight:()=>{return{default:14, desc:'图例标记的图形高度'}},
                        textStyle:{
                            desc:'图例的公用文本样式',
                            color:()=>{return{default:'#333', desc:'文字的颜色'}},
                            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格'}},
                            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细'}},
                            fontSize:()=>{return{default:12, desc:'文字的字体大小'}},
                            lineHeight:()=>{return{default:56, desc:'行高'}}
                        },
                        icon:()=>{return{default:'circle', desc:'图例项的 icon'}},
                        backgroundColor:()=>{return{default:'transparent', desc:'图例背景色'}},
                        borderColor:()=>{return{default:'#ccc', desc:'图例的边框颜色'}},
                        borderWidth:()=>{return{default:1, desc:'图例的边框线宽'}},
                        borderRadius:()=>{return{default:0, desc:'圆角半径，单位px'}}
                    },
                    grid:{
                        desc:'直角坐标系内绘图网格组件',
                        show:()=>{return{default:false, desc:'是否显示直角坐标系网格'}},
                        left:()=>{return{default:'10%', desc:'组件离容器左侧的距离'}},
                        top:()=>{return{default:60, desc:'组件离容器上侧的距离'}},
                        right:()=>{return{default:'10%', desc:'组件离容器右侧的距离'}},
                        bottom:()=>{return{default:60, desc:'组件离容器下侧的距离'}},
                        width:()=>{return{default:'auto', desc:'组件的宽度'}},
                        height:()=>{return{default:'auto', desc:'组件的高度'}},
                        backgroundColor:()=>{return{default:'transparent', desc:'网格背景色'}},
                        borderColor:()=>{return{default:'#ccc', desc:'网格的边框颜色'}},
                        borderWidth:()=>{return{default:1, desc:'网格的边框线宽'}}
                    },
                    xAxis:{
                        desc:'直角坐标系 grid 中的 x 轴',
                        show:()=>{return{default:true, desc:'是否显示 x 轴'}},
                        position:()=>{return{default:'bottom', desc:'x 轴的位置'}},
                        type:()=>{return{default:'category', desc:'坐标轴类型'}},
                        name:()=>{return{default:'', desc:'坐标轴名称'}},
                        nameLocation:()=>{return{default:'end', desc:'坐标轴名称显示位置'}},
                        nameTextStyle:{
                            desc:'坐标轴名称的文字样式',
                            color:()=>{return{default:'white', desc:'坐标轴名称的颜色'}},
                            fontStyle:()=>{return{default:'normal', desc:'坐标轴名称文字字体的风格'}},
                            fontWeight:()=>{return{default:'normal', desc:'坐标轴名称文字字体的粗细'}},
                            fontSize:()=>{return{default:12, desc:'坐标轴名称文字的字体大小'}},
                            lineHeight:()=>{return{default:56, desc:'行高'}}
                        },
                        nameGap:()=>{return{default:15, desc:'坐标轴名称与轴线之间的距离'}},
                        splitNumber:()=>{return{default:5, desc:'坐标轴的分割段数'}},
                        axisLine:{
                            desc:'坐标轴轴线相关设置',
                            show:()=>{return{default:true, desc:'是否显示坐标轴轴线'}},
                            symbol:()=>{return{default:'none', desc:'轴线两边的箭头'}},
                            symbolSize:()=>{return{default:[10, 15], desc:'轴线两边的箭头的大小'}},
                            symbolOffset:()=>{return{default:[0, 0] , desc:'轴线两边的箭头的偏移'}},
                            lineStyle:{
                                desc:'线条样式',
                                color:()=>{return{default:'#333', desc:'轴线颜色'}},
                                width:()=>{return{default:1, desc:'轴线宽度'}},
                                type:()=>{return{default:'solid', desc:'轴线类型'}}
                            }
                        },
                        axisTick:{
                            desc:'坐标轴刻度相关设置',
                            show:()=>{return{default:true, desc:'是否显示坐标轴刻度'}},
                            interval:()=>{return{default:'auto', desc:'坐标轴刻度的显示间隔'}},
                            inside:()=>{return{default:'false', desc:'坐标轴刻度是否朝内'}},
                            length:()=>{return{default:5, desc:'坐标轴刻度的长度'}},
                            lineStyle:{
                                desc:'线条样式',
                                color:()=>{return{default:'#333', desc:'刻度线的颜色'}},
                                width:()=>{return{default:1, desc:'坐标轴刻度线宽'}},
                                type:()=>{return{default:'solid', desc:'坐标轴刻度线的类型'}}
                            }
                        },
                        axisLabel:{
                            desc:'坐标轴刻度标签的相关设置',
                            show:()=>{return{default:true, desc:'是否显示刻度标签'}},
                            interval:()=>{return{default:'auto', desc:'坐标轴刻度标签的显示间隔'}},
                            inside:()=>{return{default:false, desc:'刻度标签是否朝内，默认朝外'}},
                            rotate:()=>{return{default:0, desc:'刻度标签旋转的角度'}},
                            margin:()=>{return{default:8, desc:'刻度标签与轴线之间的距离'}},
                            color:()=>{return{default:'white', desc:'刻度标签文字的颜色'}},
                            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格'}},
                            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细'}},
                            fontSize:()=>{return{default:12, desc:'文字的字体大小'}},
                            lineHeight:()=>{return{default:56, desc:'行高'}},
                            backgroundColor:()=>{return{default:'transparent', desc:'文字块背景色'}},
                            borderColor:()=>{return{default:'transparent', desc:'文字块边框颜色'}},
                            borderWidth:()=>{return{default:0, desc:'文字块边框宽度'}},
                            borderRadius:()=>{return{default:0, desc:'文字块的圆角'}},
                            padding:()=>{return{default:0, desc:'文字块的内边距'}}
                        }
                    },
                    yAxis:{
                        desc:'直角坐标系 grid 中的 y 轴',
                        show:()=>{return{default:true, desc:'是否显示 y 轴'}},
                        position:()=>{return{default:'left', desc:'y 轴的位置'}},
                        type:()=>{return{default:'value', desc:'坐标轴类型'}},
                        name:()=>{return{default:'xx', desc:'坐标轴名称'}},
                        nameLocation:()=>{return{default:'end', desc:'坐标轴名称显示位置'}},
                        nameTextStyle:{
                            desc:'坐标轴名称的文字样式',
                            color:()=>{return{default:'white', desc:'坐标轴名称的颜色'}},
                            fontStyle:()=>{return{default:'normal', desc:'坐标轴名称文字字体的风格'}},
                            fontWeight:()=>{return{default:'normal', desc:'坐标轴名称文字字体的粗细'}},
                            fontSize:()=>{return{default:12, desc:'坐标轴名称文字的字体大小'}},
                            lineHeight:()=>{return{default:56, desc:'行高'}}
                        },
                        nameGap:()=>{return{default:15, desc:'x坐标轴名称与轴线之间的距离'}},
                        splitNumber:()=>{return{default:5, desc:'坐标轴的分割段数'}},
                        axisLine:{
                            desc:'坐标轴轴线相关设置',
                            show:()=>{return{default:true, desc:'是否显示坐标轴轴线'}},
                            symbol:()=>{return{default:'none', desc:'轴线两边的箭头'}},
                            symbolSize:()=>{return{default:[10, 15], desc:'轴线两边的箭头的大小'}},
                            symbolOffset:()=>{return{default:[0, 0] , desc:'轴线两边的箭头的偏移'}},
                            lineStyle:{
                                desc:'轴线样式',
                                color:()=>{return{default:'#333', desc:'轴线颜色'}},
                                width:()=>{return{default:1, desc:'轴线宽度'}},
                                type:()=>{return{default:'solid', desc:'轴线类型'}}
                            }
                        },
                        axisTick:{
                            desc:'坐标轴刻度相关设置',
                            show:()=>{return{default:true, desc:'是否显示坐标轴刻度'}},
                            interval:()=>{return{default:'auto', desc:'坐标轴刻度的显示间隔'}},
                            inside:()=>{return{default:false, desc:'坐标轴刻度是否朝内，默认朝外'}},
                            length:()=>{return{default:5, desc:'坐标轴刻度的长度'}},
                            lineStyle:{
                                desc:'线条样式',
                                color:()=>{return{default:'#333', desc:'刻度线的颜色'}},
                                width:()=>{return{default:1, desc:'坐标轴刻度线宽'}},
                                type:()=>{return{default:'solid', desc:'坐标轴刻度线的类型'}}
                            }
                        },
                        axisLabel:{
                            desc:'坐标轴刻度标签的相关设置',
                            show:()=>{return{default:true, desc:'是否显示刻度标签'}},
                            interval:()=>{return{default:'auto', desc:'坐标轴刻度标签的显示间隔'}},
                            inside:()=>{return{default:false, desc:'刻度标签是否朝内，默认朝外'}},
                            rotate:()=>{return{default:0, desc:'刻度标签旋转的角度'}},
                            margin:()=>{return{default:8 , desc:'刻度标签与轴线之间的距离'}},
                            color:()=>{return{default:'white', desc:'刻度标签文字的颜色'}},
                            fontStyle:()=>{return{default:'normal', desc:'文字字体的风格'}},
                            fontWeight:()=>{return{default:'normal', desc:'文字字体的粗细'}},
                            fontSize:()=>{return{default:12, desc:'文字的字体大小'}},
                            lineHeight:()=>{return{default:56, desc:'行高'}},
                            backgroundColor:()=>{return{default:'transparent', desc:'文字块背景色'}},
                            borderColor:()=>{return{default:'transparent', desc:'文字块边框颜色'}},
                            borderWidth:()=>{return{default:0, desc:'文字块边框颜色'}},
                            borderRadius:()=>{return{default:0, desc:'文字块的圆角'}},
                            padding:()=>{return{default:0, desc:'文字块的内边距'}}
                        }
                    },
                    backgroundColor:()=>{return{default:'', desc:'背景色'}}
                }, // 默认的option
                treeData:[],
                currentOptionDataId:'', // 树形控件中当前正在编辑的option的id
                chartForm:{
                    id:null,
                    title:'',
                    option:''
                }
            }
        },
        methods:{
            // test()
            loadData(){
                listChart().then(res=>{

                    res.chartList.forEach(item=>{item.option=JSON.parse(item.option)})
                    console.log(res)
                    this.chartFormList=res.chartList
                    console.log(this.chartFormList[3])

                })

                // TODO 在这里调用接口，读取chartList
            },
            // 根据option生成树形控件
            constructTreeData(myjson,id){
                const list=[]
                for(let key in myjson){
                    if(key=='desc'){
                        continue
                    }
                    const obj={}
                    obj.label=key
                    if(id==''){
                        obj.id=key
                    }else{
                        obj.id=id+'.'+key
                    }
                    obj.value=null

                    if(typeof(myjson[key])!='function'){
                        obj.children=this.constructTreeData(myjson[key],obj.id)
                        if(myjson[key]!=null){

                            obj.desc=myjson[key].desc
                        }
                    }else if(myjson[key]!=null){
                        obj.value=myjson[key]().default
                        obj.desc=myjson[key]().desc
                    }
                    list.push(obj)
                }
                // console.log(list)
                return list
            },
            // 根据树形控件data生成option
            constructOptionData(mylist){
                const obj={}
                mylist.forEach(item=>{
                    if(item.children==undefined){
                        obj[item.label]=item.value
                    }else{
                        obj[item.label]=this.constructOptionData(item.children)
                    }
                })
                return obj
            },
            // 通过id设置树节点值，参数treeData，需要设置的id，值
            setTreeNodeValueById(mylist, id, value){
                mylist.forEach(item=>{
                    if(item.id==id){
                        item.value=value
                    }else if(id.substring(0,item.id.length)==item.id){
                        this.setTreeNodeValueById(item.children,id,value)
                    }
                })
            },
            // 树加载option，参数treeData,需要加载到treeData的option(后端获取)
            treeLoadOption(treeData,myjson, id){
                for(let key in myjson){

                    let _id=''
                    if(id=='' || id==null || id==undefined){
                        _id=key
                    }else{
                        _id=id+'.'+key
                    }

                    if(typeof(myjson[key]) == "object" && Object.prototype.toString.call(myjson[key]).toLowerCase() == "[object object]" && !myjson[key].length){
                        // 是json，继续深入一层
                        this.treeLoadOption(treeData,myjson[key],_id)
                    }else{
                        // 不是json，根据id赋值
                        this.setTreeNodeValueById(treeData,_id,myjson[key])
                    }
                }
            },
            queryChart(){
                let data=new URLSearchParams()
                data.append("title",this.queryChartForm.title)
                getChartsByTitleContaining(data).then(res=>{
                    res.chartList.forEach(item=>{item.option=JSON.parse(item.option)})
                    console.log(res)
                    this.chartFormList=res.chartList
                    console.log(this.chartFormList)

                })
            },
            showAddChartDialog(){
                // 新增，清空表单数据
                this.isAddOperation=true
                this.chartDialogVisible=true
                this.treeData=this.constructTreeData(this.defaultChartOption,'')
                this.chartForm={
                    id:null,
                    title:'',
                    option:''
                }

            },
            showEditChartDialog(index){
                // 编辑，读取表单数据
                this.isAddOperation=false
                this.chartDialogVisible=true
                //加载已有数据

                this.chartForm=this.chartFormList[index]
                console.log("-------------")
                console.log(this.chartForm)
                this.treeData=this.constructTreeData(this.defaultChartOption,'')
                this.treeLoadOption(this.treeData,this.chartFormList[index].option,'')
            },
            delChart(){
                // TODO 删除图表
            },
            saveChart(){
                this.chartDialogVisible=false
                // 根据treeData生成option，并转换字符串
                this.chartForm.option=JSON.stringify(this.constructOptionData(this.treeData))
                console.log(this.chartForm)
                // TODO 调用后端接口，保存图表
                let data=new URLSearchParams()
                if(!this.isAddOperation){
                    data.append("id",this.chartForm.id)
                }

                data.append("title",this.chartForm.title)
                data.append("option",this.chartForm.option)
                setChart(data).then(res=>{
                    if(res.status){
                        // success
                        this.Message({
                            message: "bao cun cheng gong",
                            type: 'success',
                            duration: 3000
                        })
                        this.loadData()
                    }else{
                        this.Message({
                            message: "baocunshibai",
                            type: 'error',
                            duration: 3000
                        })
                    }
                })

            }

        },
        created() {
            this.loadData()
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

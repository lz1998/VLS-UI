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
                    <el-button type="danger" size="small" @click="delChart(index)" >删除</el-button>
                </div>
            </div>
        </div>
        <!--新增/编辑图表对话框-->
        <el-dialog :visible.sync="chartDialogVisible" :title="isAddOperation?'新增图表':'编辑图表'">
            <el-form :model="chartForm">
                <el-form-item :label-width="chartFormLabelWidth" label="图表标题">
                    <el-input v-model="chartForm.title"></el-input>
                </el-form-item>
                <el-form-item :label-width="chartFormLabelWidth" label="数据源URL">
                    <el-input v-model="chartForm.dataSourceUrl"></el-input>
                </el-form-item>
                <div class="wrap">
                    <!--TODO 这里界面有问题-->
                    <div class="left">
                        <el-tree :data="optionTreeData" ref="optionTree">
                       <span class="custom-tree-node" slot-scope="{ node, data }" @click="currentOptionDataId=node.id">
                        <span style="width: 200px;display: inline-block;text-align: left;">{{data.desc}}</span>
                        <!--{{data.id}}-->
                        <!--{{data.label}}-->
                        <!--{{node.parent.parent.data.label}}-->
                        <!--叶子节点，非series，可编辑value-->
                        <span v-if="node.isLeaf && data.id!='series'" style="width: 200px;display: inline-block;text-align: left;">
                            <!--非series-->
                            <span v-if="currentOptionDataId!=node.id">{{data.value}}</span>
                            <span v-if="currentOptionDataId==node.id">
                                <span v-if="data.inputType=='uneditable'">{{data.value}}</span>
                                <input v-if="data.inputType=='text'" size="mini" v-model="data.value"></input>
                                <select v-if="data.inputType=='bool'" v-model="data.value" @click.stop="">
                                    <option :value="true">是</option>
                                    <option :value="false">否</option>
                                </select>
                                <!--<input type="color" v-model="data.value"></input>-->
                                <el-color-picker v-if="data.inputType=='color'" v-model="data.value" size="mini" show-alpha :predefine="predefineColors"></el-color-picker>
                            </span>
                        </span>
                        <!--如果是series，有新增按钮-->
                        <span v-if="data.id=='series'">
                            <!--加上stop防止树形控件被点击到-->
                            <select v-model="newSeriesType" @click.stop="">
                                <option v-for="seriesType in allSeriesType" :value="seriesType.value">{{seriesType.desc}}</option>
                            </select>
                            <span class="btn-add" @click.stop="appendSeries(data)">添加</span>
                        </span>
                        <!--如果是series的子节点，有删除按钮-->
                        <span v-if="node.parent.data.id=='series'">
                            <span class="btn-del" @click.stop="deleteSeries(node,data)">删除</span>
                        </span>
                    </span>
                        </el-tree>
                    </div>
                    <div class="right">
                        <!--预览-->
                        <el-form-item v-if="previewOption">
                            <div style="margin:0 auto;width:23vw;height:28vh;" >
                                <chart
                                        :options="previewOption"
                                        :auto-resize="true"
                                        style="width: 100%; height: 100%;"
                                />
                            </div>
                            <el-button type="warning" @click="refreshPreview">预览</el-button>
                        </el-form-item>
                    </div>
                </div>
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
    import {listChart,setChart,getChartsByTitleContaining,delChartById} from "@/api/chart.js"
    import {getChartData} from "@/api/data.js"
    import {chartDefaultOption,getSeriesDefaultOption,getAllSeriesType} from './defaultOption.js'
    export default {
        name: "index",
        components:{
            chartline
        },
        data(){
            return{
                color: 'rgba(255, 69, 0, 0.68)',
                predefineColors: [
                    '#ff4500',
                    '#ff8c00',
                    '#ffd700',
                    '#90ee90',
                    '#00ced1',
                    '#1e90ff',
                    '#c71585',
                    'rgba(255, 69, 0, 0.68)',
                    'rgb(255, 120, 0)',
                    'hsv(51, 100, 98)',
                    'hsva(120, 40, 94, 0.5)',
                    'hsl(181, 100%, 37%)',
                    'hsla(209, 100%, 56%, 0.73)',
                    '#c7158577'
                ],
                queryChartForm:{
                    title:""
                },
                chartFormList:[],
                isAddOperation:true, // true是新增，false是编辑
                chartDialogVisible:false, // 显示对话框
                chartFormLabelWidth:'120px',
                optionTreeData:[],
                currentOptionDataId:'', // 树形控件中当前正在编辑的option的id
                chartForm:{
                    id:null,
                    dataSourceUrl:'',
                    title:'',
                    option:''
                },
                newSeriesType:'line',
                previewOption:null
            }
        },
        methods:{
            refreshPreview(){
                this.previewOption=this.constructOptionData(this.optionTreeData)
                this.loadChartData(this.previewOption,this.chartForm.dataSourceUrl)
            },
            loadData(){
                listChart().then(res=>{
                    res.chartList.forEach(item=>{item.option=JSON.parse(item.option)})
                    this.chartFormList=res.chartList
                    this.chartFormList.forEach(chartFormItem=>{
                        this.loadChartData(chartFormItem.option,chartFormItem.dataSourceUrl)
                    })
                })
            },
            loadChartData(chartOption, dataSourceUrl){
                getChartData(dataSourceUrl).then(res=>{
                    this.$set(chartOption, 'dataset', {source:res.data})
                })
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
                        obj.inputType=myjson[key]().inputType
                    }
                    list.push(obj)
                }
                return list
            },
            // 根据树形控件data生成option
            constructOptionData(mylist){
                const obj={}
                mylist.forEach(item=>{
                    if(item.children==undefined){
                        obj[item.label]=item.value
                    }else{
                        if(item.label=='series'){
                            // series 特殊处理，把childres逐个转换，加入到数组
                            obj.series=[]
                            item.children.forEach(child=>{
                                obj.series.push(this.constructOptionData(child.children))
                            })
                        }else{
                            obj[item.label]=this.constructOptionData(item.children)
                        }
                    }
                })
                return obj
            },
            // 通过id设置树节点值，参数treeData，需要设置的id，值
            setTreeNodeValueById(mylist, id, value){
                mylist.forEach(item=>{
                    if(item.id==id){
                        item.value=value
                    }else if(id.substring(0,item.id.length+1)==item.id+"."){
                        //多匹配一个点，防止title.text，title.textStyle混淆
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
                    }else if(key=='series'){
                        // 逐个添加series
                        let seriesList=myjson.series
                        treeData.forEach(treeDataItem=>{
                            if(treeDataItem.id=='series'){
                                // 找到series所在的data，逐个append
                                seriesList.forEach(seriesItem=>{
                                    this.appendSeries(treeDataItem,seriesItem.type,seriesItem)
                                })
                            }
                        })

                    }else{
                        // 不是json，根据id赋值
                        this.setTreeNodeValueById(treeData,_id,myjson[key])
                    }
                }
            },
            // 增加图形
            async appendSeries(data,seriesType,seriesData){

                // 如果原本没有，先变成[]
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                let seriesLabel='0';
                if(data.children.length>0){
                    // 如果数组原先就有元素，label是最后一个+1
                    seriesLabel=(parseInt(data.children.slice(-1)[0].label)+1).toString()
                }
                let seriesId='series.'+seriesLabel
                if(seriesType=='' || seriesType==null || seriesType==undefined){
                    // 如果参数没有类型，按照select选中的添加
                    seriesType=this.newSeriesType
                }
                // 先加载默认数据

                // 根据类型加载
                let seriesDefaultOption=getSeriesDefaultOption(seriesType)

                let seriesTreeData=this.constructTreeData(seriesDefaultOption,seriesId)
                if(seriesData!=null){
                    // 有数据，加载用户数据
                    this.treeLoadOption(seriesTreeData,seriesData,seriesId)
                }

                const newSeries = {
                    label: seriesLabel,//当前的编号n
                    id: seriesId,//series.n
                    children: seriesTreeData,
                    desc:seriesDefaultOption.desc
                };

                data.children.push(newSeries);
            },
            // 删除图形
            deleteSeries(node,data){
                // TODO 这里是直接抄饿了么的，没仔细读过
                const parent=node.parent
                const children=parent.data.children || parent.data
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            queryChart(){
                let data=new URLSearchParams()
                data.append("title",this.queryChartForm.title)
                getChartsByTitleContaining(data).then(res=>{
                    res.chartList.forEach(item=>{item.option=JSON.parse(item.option)})
                    this.chartFormList=res.chartList
                    this.chartFormList.forEach(chartFormItem=>{
                        this.loadChartData(chartFormItem.option,chartFormItem.dataSourceUrl)
                    })
                })
            },
            showAddChartDialog(){
                // 新增，清空表单数据
                this.isAddOperation=true
                this.chartDialogVisible=true
                this.optionTreeData=this.constructTreeData(chartDefaultOption,'')
                this.chartForm={
                    id:null,
                    dataSourceUrl:'',
                    title:'',
                    option:''
                }
                this.previewOption=null

            },
            showEditChartDialog(index){
                // 编辑，读取表单数据
                this.isAddOperation=false
                this.chartDialogVisible=true
                //加载已有数据
                this.chartForm=JSON.parse(JSON.stringify(this.chartFormList[index]))
                this.optionTreeData=this.constructTreeData(chartDefaultOption,'')
                this.treeLoadOption(this.optionTreeData,this.chartForm.option,'')
                this.refreshPreview()
            },
            delChart(index){

                this.$confirm('确认删除图表, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data=new URLSearchParams()
                    data.append("id",this.chartFormList[index].id)
                    delChartById(data).then(res=>{
                        if(res.status){
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                            this.loadData()
                        }else{
                            this.$message({
                                type: 'error',
                                message: '删除失败'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除'
                    });
                });
            },
            saveChart(){
                this.chartDialogVisible=false
                // 根据treeData生成option，并转换字符串
                this.chartForm.option=JSON.stringify(this.constructOptionData(this.optionTreeData))
                // 调用后端接口，保存图表
                let data=new URLSearchParams()
                if(!this.isAddOperation){
                    data.append("id",this.chartForm.id)
                }

                data.append("title",this.chartForm.title)
                data.append("dataSourceUrl",this.chartForm.dataSourceUrl)
                data.append("option",this.chartForm.option)
                setChart(data).then(res=>{
                    if(res.status){
                        // success
                        this.$message({
                            message: "保存成功",
                            type: 'success',
                            duration: 3000
                        })
                        this.loadData()
                    }else{
                        this.$message({
                            message: "保存失败",
                            type: 'error',
                            duration: 3000
                        })
                    }
                })

            }

        },
        computed:{
            allSeriesType(){
                console.log(getAllSeriesType())
                return getAllSeriesType()
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
        .btn-add{
            margin-left: 20px;
            display: inline-block;
            background-color: #67C23A;
            color: white;
            width: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
        .btn-del{
            display: inline-block;
            background-color: #F56C6C;
            color: white;
            width: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }
    }
    .wrap {
        display: -webkit-box;
    }
    .left,
    .right {
        padding: 10px;

    }

</style>

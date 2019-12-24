<template>
    <div class="data px-5">
        <v-subheader>DataManage</v-subheader>
        <v-row justify="center" align="center">
            <v-col cols="4">
                <el-form>
                    <v-row no-gutters>
                        <v-col cols="12" md="6">
                            <el-input placeholder="数据标题" v-model="title"></el-input>
                        </v-col>
                        <v-col cols="12" md="6">
                            <el-form-item style="text-align: right" class="pr-1">
                                <el-button type="primary">查询数据</el-button>
                                <el-button type="primary" @click="createData">新增数据</el-button>
                            </el-form-item>
                        </v-col>
                    </v-row>
                </el-form>
            </v-col>
        </v-row>
        <v-row justify="center" no-gutters>
            <v-col cols="11">
                <v-list rounded>
                    <v-list-item-group v-model="item" color="primary" class="pa-2">
                        <v-list-item
                                v-for="(item, index) in items"
                                :key="index"
                        >
                            <v-list-item-content>
                                <v-list-item-title>{{item.text}}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon text>
                                    <v-icon>delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                            <v-list-item-action>
                                <v-btn @click="editData" icon text>
                                    <v-icon>edit</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-col>
        </v-row>
        <el-dialog
                :title="isAddOperation?'添加数据':'修改数据'"
                :visible.sync="dataVisible"
                width="50%">
            <v-row no-gutters justify="center" align="center">
                <v-col cols="10">
                    <el-form :model="dataForm" ref="dataForm">
                        <el-form-item label-width="70px" label="数据标题">
                            <el-input
                                    prefix-icon="el-icon-files"
                                    v-model="dataForm.title"
                                    placeholder="数据标题"></el-input>
                        </el-form-item>
<!--                        <el-form-item label-width="70px" label="图表类型">-->
<!--                            <el-select v-model="dataForm.type" placeholder="请选择">-->
<!--                                <el-option-->
<!--                                        v-for="item in options"-->
<!--                                        :key="item.value"-->
<!--                                        :label="item.label"-->
<!--                                        :value="item.value">-->
<!--                                </el-option>-->
<!--                            </el-select>-->
<!--                        </el-form-item>-->
                        <el-form-item label-width="70px" label="数据内容">
                            <v-row justify="center" align="center" no-gutters>
                                <v-col cols="6">
                                    <el-input
                                            autosize
                                            prefix-icon="el-icon-chat-round"
                                            placeholder="名称"
                                            v-model="dataForm.item.name">
                                    </el-input>
                                </v-col>
                                <v-col cols="6">
                                    <el-input
                                            autosize
                                            prefix-icon="el-icon-chat-round"
                                            placeholder="值"
                                            v-model="dataForm.item.value">
                                    </el-input>
                                </v-col>
                            </v-row>
                        </el-form-item>
                        <el-form-item v-for="(item,index) in dataForm.content" :key="index" label-width="70px"
                                      :label="'第'+(index+1)+'项'">
                            <v-row justify="start" align="center" no-gutters>
                                <v-col cols="5">
                                    <el-input
                                            v-model="item.name"
                                            autosize
                                            prefix-icon="el-icon-chat-round"
                                            placeholder="名称">
                                    </el-input>
                                </v-col>
                                <v-col cols="5">
                                    <el-input
                                            v-model="item.value"
                                            autosize
                                            prefix-icon="el-icon-chat-round"
                                            placeholder="值">
                                    </el-input>
                                </v-col>
                                <v-col cols="2" v-if="index!=0">
                                    <el-button @click.prevent="removeDataItem(item)">删除</el-button>
                                </v-col>
                            </v-row>
                        </el-form-item>
                        <el-form-item style="text-align: center">
                            <!--                            <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>-->
                            <el-button @click="addDataItem">新 增 项</el-button>
                            <el-button @click="resetForm">重 置</el-button>
                        </el-form-item>
                    </el-form>
                </v-col>
            </v-row>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dataVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitData">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                test: 'Hello World',
                title: '',
                item: 1,
                items: [
                    {text: 'Real-Time', icon: 'mdi-clock'},
                    {text: 'Audience', icon: 'mdi-account'},
                    {text: 'Conversions', icon: 'mdi-flag'},
                ],
                dataVisible: false,
                isAddOperation: true,
                dataForm: {
                    title: '',
                    item: {
                        name: '',
                        value: ''
                    },
                    content: [{
                        name: '',
                        value: ''
                    },
                    ]
                },
            }
        },
        methods: {
            createData() {
                this.isAddOperation = true
                this.dataVisible = true
            },
            editData() {
                this.dataVisible = true
                this.isAddOperation = false
            },
            removeDataItem(item) {
                let index = this.dataForm.content.indexOf(item)
                if (index !== -1) {
                    this.dataForm.content.splice(index, 1)
                }
            },
            addDataItem() {
                this.dataForm.content.push({
                    name: '',
                    value: '',
                    // key: Date.now()
                })
            },
            resetForm() {
                this.dataForm.content = [{
                    name: '',
                    value: '',
                },]
            },
            submitData() {
                let dataForm = new Object({
                    title: this.dataForm.title,
                    item: {
                        name: this.dataForm.item.name,
                        value: this.dataForm.item.value.split(",")
                    },
                    content: []
                })
                for (let i = 0; i < this.dataForm.content.length; i++) {
                    dataForm.content.push({
                        name: this.dataForm.content[i].name,
                        value: this.dataForm.content[i].value.split(",")
                    })
                }
                console.log(dataForm)
                this.dataVisible=false
            }
        }
    }
</script>

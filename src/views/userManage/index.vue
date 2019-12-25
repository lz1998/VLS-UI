<template>
    <div class="user-manage ">
        <v-subheader>userManege</v-subheader>
        <v-container class="my-5">
            <v-row justify="center" align="center">
                <v-form>
                    <v-row align="center" justify="center">
                        <v-col cols="10" md="6">
                            <el-input v-model="username" placeholder="查询用户名"></el-input>
                        </v-col>
<!--                        <v-col cols="3">-->
<!--                            <v-btn depressed color="success" @click="test">查询用户</v-btn>-->
<!--                        </v-col>-->
                        <v-col cols="6">
                            <v-btn depressed color="primary" @click="showAddUserDialog">新建用户</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="3" v-for="user in searchUser" :key="user.name">
                    <v-card class="pa-4 " flat>
                        <v-card-text class="text-center">
                            <v-responsive class="my-4">
                                <v-avatar size="100">
                                    <img src="http://www.sucaijishi.com/uploadfile/2016/0203/20160203022636507.png">
                                </v-avatar>
                            </v-responsive>
                            <div class="subheader">用户名:{{user.username}}</div>
                            <v-chip :color="(user.role=='admin')?'#3cd1c2':'orange lighten-3'">
                                <v-icon left>mdi-account</v-icon>
                                <div class="grey--text">角色:{{ user.role }}</div>
                            </v-chip>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text @click="showEditDialog(user)">
                                <v-icon small left>
                                    edit
                                </v-icon>
                                <span>编辑</span>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text @click="delUser(user.username)">
                                <v-icon small left>
                                    delete
                                </v-icon>
                                <span>删除</span>
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
            <v-dialog v-model="showDialog" width="500">
                <v-card>
                    <v-card-title class="mb-2">
                        <div>{{isEditing?'编辑用户':'新建用户'}}</div>
                        <v-spacer></v-spacer>
                        <v-btn fab text small @click="showDialog=false">
                            <v-icon>clear</v-icon>
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-form class="px-4" ref="userForm">
                            <v-text-field outlined dense label="用户名" color="primary lighten-1"
                                          v-model="user.username" :rules="usernameRules"></v-text-field>
                            <v-text-field outlined dense label="密码" color="primary lighten-1"
                                          v-model="user.password" :rules="passwordRules"></v-text-field>
                            <v-combobox
                                    v-model="user.role"
                                    :items="items"
                                    chips
                                    label="角色"
                                    clearable
                                    :rules="roleRules"
                            >
                                <template v-slot:selection="data">
                                    <v-chip
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            :disabled="data.disabled"
                                            @click.stop="data.parent.selectedIndex = data.index"
                                            @click:close="data.parent.selectItem(data.item)"
                                    >
                                        <v-avatar class="accent white--text" left>
                                            {{ data.item.slice(0, 1).toUpperCase() }}
                                        </v-avatar>
                                        {{ data.item }}
                                    </v-chip>
                                </template>
                            </v-combobox>
                            <v-row justify="end">
                                <v-btn depressed color="primary" @click="addOrEditUser">
                                    <v-icon left small>done</v-icon>
                                    确认
                                </v-btn>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </v-container>
    </div>
</template>
<script>
    import {getUserList, setUser, deleteUser} from "@/api/user";

    export default {
        data() {
            return {
                username: '',
                items: [
                    'su',
                    'admin',
                ],
                isEditing: false,
                user: {
                    username: '',
                    password: '',
                    role: ''
                },
                showDialog: false,
                users: [],
                usernameRules: [
                    v => !!v || '请输入用户名',
                    v => ((this.allUserName.indexOf(v)<0) || (this.isEditing)) || '不允许用户名重复'
                ],
                passwordRules: [
                    v => !!v || '请输入密码',
                ],
                roleRules: [
                    v => !!v || '请输入角色',
                    v => this.items.indexOf(v) >= 0 || '请选择对应的角色'
                ]
            }
        },
        methods: {
            delUser(username) {
                let data = {
                    username: username
                }
                deleteUser(data).then(res => {
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    })
                    this.loadUserList()
                    console.log(res)
                })
                console.log(username)
            },
            queryUser() {
                console.log(this.id)
            },
            showAddUserDialog() {
                this.user = {}
                this.isEditing = false
                this.showDialog = true
            },
            showEditDialog(user) {
                console.log(user.username)
                this.loadUserData(user)
                this.isEditing = true
                this.showDialog = true
            },
            loadUserData(user) {
                this.user.id = user.id
                this.user.username = user.username
                this.user.password = user.password
                this.user.role = user.role
            },
            addOrEditUser() {
                if (this.$refs.userForm.validate()) {
                    // 编辑用户
                    if (this.isEditing == true) {
                        setUser(this.user).then(res => {
                            console.log(res)
                            this.$message({
                                type: 'success',
                                message: '编辑成功'
                            })
                            this.loadUserList()
                            this.showDialog = false
                        })
                    }
                    // 添加用户
                    else {
                        setUser(this.user).then(() => {
                            this.$message({
                                type: 'success',
                                message: '增加成功'
                            })
                            this.showDialog = false
                            this.loadUserList()
                        })
                    }
                }
            },
            loadUserList() {
                getUserList().then(res => {
                    this.users = res.userList
                })
            },
            test(){
                let allUsername = []
                this.users.forEach(item => {
                    allUsername.push(item.username)
                })
                allUsername.push(sessionStorage.getItem('username'))
                console.log(allUsername.indexOf(this.user.username)<0)
            }
        },
        computed:{
            searchUser(){
                let userResult = this.users
                return  userResult.filter(item => {
                    return item.username.indexOf(this.username)>=0
                })
            },
            allUserName(){
                let allUsername = []
                this.users.forEach(item => {
                    allUsername.push(item.username)
                })
                allUsername.push(sessionStorage.getItem('username'))
                return allUsername
            }
        },
        mounted() {
            this.loadUserList()
        }
    }
</script>

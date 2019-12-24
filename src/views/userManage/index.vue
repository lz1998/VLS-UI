<template>
    <div class="user-manage ">
        <v-subheader>userManege</v-subheader>
        <v-container class="my-5">
            <v-row justify="center" align="center">
                <v-form>
                    <v-row align="center" justify="center">
                        <v-col cols="10" md="6">
                            <el-input v-model="id" placeholder="id"></el-input>
                        </v-col>
                        <v-col cols="3">
                            <v-btn depressed color="success" @click="queryUser">查询用户</v-btn>
                        </v-col>
                        <v-col cols="3">
                            <v-btn depressed color="primary" @click="showAddUserDialog">新建用户</v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-row>
            <v-row>
                <v-col cols="12" sm="6" md="3" v-for="user in users" :key="user.id">
                    <v-card class="pa-4 " flat>
                        <v-card-text class="text-center">
                            <div class="text-left">id:{{user.id}}</div>
                            <v-responsive class="my-4">
                                <v-avatar size="100">
                                    <img src="http://www.sucaijishi.com/uploadfile/2016/0203/20160203022636507.png">
                                </v-avatar>
                            </v-responsive>
                            <div class="subheader">name:{{user.username}}</div>
                            <v-chip :color="(user.role=='user')?'#3cd1c2':'orange lighten-3'">
                                <v-icon left>mdi-account</v-icon>
                                <div class="grey--text">role:{{ user.role }}</div>
                            </v-chip>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn text @click="showEditDialog(user)">
                                <v-icon small left>
                                    edit
                                </v-icon>
                                <span>edit</span>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text @click="delUser(user.id)">
                                <v-icon small left>
                                    delete
                                </v-icon>
                                <span>delete</span>
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
                        <v-form class="px-4">
                            <v-text-field outlined dense label="用户名" color="primary lighten-1"
                                          v-model="user.username"></v-text-field>
                            <v-text-field outlined dense label="密码" color="primary lighten-1"
                                          v-model="user.password"></v-text-field>
                            <v-combobox
                                    v-model="user.role"
                                    :items="items"
                                    chips
                                    label="角色"
                                    clearable
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
    import {delUserById, userList, editUser, addUser, queryUser} from "@/api/userManage";

    export default {
        data() {
            return {
                id: '',
                items: [
                    'administrator',
                    'user',
                ],
                isEditing: false,
                user: {
                    id: '',
                    username: '',
                    password: '',
                    role: ''
                },
                showDialog: false,
                users: [
                    {
                        id: 1,
                        username: 'test1',
                        password: '123456',
                        role: 'administrator'
                    }, {
                        id: 2,
                        username: 'test2',
                        password: '145257',
                        role: 'administrator'
                    }, {
                        id: 3,
                        username: 'test3',
                        password: '456789',
                        role: 'administrator'
                    }, {
                        id: 4,
                        username: 'test3',
                        password: '456789',
                        role: 'user'
                    },
                ]
            }
        },
        methods: {
            delUser(id) {
                // delUserById(id).then(res => {
                //     console.log(res)
                // })
                console.log(id)
            },
            queryUser() {
                console.log(this.id)
            },
            showAddUserDialog() {
                this.user = {}
                this.isEditing = false
                this.showDialog = truee
            },
            showEditDialog(user) {
                console.log(user.id)
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
                if (this.isEditing == true) {
                    // editUser(this.user.id).then(res => {
                    //     this.users.forEach(item => {
                    //         if(item.id==this.user.id){
                    //             item=res.result
                    //         }
                    //     })
                    // })
                    console.log(this.user.id)
                } else {
                    // addUser().then(res => {
                    //     this.users.push(res.result)
                    // })
                    console.log('添加用户')
                }
            },
            // mounted(){
            //     userList().then(res =>{
            //         this.users=res.userList
            //     })
            // }
        }
    }
</script>

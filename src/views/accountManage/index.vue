<template>
<!--    <div class="account-manage" >-->
        <v-container fill-height>
            <v-row justify="center" align="center">
                <v-col cols="12" sm="6" >
                    <el-form ref="form" :model="updatePasswordForm" label-width="80px">
                        <el-form-item label="原密码" >
                            <el-input v-model="updatePasswordForm.oldPassword" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码">
                            <el-input v-model="updatePasswordForm.newPassword" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="再次输入">
                            <el-input v-model="updatePasswordForm.repeatPassword" type="password"></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-button type="primary" @click="handleUpdatePassword" style="width: 100%;">修改密码</el-button>

                        </el-form-item>
                    </el-form>
                </v-col>
            </v-row>
        </v-container>

<!--    </div>-->
</template>

<script type="text/ecmascript-6">
    import {updatePassword} from "@/api/user";

    export default {
        name: "index",
        data(){
            return{
                updatePasswordForm:{
                    oldPassword:'',
                    newPassword:'',
                    repeatPassword:''
                }
            }
        },
        methods:{
            handleUpdatePassword(){
                if(this.updatePasswordForm.newPassword!=this.updatePasswordForm.repeatPassword){
                    this.$message({
                        message:"两次密码不一致",
                        type:"error"                    })
                    return
                }
                let data=new URLSearchParams()
                data.append("oldPassword",this.updatePasswordForm.oldPassword)
                data.append("newPassword",this.updatePasswordForm.newPassword)
                updatePassword(data).then(res=>{
                    if(res.status){
                        this.$message({
                            type:"success",
                            message:"修改成功"
                        })
                    }
                })



            }
        }
    }
</script>

<style lang="scss">

</style>

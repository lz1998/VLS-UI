<template>
    <div class="login-container">
        <el-form class="login-form" :model="loginForm" ref="loginForm" :rules="loginFormRules">

            <div class="title-container">
                <h3 class="title">大屏管理后台</h3>
            </div>
            <el-form-item prop="username">
                <el-input
                        v-model="loginForm.username"
                        placeholder="用户名"
                        type="text"
                        tabindex="1"
                        autocomplete="on"
                        prefix-icon="el-icon-user">
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                        v-model="loginForm.password"
                        placeholder="密码"
                        type="password"
                        tabindex="2"
                        prefix-icon="el-icon-lock">
                </el-input>
            </el-form-item>
            <el-button type="primary" style="width:100%;" @click="handleLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "Login",
        data() {
            return {
                loginForm: {
                    username: "",
                    password: ""
                },
                loginFormRules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            handleLogin() {
                this.$refs['loginForm'].validate(valid => {
                    console.log(valid)
                })
            }
        }
    };
</script>


<style lang="scss">
    .login-container {
        min-height: 100vh;
        width: 100%;
        background-color: #2d3a4b;
        overflow: hidden;

        .login-form {
            position: relative;
            width: 520px;
            max-width: 80%;
            padding: 160px 10% 0;
            margin: 0 auto;
            overflow: hidden;

            .title-container {
                position: relative;

                .title {
                    font-size: 26px;
                    color: #eee;
                    margin: 0px auto 40px auto;
                    text-align: center;
                    font-weight: bold;
                }
            }

            .el-form-item {
                border: 1px solid rgba(255, 255, 255, 0.1);
                background: rgba(0, 0, 0, 0.1);
                border-radius: 5px;
                color: #454545;

                .el-input {
                    display: inline-block;
                    height: 52px;
                    width: 100%;

                    input {
                        background: transparent;
                        border: 0px;
                        padding: 12px 5px 12px 30px;
                        color: #fff;
                        height: 52px;
                        caret-color: #fff;
                    }
                }
            }

        }

    }
</style>

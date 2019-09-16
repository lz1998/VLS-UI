<template>
    <div class="login-container">
        <el-form class="login-form">

            <div class="title-container">
                <h3 class="title">系统登录</h3>
            </div>
            <el-form-item prop="username">
                <el-input
                        ref="username"
                        placeholder="用户名"
                        name="username"
                        type="text"
                        tabindex="1"
                        autocomplete="on">
                </el-input>
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                        ref="password"
                        type="password"
                        placeholder="密码"
                        name="password"
                        tabindex="2"
                        autocomplete="on"
                        prefix-icon="el-icon-search">

                </el-input>

            </el-form-item>



            <el-button type="primary" style="width:100%;margin-bottom:30px;">登录</el-button>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "Login"
    };
</script>



<style lang="scss">
    .login-container {
        min-height: 100vh;
        width: 100%;
        background-color: #2d3a4b;
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
        .login-form {
            position: relative;
            width: 520px;
            max-width: 80%;
            padding: 160px 10% 0;
            margin: 0 auto;
            overflow: hidden;
        }
        .el-form-item {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            color: #454545;
        }
        .el-input {
            display: inline-block;
            height: 47px;
            width: 100%;
            input {
                background: transparent;
                border: 0px;
                -webkit-appearance: none;
                border-radius: 0px;
                padding: 12px 5px 12px 15px;
                color: #fff;
                height: 47px;
                caret-color: #fff;
            }
        }
    }
</style>

<template>
    <div class="layout" >
        <el-container >
            <el-aside  style="width:200px">
                <MyMenu></MyMenu>
            </el-aside>
            <el-container style="height: 100vh">
                <el-header style="border-bottom: 1px solid #aaa;background-color:#DCDFE6">
                    <div class="title">可视化数据大屏管理后台</div>
                    <el-button @click="handleLogout" class="logout" >登出<i class="el-icon-right"></i></el-button>
                </el-header >
                <el-main >
                    <router-view/>
                </el-main>

            </el-container>
        </el-container>
    </div>

</template>

<script type="text/ecmascript-6">
    import MyMenu from './components/MyMenu'
    export default {
        name: "Layout",
        components:{
            MyMenu
        },
        methods:{
            handleLogout(){
                this.$store.dispatch("Logout").then(()=>{
                    this.$router.push("/login")
                })
            }
        }
    }
</script>

<style lang="scss">
    .layout{
        height: 100vh;
        width: 100%;
        .title{
            color: #303133;
            float: left;
            height: 60px;
            line-height: 60px;
            font-weight: 700;
            font-size: 30px;
        }
        .logout{
            float: right;
            background:#DCDFE6;
            height: 30px;
            line-height: 30px;
            font-size: 20px;
            padding-left: 20px;
            border: 5px solid #DCDFE6;
        }

    }



</style>

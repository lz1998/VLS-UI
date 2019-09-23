<template>
    <div class="layout" >
        <el-container >
            <el-aside  style="width:250px">
                <MyMenu></MyMenu>
            </el-aside>
            <el-container style="height: 100vh">
                <el-header style="border-bottom: 1px solid #aaa;">
                    <div class="title">可视化数据大屏管理后台</div>
                    <div class="logout">退出</div>
                </el-header >
                <el-main >
                    123
                </el-main>

            </el-container>
        </el-container>
    </div>

</template>

<script type="text/ecmascript-6">
    import MyMenu from '@/components/MyMenu'
    export default {
        name: "Layout",
        components:{
            MyMenu
        }
    }
</script>

<style lang="scss">
    .layout{
        height: 100vh;
        width: 100%;
        .title{
            float: left;
            height: 60px;
            line-height: 60px;
            font-weight: 700;
            font-size: 30px;
        }
        .logout{
            float: right;
            height: 60px;
            line-height: 60px;
            font-size: 24px;
        }

    }



</style>

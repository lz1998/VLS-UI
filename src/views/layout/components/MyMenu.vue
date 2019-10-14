<template>
    <div class = "my-menu">
        <el-menu style="min-height: 100vh"
                default-active="2"
                class="el-menu-vertical-demo"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                 :router="true">
            <el-menu-item index="/chartManage">
                <i class="el-icon-menu"></i>
                <span slot="title">图表管理</span>
            </el-menu-item>
            <el-menu-item index="/mapManage">
                <i class="el-icon-map-location"></i>
                <span slot="title">地图管理</span>
            </el-menu-item>
            <el-menu-item index="/screenManage">
                <i class="el-icon-news"></i>
                <span slot="title">大屏管理</span>
            </el-menu-item>
            <el-menu-item index="/accountManage">
                <i class="el-icon-setting"></i>
                <span slot="title">账号管理</span>
            </el-menu-item>
        </el-menu>
    </div>

</template>

<script type="text/ecmascript-6">
    export default {
        name: "MyMenu"
    }
</script>

<style lang="scss">


</style>

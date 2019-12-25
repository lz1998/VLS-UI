<template>
<!--    <v-app>-->
    <div class="layout">
        <Navbar />
        <v-content>
            <router-view></router-view>
        </v-content>
    </div>
<!--    </v-app>-->
</template>
<script>
    import Navbar from "@/views/layout/components/Navbar";
    import {permission} from "@/permission/permission";
    const routes = permission[sessionStorage.getItem('role')]
    export default{
        name:'layout',
        components:{
            Navbar
        },

    }
</script>

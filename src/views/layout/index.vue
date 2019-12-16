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
    export default{
        name:'layout',
        components:{
            Navbar
        }
    }
</script>
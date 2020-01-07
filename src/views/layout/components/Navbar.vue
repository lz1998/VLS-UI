<template>
    <nav>
        <v-app-bar color="#2d3a4b" app>
            <v-app-bar-nav-icon @click="drawer=!drawer" class="white--text"></v-app-bar-nav-icon>
            <v-toolbar-title class="text-uppercase white--text">
                <span class="font-weight-light">大屏数据可视化</span>
                <span>管理后台</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <v-menu offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn v-on="on" text fab class="white--text">
                        <v-icon>widgets</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item v-for="link in auth_routes" :key="link.name" router
                                 :to="link.path">
                        <v-list-item-title>
                            {{link.name}}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>


            <v-btn class="white--text" text fab @click="logout">
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-app-bar>
        <v-navigation-drawer app disable-resize-watcher temporary floating class="black" v-model="drawer">
            <v-col>
                <v-row class="mt-5" align="center" justify="center">
                    <v-avatar size="100">
                        <img src="http://www.sucaijishi.com/uploadfile/2016/0203/20160203022636507.png">
                    </v-avatar>
                </v-row>
                <v-row justify="center" class="mt-2">
                    <p class="white--text subheader font-italic font-weight-light mt-1">
                        用户名:{{username}}</p>
                </v-row>
                <v-row justify="center" class=" mb-3">
                    <!--                    <Popup></Popup>-->
                </v-row>
            </v-col>
            <v-list rounded>
                <v-list-item-group v-model='item' color="primary">
                    <v-list-item v-for="link in auth_routes" :key="link.name" router
                                 :to="link.path">
                        <v-list-item-icon>
                            <v-icon v-text="link.icon" class="white--text"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-title v-text="link.name" class="white--text"
                                           @click="drawer=!drawer"></v-list-item-title>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>
<script>
    import {permission} from "@/permission/permission";

    export default {
        data() {
            return {
                drawer: false,
                item: 1,
                username:sessionStorage.getItem('username')
            }
        },
        methods: {
            logout() {
                this.$store.dispatch("Logout")
                this.$router.push('/login')
            }
        },
        computed:{
            auth_routes() {
                let all_routes = this.$router.options.routes[3].children
                return all_routes.filter(item => {
                    return permission[sessionStorage.getItem('role')].indexOf(item.path)>=0
                })
            }
        }
    }
</script>

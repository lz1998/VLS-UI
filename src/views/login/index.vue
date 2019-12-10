<template>
    <div class="login" style="height: 100%">
        <v-container fluid fill-height style="background-color: #2d3a4b">
            <v-row align="center" justify="center">
                <v-col cols="10" sm="6" md="4">
                    <h2 class="headline white--text text-center mb-4">大屏管理后台</h2>
                    <v-form ref="loginForm">
                        <v-text-field
                                label="UserName"
                                prepend-inner-icon="account_box"
                                v-model="login.username"
                                color="primary"
                                solo
                                :rules="nameRules"></v-text-field>
                        <v-text-field
                                label="Password"
                                prepend-inner-icon="lock"
                                type="password"
                                v-model="login.password"
                                color="primary"
                                :rules="passwordRules"
                                solo></v-text-field>
                        <v-btn class="primary" @click="submit" block>Login</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                login: {
                    username: '',
                    password: ''
                },
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                passwordRules: [
                    v => !!v || 'Password is required',
                ],
            }
        },
        methods: {
            submit() {
                if(this.$refs.loginForm.validate()){
                    this.$store.dispatch('Login',this.login).then( () => {
                        console.log("succeed")
                        this.$router.push('/layout')
                        console.log('username:'+this.$store.state.username)
                    }).catch(() => {
                        console.log('failed')
                    })
                }
            }
        }
    }
</script>
<style>
</style>
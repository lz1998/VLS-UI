import Vue from 'vue'
import Vuex from 'vuex'
import {login} from'@/api/test.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:''
  },
  getters:{
    username: state => state.username,
  },
  mutations: {
    setUsername(state,username){
      state.username=username
    }
  },
  actions: {
    Login({commit},loginForm){
      const promise=new Promise((resolve,reject)=>{
        let data = new URLSearchParams();
        data.append("username",loginForm.username)
        data.append("password",loginForm.password)
        login(data).then(res=>{
          if(res.status){
            commit('setUsername',loginForm.username)
            resolve()
          }else{
            reject()
          }
        })
      })
      return promise
    }

  }
})

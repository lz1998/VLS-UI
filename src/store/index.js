import Vue from 'vue'
import Vuex from 'vuex'
import {login,logout} from'@/api/test.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username:null
  },
  getters:{
    username(state){
      if(!state.username){
        state.username=sessionStorage.getItem("username")
      }
      return state.username
    }
  },
  mutations: {
    setUsername(state,username){
      state.username=username
      sessionStorage.setItem("username",username)
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
    },

    Logout({commit}){
      const promise = new Promise((resolve)=>{
        logout().then(()=>{
          commit('setUsername',null)
          resolve()
        })
      })
      return promise
    }

  }
})

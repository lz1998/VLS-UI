import router from "./router";
import store from "./store";
import {Message} from "element-ui";

// router.beforeEach((to,from,next)=>{
//     if(store.getters.username!=null){
//         console.log(store.getters.username)
//         next();
//     }else if(to.path == '/login'){
//         next();
//     }else if(to.path == '/home'){
//         next();
//     }else{
//         Message({
//             message: "您还没有登录，请先登录",
//             type: 'error',
//             duration: 3000
//         })
//
//         next('/login');
//     }
// })

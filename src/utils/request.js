import axios from 'axios'
import store from '@/store'
import {Message} from "element-ui";
import router from '@/router/index'

const service = axios.create({
    baseURL:process.env.BASE_URL
    // baseURL: "http://pi.lz1998.xin:50003/"
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么

    let data = response.data
    if(data.retcode==0){
        return data.data;
    }else if(data.retcode==3){
        Message({
            message: data.msg,
            type: 'error',
            duration: 3000
        })
        store.commit('setUsername',null);
    }else{
        Message({
            message: data.msg,
            type: 'error',
            duration: 3000
        })
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service

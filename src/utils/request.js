import axios from 'axios'

const service = axios.create({
    baseURL:process.env.BASE_URL
    // baseURL: "http://pi.lz1998.xin:50003/"
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data
    if(data.retcode!=0){
        alert(data.msg)
    }
    return data.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service

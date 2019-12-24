import request from '@/utils/request'
import qs from 'qs'
import da from "element-ui/src/locale/lang/da";
export function delUserById(data) {
    return request({
        url:'/user/delUserById',
        method: 'post',
        data:qs.stringify(data)
    })
}
export function userList() {
    return request({
        url:'/user/userList',
        method: 'post',
    })
}
export function addUser() {
    return request({
        url:'/user/addUser',
        method: 'post',
    })
}
export function editUser(data) {
    return request({
        url:'/user/editUser',
        method: 'post',
        data:qs.stringify(data)
    })
}
export function queryUser(data) {
    return request({
        url:'/user/queryUser',
        method: 'post',
        data:qs.stringify(data)
    })
}

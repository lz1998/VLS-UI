import request from '@/utils/request'
import qs from 'qs'
export function login(data) {
    return request({
        url:'/user/login',
        method: 'post',
        data
    })
}

export function logout() {
    return request({
        url:'/user/logout',
        method: 'post',
    })
}
export function updatePassword(data) {
    return request({
        url:'/user/updatePassword',
        method: 'post',
        data
    })
}
export function getUserList() {
    return request({
        url:'/user/getUserList',
        method: 'post',
    })
}
export function deleteUser(data) {
    return request({
        url:'/user/deleteUser',
        method: 'post',
        data:qs.stringify(data)
    })
}
export function setUser(data) {
    return request({
        url:'/user/set',
        method: 'post',
        data:qs.stringify(data)
    })
}



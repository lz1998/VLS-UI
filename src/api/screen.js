import request from '@/utils/request'
export function getScreen() {
    return request({
        url:'/screen/getScreen',
        method: 'post'
    })
}
export function setScreen(data) {
    return request({
        url:'/screen/setScreen',
        method: 'post',
        data
    })
}
export function getScreenById(data) {
    return request({
        url:'/screen/getScreenById',
        method: 'post',
        data
    })
}

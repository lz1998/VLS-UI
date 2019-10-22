import request from '@/utils/request'
export function getScreen() {
    return request({
        url:'/screen/getScreen',
        method: 'post'
    })
}

import request from '@/utils/request'

export function test(){
    return request({
        url:'/test',
        method:'get',
        data:{

        }
    })
}

export function login(data) {
    return request({
        url:'/user/login',
        method: 'post',
        data
    })

}

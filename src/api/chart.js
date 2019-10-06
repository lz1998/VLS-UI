import request from '@/utils/request'
export function listChart() {
    return request({
        url:'/chart/listChart',
        method: 'post'
    })
}

export function setChart(data) {
    return request({
        url:'/chart/setChart',
        method: 'post',
        data
    })
}

export function getChartsByTitleContaining(data) {
    return request({
        url:'/chart/getChartsByTitleContaining',
        method: 'post',
        data
    })
}

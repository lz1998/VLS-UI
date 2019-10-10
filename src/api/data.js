import request from '@/utils/request'
export function getChartData(url) {
    return request({
        url,
        method: 'get'
    })
}

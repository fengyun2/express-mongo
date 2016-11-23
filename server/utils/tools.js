/**
 * 工具类
 */

import moment from 'moment'

moment.locale('zh-cn') // 使用中文

// 格式化时间
export const formatDate = (date, friendly) => {
    date = moment('date')

    if (friendly) {
        return date.fromNow()
    } else {
        return date.format('YYYY-MM-DD HH:mm:ss')
    }
}

/**
 * 获取ip地址
 */
export const getClientIP = (req) => {
    let ipAddress
    let headers = req.headers
    let forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for']
    forwardedIpsStr
        ? ipAddress = forwardedIpsStr
        : ipAddress = null
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress
    }
    return ipAddress
}

export const getOnly = (obj = {}, keys) => {
    if (!!keys && Array.isArray(keys)) {
        return keys.reduce((res, key) => {
            if (null == obj[key])
                return res
            res[key] = obj[key]
            return res
        })
    } else if (!!keys && 'string' == typeof keys) {
        // 以一个或多个空格分割
        keys = keys.split(/ +/)
        return keys.reduce((res, key) => {
            if (null == obj[key])
                return res
            res[key] = obj[key]
            return res
        })
    } else {
        return {}
    }
}

//将时间输出为统一的格式
Date.prototype.format = function (fmt) {
    var o = {
        'M+': this.getMonth() + 1, //月份
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季度
        'S': this.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o)
        if (new RegExp('(' + k + ')').test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                ? (o[k])
                : (('00' + o[k]).substr(('' + o[k]).length)))
    return fmt
}
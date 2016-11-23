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
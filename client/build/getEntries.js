/**
 * 已废弃
 */

const path = require('path')
const fs = require('fs')
const projectDir = path.resolve(__dirname, '../src/')

module.exports = function (webpackHotMiddlewareConfig, exceptList, server) {
    let except = ['.DS_Store']
    except = except.concat(exceptList)
    let entries = {}
    let floders = fs.readdirSync(projectDir)
    floders.forEach(floder => {
        if (except.indexOf(floder) === -1) {
            if (server) {
                entries[floder] = ['./src/' + floder + '/server-entry.js']
            } else {
                if (webpackHotMiddlewareConfig) {
                    entries[floder] = [webpackHotMiddlewareConfig, './src/' + floder + '/client-entry.js']
                } else {
                    entries[floder] = ['./src/' + floder + '/client-entry.js']
                }
            }

        }
    })
    return entries
}

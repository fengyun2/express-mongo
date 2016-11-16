/**
 * 日志工具
 */
import log4js from 'log4js'

log4js.configure({
    appenders: [
        { type: 'console' },
        { type: 'file', filename: 'logs/cheese.log', category: 'cheese' }
    ]
})

const logger = log4js.getLogger('cheese')
logger.setLevel('ERROR')

export default logger
/*
 * @Author: DrMoon
 * @Date: 2018-02-08 14:09:54
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-02-09 10:37:56
 */

const Koa = require('koa')
// const router = require('koa-router')
const bodyParse = require('koa-bodyparser')
const cors = require('koa-cors')
const log4js = require('koa-log4')
const moment = require('moment')()
const app = new Koa()
const router = require('./router')

app.use(bodyParse())
app.use(cors())
app.use(router())

const logger = log4js.getLogger('index')
logger.info('Starting with ' + moment.format('YYYY-MM-DD HH:mm:ss') + '......')

const main = async (ctx, next) => {
  logger.info('Link Start...')
  await next()
  logger.info('Link End...')
}

app.use(main)
// app.use(require('./routers/signIn.js').routes())
// app.use(require('./routers/signOut.js').routes())

app.listen(3000)

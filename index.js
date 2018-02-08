/*
 * @Author: DrMoon
 * @Date: 2018-02-08 14:09:54
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-02-08 18:06:49
 */

const Koa = require('koa')
const bodyParse = require('koa-bodyparser')
const router = require('koa-router')()
const moment = require('moment')()
const app = new Koa()
const log4js = require('koa-log4')

app.use(bodyParse())

const logger = log4js.getLogger('index')
logger.info('Starting with ' + moment.format('YYYY-MM-DD HH:mm:ss') + '......')

const main = async (ctx, next) => {
  await next()
  ctx.response.body = 'Hello'
}

app.use(require('./routers/signIn.js').routes())
app.use(require('./routers/signOut.js').routes())

app.use(main)
app.listen(3000)

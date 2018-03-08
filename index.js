/*
 * @Author: DrMoon
 * @Date: 2018-02-08 14:09:54
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-08 19:11:16
 */

const Koa = require('koa')
const app = new Koa()
const bodyParse = require('koa-bodyparser')
const cors = require('koa-cors')
const log4js = require('koa-log4')
const moment = require('moment')()
const router = require('koa-router')()
const apiRouter = require('./routers')

app.use(bodyParse())
app.use(cors())

const logger = log4js.getLogger('index')
logger.info('Starting with ' + moment.format('YYYY-MM-DD HH:mm:ss') + '......')

const main = async (ctx, next) => {
  logger.info('Link Start...')
  await next()
  logger.info('Link End...')
}

app.use(main)
app.use(apiRouter.routes(), router.allowedMethods())

app.listen(3000)

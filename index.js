const Koa = require('koa')
const moment = require('moment')()
const app = new Koa()
const log4js = require('log4js')
const logger = log4js.getLogger('index')
logger.level = 'debug'
logger.debug("Starting......")

const main = async (ctx, next) => {
  await next()
  ctx.response.body = "Hello"
}

app.use(main)
app.listen(3000)
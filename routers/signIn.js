/*
 * @Author: DrMoon
 * @Date: 2018-02-08 14:21:12
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-02-08 18:06:43
 */

const router = require('koa-router')()

const signIn = async (ctx, next) => {
  await next()
  const userName = ctx.request.body.userName || ''
  const password = ctx.request.body.password || ''
  if (userName === 'DrMoon' && password === '123456') {
    ctx.response.body = {
      flag: 'true',
      msg: '登陆成功'
    }
  } else {
    ctx.response.body = {
      flag: 'false',
      msg: '帐号或密码错误'
    }
  }
}
router.post('./signIn', signIn)

module.exports = router

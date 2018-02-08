/*
 * @Author: DrMoon
 * @Date: 2018-02-08 17:54:03
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-02-08 23:29:05
 */

const router = require('koa-router')()

const register = async (ctx, next) => {
  await next()
  const userName = ctx.request.body.userName || ''
  if (userName == 'DrMoon') {
    ctx.response.body = {
      flag: 'false',
      msg: '该帐号已被注册'
    }
  } else {
    ctx.response.body = {
      flag: 'true',
      msg: '注册成功'
    }
  }
}

router.post('./register', register)

module.exports = router

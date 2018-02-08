/*
 * @Author: DrMoon
 * @Date: 2018-02-08 14:21:15
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-02-08 23:25:26
 */

const router = require('koa-router')()

const signOut = async (ctx, next) => {
  await next()
  ctx.response.body = {
    flag: 'false',
    msg: '退出登录'
  }
}

router.post('./signOut', signOut)

module.exports = router

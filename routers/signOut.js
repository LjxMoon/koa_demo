/*
 * @Author: DrMoon
 * @Date: 2018-02-08 14:21:15
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-02-09 10:28:10
 */

// const router = require('koa-router')()

const signOut = async (ctx, next) => {
  await next()
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.response.body = {
    flag: 'true',
    msg: '退出登录'
  }
}

// router.post('./signOut', signOut)

// module.exports = router
module.exports = {
  'POST /signOut': signOut
}

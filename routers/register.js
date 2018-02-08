/*
 * @Author: DrMoon
 * @Date: 2018-02-08 17:54:03
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-02-08 17:54:28
 */

const router = require('koa-router')()

const register = async (ctx, next) => {
  await next()
}
router.post('./register', register)

module.exports = router

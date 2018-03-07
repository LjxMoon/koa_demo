/*
 * @Author: DrMoon
 * @Date: 2018-03-06 16:31:58
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-07 17:27:29
 */

const router = require('koa-router')()
const register = require('./register')
const signIn = require('./signIn')

router.stack = router.stack.concat(register.stack)
router.stack = router.stack.concat(signIn.stack)
router.prefix('/api')

module.exports = router

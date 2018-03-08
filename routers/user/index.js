/*
 * @Author: DrMoon
 * @Date: 2018-03-08 16:07:42
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-08 16:09:03
 */

const router = require('koa-router')()
const register = require('./register')
const signIn = require('./signIn')

router.stack = router.stack.concat(register.stack)
router.stack = router.stack.concat(signIn.stack)
router.prefix('/user')

module.exports = router

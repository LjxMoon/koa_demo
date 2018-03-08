/*
 * @Author: DrMoon
 * @Date: 2018-03-06 16:31:58
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-08 19:44:20
 */

const router = require('koa-router')()
const user = require('./user')
const article = require('./article')

router.stack = router.stack.concat(user.stack)
router.stack = router.stack.concat(article.stack)
router.prefix('/api')

module.exports = router

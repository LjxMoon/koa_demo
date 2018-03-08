/*
 * @Author: DrMoon
 * @Date: 2018-03-08 16:08:01
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-08 19:53:34
 */

const router = require('koa-router')()
const getArticle = require('./getArticle')
const addArticle = require('./addArticle')
const deleteArticle = require('./deleteArticle')

router.stack = router.stack.concat(getArticle.stack)
router.stack = router.stack.concat(addArticle.stack)
router.stack = router.stack.concat(deleteArticle.stack)
router.prefix('/article')

module.exports = router

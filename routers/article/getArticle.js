/*
 * @Author: DrMoon
 * @Date: 2018-03-08 16:08:11
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-08 19:43:01
 */

const router = require('koa-router')()
const pool = require('../../config/database')

const getArticle = async (ctx, next) => {
  const articleName = ctx.request.body.articleName || ''
  let jsonData = {
    flag: '',
    msg: ''
  }
  let query
  if (articleName) {
    query = 'SELECT * FROM article WHERE `articleName`="' + articleName + '";'
  } else {
    query = 'SELECT * FROM article;'
  }
  let result = await pool.query(query)
  jsonData = {
    flag: 'true',
    msg: result
  }
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.body = jsonData
}

router.get('/getArticle', getArticle)

module.exports = router

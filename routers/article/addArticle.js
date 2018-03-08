/*
 * @Author: DrMoon
 * @Date: 2018-03-08 17:09:39
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-08 19:46:29
 */

const router = require('koa-router')()
const uuid = require('uuid/v1')
const moment = require('moment')()
const jwt = require('../../middleware/jwt')
const pool = require('../../config/database')

const getArticle = async (ctx, next) => {
  const token = ctx.request.header.token || ''
  const articleName = ctx.request.body.articleName || ''
  const article = ctx.request.body.article || ''
  let userId = ''
  let articleId = uuid()
  let createTime = moment.format('YYYY-MM-DD HH:mm:ss')
  let [jwtErr, jwtData] = jwt(token)
  let jsonData = {
    flag: '',
    msg: ''
  }
  if (jwtErr) {
    console.log(jwtErr)
  } else {
    userId = jwtData.data[0].userId
  }
  let query = 'INSERT INTO article (articleId, articleName, article, userId, createTime) VALUES ( "' + articleId + '", "' + articleName + '", "' + article + '", "' + userId + '", "' + createTime + '";'
  let result = await pool.query(query)
  jsonData = {
    flag: 'true',
    msg: result
  }
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.body = jsonData
}

router.post('/getArticle', getArticle)

module.exports = router

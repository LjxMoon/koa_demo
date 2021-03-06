/*
 * @Author: DrMoon
 * @Date: 2018-03-08 17:09:39
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-09 11:25:12
 */

const router = require('koa-router')()
const uuid = require('uuid/v1')
const moment = require('moment')()
const jwt = require('../../middleware/jwt')
const pool = require('../../config/database')

const addArticle = async (ctx, next) => {
  const token = ctx.request.header.token || ''
  const articleName = ctx.request.body.articleName || ''
  const article = ctx.request.body.article || ''
  let userId = ''
  let articleId = uuid()
  let createTime = moment.format('YYYY-MM-DD HH:mm:ss')
  try {
    let jwtData = await jwt.verify(token)
    userId = jwtData.data[0].userId
  } catch (err) {
    console.log(err)
  }
  let jsonData = {
    flag: '',
    msg: ''
  }
  let query = 'INSERT INTO article (articleId, articleName, article, userId, createTime) VALUES ( "' + articleId + '", "' + articleName + '", "' + article + '", "' + userId + '", "' + createTime + '");'
  try {
    await pool.query(query)
    jsonData = {
      flag: 'true',
      msg: '新增文章成功！'
    }
  } catch (err) {
    console.log(err)
    jsonData = {
      flag: 'false',
      msg: '新增文章失败！'
    }
  }
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.body = jsonData
}

router.post('/addArticle', addArticle)

module.exports = router

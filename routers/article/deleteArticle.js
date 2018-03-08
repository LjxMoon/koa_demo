/*
 * @Author: DrMoon
 * @Date: 2018-03-08 19:39:21
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-08 20:03:09
 */

const router = require('koa-router')()
const pool = require('../../config/database')
const jwt = require('../../middleware/jwt')

const deleteArticle = async (ctx, next) => {
  const token = ctx.request.header.token || ''
  const articleId = ctx.request.body.articleId || ''
  let userId = ''
  let [jwtErr, jwtData] = jwt.verify(token)
  if (jwtErr) {
    console.log(jwtErr)
  } else {
    userId = jwtData.data[0].userId
  }
  let jsonData = {
    flag: '',
    msg: ''
  }
  if (userId) {
    let query = 'DELETE * FROM article WHERE `articleId`="' + articleId + '";'
    let result = false
    try {
      result = await pool.query(query)
    } catch (err) {
      console.log(err)
    }
    if (result) {
      jsonData = {
        flag: 'true',
        msg: result
      }
    } else {
      jsonData = {
        flag: 'false',
        msg: '删除失败'
      }
    }
  } else {
    jsonData = {
      flag: 'false',
      msg: '用户无此权限'
    }
  }
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.body = jsonData
}

router.delete('/deleteArticle', deleteArticle)

module.exports = router

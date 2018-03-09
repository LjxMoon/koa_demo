/*
 * @Author: DrMoon
 * @Date: 2018-03-08 16:08:11
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-09 11:16:17
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
  let result
  if (articleName) {
    query = 'SELECT * FROM article WHERE `articleName`="' + articleName + '";'
  } else {
    query = 'SELECT * FROM article;'
  }
  try {
    result = await pool.query(query)
    jsonData = {
      flag: 'true',
      msg: result
    }
  } catch (err) {
    console.log(err)
    jsonData = {
      flag: 'false',
      msg: '查询失败'
    }
  }
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.body = jsonData
}

router.get('/getArticle', getArticle)

module.exports = router

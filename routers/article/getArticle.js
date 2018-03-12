/*
 * @Author: DrMoon
 * @Date: 2018-03-08 16:08:11
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-12 13:43:46
 */

const router = require('koa-router')()
const pool = require('../../config/database')

const getArticle = async (ctx, next) => {
  const articleName = ctx.request.body.articleName || ''
  const tagId = ctx.request.body.tagId || ''
  let jsonData = {
    flag: '',
    msg: ''
  }
  let query
  let result
  if (articleName) {
    query = 'SELECT * FROM article WHERE `articleName` = "' + articleName + '";'
  } else if (tagId) {
    let queryByTag = 'SELECT * FROM tag WHERE `tagId` = "' + tagId + '";'
    let articleIdList
    try {
      let list = []
      let idList = await pool(queryByTag)
      list = idList.forEach((item) => {
        list.push(item.articleId)
      }).toString()
      articleIdList = '(' + list + ')'
    } catch (err) {
      console.log(err)
    }
    query = 'SELECT * FROM article WHERE `articleId` = ' + articleIdList + ';'
  } else {
    query = 'SELECT * FROM article;'
  }
  try {
    result = await pool.query(query)
    console.log(result)
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

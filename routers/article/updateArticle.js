/*
 * @Author: DrMoon
 * @Date: 2018-03-09 11:24:57
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-09 19:33:59
 */

const router = require('koa-router')()
const moment = require('moment')()
const jwt = require('../../middleware/jwt')
const pool = require('../../config/database')

const updateArticle = async (ctx, next) => {
  const token = ctx.request.header.token || ''
  const articleId = ctx.request.body.articleId || ''
  const articleName = ctx.request.body.articleName || ''
  const article = ctx.request.body.article || ''
  let userId = ''
  let updateTime = moment.format('YYYY-MM-DD HH:mm:ss')
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
  let query = 'UPDATE article SET articleName = "' + articleName + '", article = "' + article + '", updateTime = "' + updateTime + '" WHERE `articleId` = "' + articleId + '" AND `userId` = "' + userId + '";'
  try {
    console.log(await pool.query(query))
    jsonData = {
      flag: 'true',
      msg: '修改文章成功！'
    }
  } catch (err) {
    console.log(err)
    jsonData = {
      flag: 'false',
      msg: '修改文章失败！'
    }
  }
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.body = jsonData
}

router.put('/updateArticle', updateArticle)

module.exports = router

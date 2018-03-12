/*
 * @Author: DrMoon
 * @Date: 2018-03-12 09:53:31
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-12 09:54:43
 */

const router = require('koa-router')()
const pool = require('../../config/database')

const getTagList = async (ctx, next) => {
  let jsonData = {
    flag: '',
    msg: ''
  }
  let query = 'SELECT * FROM tag;'
  let result
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

router.get('/getTagList', getTagList)

module.exports = router

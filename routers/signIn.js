/*
 * @Author: DrMoon
 * @Date: 2018-02-08 14:21:12
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-07 17:37:04
 */

const router = require('koa-router')()
const pool = require('../config/database')

const signIn = async (ctx, next) => {
  await next()
  const userName = ctx.request.body.userName || ''
  const password = ctx.request.body.password || ''
  ctx.response.type = 'application/json;charset=UTF-8'
  let jsonData = {
    flag: '',
    msg: ''
  }
  let query = 'SELECT * FROM people WHERE `userName`="' + userName + '" AND `password`="' + password + '";'
  let result = await pool.query(query)
  if (result.length) {
    jsonData = {
      flag: 'true',
      msg: '登陆成功'
    }
  } else {
    jsonData = {
      flag: 'false',
      msg: '帐号或密码错误'
    }
  }
  ctx.body = jsonData
}

router.post('./signIn', signIn)

module.exports = router

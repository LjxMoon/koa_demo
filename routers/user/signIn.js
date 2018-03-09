/*
 * @Author: DrMoon
 * @Date: 2018-02-08 14:21:12
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-09 10:10:28
 */

const router = require('koa-router')()
const jwt = require('../../middleware/jwt')
const pool = require('../../config/database')

const signIn = async (ctx, next) => {
  const userName = ctx.request.body.userName || ''
  const password = ctx.request.body.password || ''
  let jsonData = {
    flag: '',
    msg: ''
  }
  let query = 'SELECT * FROM people WHERE `userName`="' + userName + '" AND `password`="' + password + '";'
  let result, token
  try {
    result = await pool.query(query)
  } catch (err) {
    console.log(err)
  }
  try {
    token = await jwt.sign(result)
  } catch (err) {
    console.log(err)
  }
  if (result.length) {
    jsonData = {
      flag: 'true',
      msg: '登陆成功',
      token: token
    }
  } else {
    jsonData = {
      flag: 'false',
      msg: '帐号或密码错误'
    }
  }
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.body = jsonData
}

router.post('/signIn', signIn)

module.exports = router

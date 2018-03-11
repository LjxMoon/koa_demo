/*
 * @Author: DrMoon
 * @Date: 2018-02-08 17:54:03
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-09 10:38:07
 */

const router = require('koa-router')()
const pool = require('../../config/database')
const uuid = require('uuid/v1')

const register = async (ctx, next) => {
  let jsonData = {
    flag: '',
    msg: ''
  }
  const userName = ctx.request.body.userName || ''
  const password = ctx.request.body.password || ''
  const sex = ctx.request.body.sex || ''
  const phone = ctx.request.body.phone || ''
  let query = 'SELECT * FROM user WHERE `userName`="' + userName + '";'
  let result = await pool.query(query)
  if (result.length) {
    jsonData = {
      flag: 'false',
      msg: '该帐号已被注册！'
    }
  } else {
    let userId = uuid()
    let query = 'INSERT INTO user (userId, userName, password, sex, phone) VALUES ("' + userId + '","' + userName + '","' + password + '","' + sex + '","' + phone + '");'
    let result = await pool.query(query)
    if (result) {
      jsonData = {
        flag: 'true',
        msg: '注册成功！'
      }
    } else {
      jsonData = {
        flag: 'false',
        msg: '注册失败！'
      }
    }
  }
  ctx.response.type = 'application/json;charset=UTF-8'
  ctx.body = jsonData
}

router.post('/register', register)

module.exports = router

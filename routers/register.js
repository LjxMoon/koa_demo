/*
 * @Author: DrMoon
 * @Date: 2018-02-08 17:54:03
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-07 17:37:16
 */

const router = require('koa-router')()
const pool = require('../config/database')
const uuidv1 = require('uuid/v1')

const register = async (ctx, next) => {
  await next()
  ctx.response.type = 'application/json;charset=UTF-8'
  let jsonData = {
    flag: '',
    msg: ''
  }
  const userName = ctx.request.body.userName || ''
  const password = ctx.request.body.password || ''
  const sex = ctx.request.body.sex || ''
  const phone = ctx.request.body.phone || ''
  let query = 'SELECT * FROM people WHERE `userName`="' + userName + '";'
  let result = await pool.query(query)
  if (result.length) {
    jsonData = {
      flag: 'false',
      msg: '该帐号已被注册！'
    }
  } else {
    let uuid = uuidv1()
    let query = 'INSERT INTO people (userId, userName, password, sex, phone) VALUES ("' + uuid + '","' + userName + '","' + password + '","' + sex + '","' + phone + '")'
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
  ctx.body = jsonData
}

router.post('./register', register)

module.exports = router

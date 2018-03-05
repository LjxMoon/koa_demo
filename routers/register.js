/*
 * @Author: DrMoon
 * @Date: 2018-02-08 17:54:03
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-05 17:58:40
 */

const mysql = require('promise-mysql')
const uuidv1 = require('uuid/v1')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
  connectionLimit: 10
})

const register = async (ctx, next) => {
  await next()
  const userName = ctx.request.body.userName || ''
  const password = ctx.request.body.password || ''
  const sex = ctx.request.body.sex || ''
  const phone = ctx.request.body.phone || ''
  ctx.response.type = 'application/json;charset=UTF-8'
  pool.query('SELECT * FROM people WHERE `userName`="' + userName + '";').then((rows) => {
    console.log(rows)
    if (rows.length) {
      ctx.response.body = {
        flag: 'false',
        msg: '该帐号已被注册！'
      }
    } else {
      let uuid = uuidv1()
      pool.query('INSERT INTO people (userId, userName, password, sex, phone) VALUES ("' + uuid + '","' + userName + '","' + password + '","' + sex + '","' + phone + '")').then((rows) => {
        console.log(rows)
        if (rows) {
          ctx.response.body = {
            flag: 'true',
            msg: '注册成功！'
          }
        } else {
          ctx.response.body = {
            flag: 'false',
            msg: '注册失败！'
          }
        }
      })
    }
  })
}

module.exports = {
  'POST /register': register
}

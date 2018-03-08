/*
 * @Author: DrMoon
 * @Date: 2018-03-08 19:08:55
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-08 19:13:20
 */

const jsonwebtoken = require('jsonwebtoken')

const jwt = {
  sign: (result) => {
    return jsonwebtoken.sign({
      data: result
    }, 'blog', { expiresIn: 60 * 60 })
  },
  verify: (token) => {
    return jsonwebtoken.verify(token, 'blog', (err, decode) => {
      return [err, decode]
    })
  }
}

module.exports = jwt

/*
 * @Author: DrMoon
 * @Date: 2018-03-08 19:08:55
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-03-09 10:06:58
 */

const jsonwebtoken = require('jsonwebtoken')

const jwt = {
  sign: (result) => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.sign({
        data: result
      }, 'blog', { expiresIn: 60 * 60 }, (err, decode) => {
        if (err) {
          reject(err)
        } else {
          resolve(decode)
        }
      })
    })
  },
  verify: (token) => {
    return new Promise((resolve, reject) => {
      jsonwebtoken.verify(token, 'blog', (err, decode) => {
        if (err) {
          reject(err)
        } else {
          resolve(decode)
        }
      })
    })
  }
}

module.exports = jwt

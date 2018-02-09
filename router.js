/*
 * @Author: DrMoon
 * @Date: 2018-02-09 10:18:41
 * @Last Modified by: DrMoon
 * @Last Modified time: 2018-02-09 10:33:12
 */

const fs = require('fs')
const path = require('path')

function addMapping (router, mapping) {
  for (let url in mapping) {
    if (url.startsWith('GET ')) {
      let path = url.substring(4)
      router.get(path, mapping[url])
      //   console.log(`register URL mapping: GET ${path}`);
    } else if (url.startsWith('POST ')) {
      let path = url.substring(5)
      router.post(path, mapping[url])
      //   console.log(`register URL mapping: POST ${path}`);
    } else {
      //   console.log(`invalid URL: ${url}`);
    }
  }
}

function addControllers (router) {
  // const files = fs.readdirSync(__dirname + '/routes')
  const files = fs.readdirSync(path.join(__dirname, 'routers'))
  const jsFiles = files.filter((f) => {
    return f.endsWith('.js')
  })

  for (let f of jsFiles) {
    // logger.info(`process controller: ${f}...`)
    // let mapping = require(__dirname + '/routes/' + f)
    let mapping = require(path.join(__dirname, 'routers', f))
    addMapping(router, mapping)
  }
}

module.exports = function (dir) {
  const controllersDir = dir || 'routes' // 如果不传参数，扫描目录默认为'controllers'
  const router = require('koa-router')()
  addControllers(router, controllersDir)
  return router.routes()
}

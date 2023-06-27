const fs = require('fs')

function registerRouters(app) {
  // 1.读取当前文件夹下的所有文件
  const dirs = fs.readdirSync(__dirname)
  const newDirs = dirs.filter(item => item.slice(-10) === '.router.js')
  newDirs.forEach(item => {
    const router = require(`./${item}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  })
}

module.exports = registerRouters
const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const labelController = require('../controller/label.controller')

const labelRouter = new KoaRouter({ prefix: '/api/label' })

// 创建一个标签
labelRouter.post('/', verifyAuth, labelController.create)
// 获取标签列表
labelRouter.get('/', labelController.list)

module.exports = labelRouter

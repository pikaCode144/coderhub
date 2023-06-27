const KoaRouter = require('@koa/router')
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware')
const loginController = require('../controller/login.controller')

const loginRouter = new KoaRouter({ prefix: '/api/login' })

loginRouter.post('/', verifyLogin, loginController.sign)
loginRouter.get('/test', verifyAuth, loginController.test)

module.exports = loginRouter

const KoaRouter = require('@koa/router')
const { verifyRegister, handlePassword } = require('../middleware/register.middleware')
const registerController = require('../controller/register.controller')

// 1.创建路由对象
const registerRouter = new KoaRouter({
  prefix: '/api/register'
})

// 2.定义路由中映射
// 2.1.用户注册接口
registerRouter.post('/', verifyRegister, handlePassword, registerController.create)

// 3.导出路由
module.exports = registerRouter
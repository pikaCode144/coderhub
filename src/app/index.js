const Koa = require('koa')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const registerRouters = require('../router')

const app = new Koa()

app.use(cors())
app.use(bodyParser())
// 自动注册路由
registerRouters(app)

module.exports = app
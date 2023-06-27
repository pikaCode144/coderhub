const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { handleAvatar } = require('../middleware/file.middleware')
const fileController = require('../controller/file.controller')

const fileRouter = new KoaRouter({ prefix: '/api/file' })

// file/avatar => 上传头像
fileRouter.post('/avatar', verifyAuth, handleAvatar, fileController.create)

// 为用户提供头像
fileRouter.get('/avatar/:userId', fileController.showAvatar)

module.exports = fileRouter

const jwt = require('jsonwebtoken')
const { USERNAME_OR_PASSWORD_ID_REQUIRED, USERNAME_IS_NOT_EXIST, PASSWORD_IS_ERROR, UNAUTHORIZATION } = require("../config/error-constants")
const userService = require('../service/user.service')
const md5Password = require("../utils/md5-password")
const { PUBLIC_KEY } = require('../config/screct')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body

  // 1.判断用户名和密码是否为空
  if (!username || !password) {
    return ctx.app.emit('error', USERNAME_OR_PASSWORD_ID_REQUIRED, ctx)
  }

  // 2.查询该用户是否在数据库中存在
  const users = await userService.findUserByUsername(username)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', USERNAME_IS_NOT_EXIST, ctx)
  }

  // 3.查询数据库中密码和用户传递的密码是否一致
  if (user.password !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_ERROR, ctx)
  }

  // 4.将user对象保存在ctx上，传给下一个中间件使用
  ctx.user = user

  next()
}

const verifyAuth = async (ctx, next) => {
  let result = null
  try {
    // 1.获取token
    const authorization = ctx.headers.authorization
    const token = authorization.split(' ')[1]
    // 2.验证token是否是有效
    // 2.1.获取token中信息
    result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })
  } catch(err) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  // 2.2.将token的信息保留下来
  ctx.user = result
  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth
}
const userService = require("../service/user.service")
const {
  USERNAME_OR_PASSWORD_ID_REQUIRED,
  USERNAME_IS_ALREADY_EXIST
} = require("../config/error-constants")
const md5Password = require("../utils/md5-password")

const verifyRegister = async (ctx, next) => {
  // 1.获取用户传递过来的信息
  const user = ctx.request.body

  // 2.验证客户端传递过来的user是否可以保存到数据库中
  // 2.1.验证用户名和密码是否为空
  const { username, password } = user
  if (!username || !password) {
    return ctx.app.emit("error", USERNAME_OR_PASSWORD_ID_REQUIRED, ctx)
  }

  // 2.2.判断username是否在数据库中已经存在
  const users = await userService.findUserByUsername(username)
  if (users.length) {
    return ctx.app.emit("error", USERNAME_IS_ALREADY_EXIST, ctx)
  }

  // 3.执行下一个中间件
  await next()
};

const handlePassword = async (ctx, next) => {
  // 1.取出密码
  const { password } = ctx.request.body

  // 2.对密码进行加密
  ctx.request.body.password = md5Password(password)

  // 3.执行下一个中间件
  await next()
}

module.exports = {
  verifyRegister,
  handlePassword
}

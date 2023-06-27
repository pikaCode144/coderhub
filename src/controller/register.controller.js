const userService = require("../service/user.service")

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body

    // 3.将user信息存储到数据库中
    const result = await userService.create(user)

    // 4.查看存储的结果，告知前端创建成功
    ctx.body = {
      code: 201,
      message: "创建用户成功~",
      data: result
    }
  }
}

module.exports = new UserController()

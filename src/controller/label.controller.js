const { LABEL_NAME_IS_REQUIRED } = require("../config/error-constants")
const labelService = require("../service/label.service")

class LabelController {
  // 创建标签
  async create(ctx, next) {
    const { name } = ctx.request.body
    if (!name) return ctx.app.emit('error', LABEL_NAME_IS_REQUIRED, ctx)

    const result = await labelService.create(name)

    ctx.body = {
      code: 201,
      message: '创建标签成功~',
      data: result
    }
  }
  
  // 返回标签列表
  async list(ctx, next) {
    const result = await labelService.list()
    
    ctx.body = {
      code: 200,
      message: '获取标签列表成功~',
      data: result
    }
  }
}

module.exports = new LabelController()

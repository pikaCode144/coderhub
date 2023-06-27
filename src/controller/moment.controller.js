const { CONTENT_IS_NULL } = require("../config/error-constants")
const labelService = require("../service/label.service")
const momentService = require("../service/moment.service")

class MomentController {
  async create(ctx, next) {
    // 1.获取动态的内容
    const { content } = ctx.request.body
    if (!content) return ctx.app.emit('error', CONTENT_IS_NULL, ctx)

    // 2.动态由谁发布(token)
    const { id } = ctx.user

    // 3.将动态相关的数据保存到数据库中
    const result = await momentService.create(content, id)

    ctx.body = {
      code: 201,
      data: result,
      message: '发表动态成功~'
    }
  }

  async list(ctx, next) {
    // 获取offset/size
    const { size, offset } = ctx.query
    
    // 从数据库查询列表数据
    const result = await momentService.queryList(size, offset)

    ctx.body = {
      code: 200,
      message: '获取动态列表成功~',
      data: result
    }
  }

  async detail(ctx, next) {
    // 1.获取动态的id
    const { momentId: id } = ctx.params

    // 从数据库查询详情数据
    const result = await momentService.queryById(id)
    
    ctx.body = {
      code: 200,
      message: '获取动态详情成功~',
      data: result[0]
    }
  }

  async update(ctx, next) {
    // 1.获取要修改的动态的id
    const { momentId } = ctx.params
    // 2.修改的内容
    const { content } = ctx.request.body
    // 3.判断内容不为空
    if (!content) return ctx.app.emit('error', MOMENT_CONTENT_IS_NULL, ctx)
    // 4.修改数据库动态
    const result = await momentService.updateContent(momentId, content)
    
    ctx.body = {
      code: 200,
      message: '修改动态成功~',
      data: result
    }
  }

  async remove(ctx, next) {
    // 1.获取要修改的动态的id
    const { momentId } = ctx.params
    // 2.操作数据库删除该动态
    const result = await momentService.remove(momentId)
    
    ctx.body = {
      code: 200,
      message: '删除动态成功~',
      data: result
    }
  }

  // 给动态添加标签
  async addLabels(ctx, next) {
    const labels = ctx.labels
    const { momentId } = ctx.params
    console.log(labels, momentId)

    // 将moment_id和label_id添加moment_label关系表
    try {
      for (const label of labels) {
        // 2.1.判断label_id是否已经和moment_id已经存在该数据
        const result = await labelService.hasLabel(momentId, label.id)
        if (result.length) continue
        await labelService.insertMomentIdAndLabelId(momentId, label.id)
      }
      
      ctx.body = {
        code: 201,
        message: '给该动态添加标签成功'
      }
    } catch(err) {
      ctx.body = {
        code: 3001,
        message: '为动态添加标签失败，请检查数据有问题~'
      }
    }
  }
}

module.exports = new MomentController()
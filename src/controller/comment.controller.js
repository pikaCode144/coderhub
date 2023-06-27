const { CONTENT_IS_NULL, MOMENTID_IS_REQUIRED, COMMENTID_IS_REQUIRED } = require("../config/error-constants")
const commentService = require("../service/comment.service")

class CommentController {
  // 发表一条评论
  async create(ctx, next) {
    // 1.获取body中参数
    const { content, momentId } = ctx.request.body
    const { id } = ctx.user
    if (!content) return ctx.app.emit('error', CONTENT_IS_NULL, ctx)
    if (!momentId) return ctx.app.emit('error', MOMENTID_IS_REQUIRED, ctx)

    // 2.操作数据库，将数据进行存储
    const result = await commentService.create(content, momentId, id)
    
    ctx.body = {
      code: 201,
      message: '发表评论成功~',
      data: result
    }
  }

  // 回复评论
  async reply(ctx, next) {
    // 1.获取body中参数
    const { content, momentId, commentId } = ctx.request.body
    const { id } = ctx.user
    if (!content) return ctx.app.emit('error', CONTENT_IS_NULL, ctx)
    if (!momentId) return ctx.app.emit('error', MOMENTID_IS_REQUIRED, ctx)
    if (!commentId) return ctx.app.emit('error', COMMENTID_IS_REQUIRED, ctx)

    // 2.操作数据库，将数据进行存储
    const result = await commentService.reply(content, momentId, id, commentId)

    ctx.body = {
      code: 200,
      message: '回复评论成功~',
      data: result
    }
  }
}

module.exports = new CommentController()

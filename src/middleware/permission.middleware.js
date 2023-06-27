const { OPERATION_IS_NOT_ALLOWED } = require("../config/error-constants")
const permissionService = require("../service/permission.service")

// 动态验证权限，路由的params参数xxxId，xxx对应的必须是表名
const verifyPermission = async (ctx, next) => {
  // 1.获取登录用户的id/和要修改的动态的id的momentId
  const { id } = ctx.user

  // 动态权限
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  // 从params参数中截取表名
  const resourceName = keyName.replace('Id', '')

  // 2.查询用户id和momentId都相等的数据
  const isPermission = await permissionService.checkResouce(resourceName, resourceId, id)
  if (!isPermission) return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)

  await next()
}

module.exports = {
  verifyPermission
}
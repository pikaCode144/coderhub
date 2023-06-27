const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const momentController = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')

const momentRouter = new KoaRouter({ prefix: '/api/moment' })

// 编写接口
// 1.增: 新增动态
momentRouter.post('/', verifyAuth, momentController.create)
// 2.查: 查询动态
momentRouter.get('/', momentController.list)
momentRouter.get('/:momentId', momentController.detail)
// 3.改: 修改动态
// 验证: 只有登录的情况下才能更改动态
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, momentController.update)
// 4.删: 删除动态
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, momentController.remove)

// 5.添加标签：
/**
 * 中间件：
 *  1.是否登录
 *  2.验证是否有操作这个动态的权限
 *  3.额外中间件：验证label的name是否已经存在于label表中
 *    如果存在，那么直接使用即可
 *    如果没有存在，那么需要先将label的name添加label表
 *  4.最终步骤
 *    所有的labels都在已经在label表
 *    动态 2，和labels关系，添加到关系表中
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, momentController.addLabels)

module.exports = momentRouter

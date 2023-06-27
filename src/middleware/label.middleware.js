const { LABELS_IS_REQUIRED } = require("../config/error-constants")
const labelService = require("../service/label.service")

/**
 * 传入labels时，不确定labels是否有name已经存在label表中
 * 所以需要将labels都保存在label中，获取labels的id
 * 将获取的数据传递给下一个中间件
 */
const verifyLabelExists = async (ctx, next) => {
  // 1.获取客户端传递多来所有的labels
  const { labels } = ctx.request.body
  if (!labels.length) return ctx.app.emit('error', LABELS_IS_REQUIRED, ctx)

  // 2.判断所有的labels中的name是否已经存在于label表
  let newLabels = []
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name)
    const labelObj = { name }
    if (result.length) { // 如果存在返回标签的id
      labelObj.id = result[0].id
    } else { // 如果不存在添加标签，并返回标签的id
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId
    }
    newLabels.push(labelObj)
  }

  // 3.多有的labels都变成[{ name: '篮球', id: 1 }]
  ctx.labels = newLabels
  
  await next()
}

module.exports = {
  verifyLabelExists
}
const fs = require('fs')
const fileService = require("../service/file.service")
const { AVATAR_UPLOAD_PATH } = require('../config/path')
const { SERVER_PORT, SERVER_HOST } = require('../config/server')

class FileController {
  async create(ctx, next) {
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    await fileService.create(filename, mimetype, size, id)

    // 将头像的地址信息，保存在user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/api/file/avatar/${id}`
    await fileService.insertUserAvatarUrl(avatarUrl, id)
    
    ctx.body = {
      code: 201,
      message: '头像上传成功~',
      data: avatarUrl
    }
  }

  // 展示头像
  async showAvatar(ctx, next) {
    // 1.获取用户的id
    const { userId } = ctx.params

    // 2.获取userId对应的头像信息
    const avatarInfo = await fileService.queryAvatarInfo(userId)

    const { filename, mimetype } = avatarInfo
    
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${AVATAR_UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new FileController()

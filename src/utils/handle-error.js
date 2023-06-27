const app = require('../app')
const { USERNAME_OR_PASSWORD_ID_REQUIRED, USERNAME_IS_ALREADY_EXIST, USERNAME_IS_NOT_EXIST, PASSWORD_IS_ERROR, UNAUTHORIZATION, CONTENT_IS_NULL, OPERATION_IS_NOT_ALLOWED, MOMENTID_IS_REQUIRED, COMMENTID_IS_REQUIRED, LABEL_NAME_IS_REQUIRED, LABELS_IS_REQUIRED } = require('../config/error-constants')

app.on('error', (error, ctx) => {
  let code, message = ''
  switch (error) {
    case USERNAME_OR_PASSWORD_ID_REQUIRED:
      code = -1001
      message = '用户名或者密码不能为空~'
      break
    case USERNAME_IS_ALREADY_EXIST:
      code = -1002
      message = '用户名已经被占用，请输入新的用户名~'
      break
    case USERNAME_IS_NOT_EXIST:
      code = -1003
      message = '该用户不存在~'
      break
    case PASSWORD_IS_ERROR:
      code = -1004
      message = '密码错误~'
      break
    case UNAUTHORIZATION:
      code = -1005
      message = '无效的token或者token已经过期`'
      break
    case CONTENT_IS_NULL:
      code = -1006
      message = '内容不能为空~'
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -1007
      message = '没有操作该资源的权限，或者该资源已经不存在~'
      break
    case MOMENTID_IS_REQUIRED:
      code = -1008
      message = 'momentId是必传的~'
      break
    case COMMENTID_IS_REQUIRED:
      code = -1009
      message = 'commentId是必传的~'
      break
    case LABEL_NAME_IS_REQUIRED:
      code = -1010
      message = '标签名是必传的~'
      break
    case LABELS_IS_REQUIRED:
      code = -1011
      message = '给动态添加的标签列表是必传的~'
      break
  }
  ctx.body = {
    code,
    message
  }
})
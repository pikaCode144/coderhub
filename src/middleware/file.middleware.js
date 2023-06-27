const multer = require('@koa/multer')
const { AVATAR_UPLOAD_PATH } = require('../config/path')

// 定义中间件
// const uploadAvatar = multer({
//   storage: multer.diskStorage({
//     destination(req, file, callback) {
//       callback(null, './uploads')
//     },
//     filename(req, file, callback) {
//       callback(null, Date.now() + '_' + file.originalname)
//     }
//   })
// })

const uploadAvatar = multer({
  dest: AVATAR_UPLOAD_PATH
})
const handleAvatar = uploadAvatar.single('avatar')

module.exports = {
  handleAvatar
}

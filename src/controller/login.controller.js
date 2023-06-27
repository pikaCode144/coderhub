const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config/screct')

class LoginController {
  sign(ctx, next) {
    // 4.颁发令牌，传入token
    const { id, name } = ctx.user
    const token = jwt.sign({ id, username: name }, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 2 * 60 * 60
    })
    
    ctx.body = {
      code: 200,
      data: token,
      message: '登录成功~'
    }
  }

  test(ctx, next) {
    ctx.body = {
      code: 200,
      message: 'token验证通过，可以访问数据~'
    }
  }
}

module.exports = new LoginController()
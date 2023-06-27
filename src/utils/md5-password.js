const crypto = require('crypto')

function md5Password(password) {
  const md5 = crypto.createHash('md5')
  // md5.update()加密出来的是二进制的.digest('hex)是转化为十六进制的（十六进制用的多）
  const md5pwd = md5.update(password).digest('hex')
  return md5pwd
}

module.exports = md5Password
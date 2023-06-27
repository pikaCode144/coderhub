const connection = require('../app/database')

class UserService {
  // 创建用户
  async create(user) {
    // 1.获取用户 user
    const { username, password } = user

    // 2.拼接statement
    const statement = 'INSERT INTO user (`name`, `password`) VALUES (?, ?);'

    // 3.执行sql语句
    const [result] = await connection.execute(statement, [username, password])

    return result
  }

  // 查看用户是否被创建
  async findUserByUsername(username) {
    // 查询statement
    const statement = 'SELECT * FROM `user` WHERE `name` = ?;'

    // 执行sql语句
    const [values] = await connection.execute(statement, [username])
    
    return values
  }
}

module.exports = new UserService()
const connection = require("../app/database")

class CommentService {
  // 插入一条评论
  async create(content, momentId, id) {
    const statement = 'INSERT INTO `comment` (content, moment_id, user_id) VALUES (?, ?, ?);'

    const [result] = await connection.execute(statement, [content, momentId, id])
    
    return result
  }

  // 回复一条评论
  async reply(content, momentId, id, commentId) {
    const statement = 'INSERT INTO `comment` (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?);'

    const [result] = await connection.execute(statement, [content, momentId, id, commentId])

    return result
  }
}

module.exports = new CommentService()

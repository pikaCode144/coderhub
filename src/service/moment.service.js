const connection = require("../app/database")

class MomentService {
  // 插入一条动态
  async create(content, userId) {
    const statement = 'INSERT INTO moment (content, user_id) VALUES (?, ?);'

    const [result] = await connection.execute(statement, [content, userId])

    return result
  }

  // 查询动态列表
  async queryList(size = 10, offset = 0) {
    const statement = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT(
        'id', u.id,
        'username', u.name,
        'avatarUrl', u.avatar_url,
        'createTime', u.createAt,
        'updateTime', u.updateAt
      ) user_info,
      (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LIMIT ? OFFSET ?;
    `

    const [values] = await connection.execute(statement, [size, offset])

    return values
  }

  async queryById(id) {
    const statement = `
    SELECT
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT(
        'id', u.id, 'username', u.name, 'avatarUrl', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt
      ) user_info,
      (
        SELECT
          JSON_ARRAYAGG(JSON_OBJECT(
            'id', c.id, 'content', c.content, 'commentId', c.comment_id,
            'createTime', c.createAt, 'updateTime', c.updateAt,
            'user', JSON_OBJECT(
              'id', cu.id, 'username', cu.name, 'avatarUrl', cu.avatar_url, 'createTime', cu.createAt, 'updateTime', cu.updateAt
            )
          ))
          FROM comment c
          LEFT JOIN user cu ON cu.id = c.user_id
          WHERE c.moment_id = m.id
      ) comments,
      JSON_ARRAYAGG(JSON_OBJECT(
        'id', l.id, 'name', l.name
      )) labels
      FROM moment m
      LEFT JOIN user u ON u.id = m.user_id
      LEFT JOIN moment_label ml ON ml.moment_id = m.id
      LEFT JOIN label l ON l.id = ml.label_id 
      WHERE m.id = 4
      GROUP BY m.id;
    `

    const [values] = await connection.execute(statement, [id])

    return values
  }

  async updateContent(id, content) {
    const statement = 'UPDATE moment SET content = ? WHERE id = ?;'

    const [result] = await connection.execute(statement, [content, id])

    return result
  }

  async remove(id) {
    const statement = 'DELETE FROM moment WHERE id = ?;'

    const [result] = await connection.execute(statement, [id])

    return result
  }
}

module.exports = new MomentService()
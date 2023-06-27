const dotenv = require('dotenv')

dotenv.config()

// const SERVER_PORT = 8111

module.exports = {
  SERVER_PORT,
  SERVER_HOST
} = process.env
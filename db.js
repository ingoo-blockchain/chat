const mysql = require('mysql2/promise')

const pool = mysql.createPool({
    host:'localhost',
    user:'ingoo2',
    password:'ingoo2',
    database:'express_board',
})

module.exports = pool
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const User = require('./user')(db)
const Blog = require('./blog')(db)

module.exports = {
    User,
    Blog,
    db
}
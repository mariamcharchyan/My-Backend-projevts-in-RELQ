module.exports = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER primary key,
        username TEXT, 
        password TEXT);`)
}
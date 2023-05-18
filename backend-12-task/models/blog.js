module.exports = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS blog(
        id INTEGER primary key,
        content TEXT, 
        recording DATE,
        url TEXT,
        user_id INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES user(id)
        );`)   
}
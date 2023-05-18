const express = require('express')
const user_router = require('./routes/user_routs')
const blog_router = require('./routes/blog_routs')
// const sqlite3 = require('sqlite3').verbose()
// const jwt = require('jsonwebtoken')
const app = express()
const port = 5000
const db = require('./models').db
app.use(express.json())

app.use('/user',user_router)
app.use('/blog',blog_router)

app.listen(port, () => {
    console.log(`Port ${port}`);
})

const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')
const app = express()
const port = 4000
const cors = require('cors')

app.use(cors());
app.use(express.json());

let db = new sqlite3.Database('database.db')
db.run('CREATE TABLE IF NOT EXISTS users (username TEXT, password TEXT)')

const SECRET = "supersecrettoken"
function generateAccessToken(username) {
    return jwt.sign({username}, SECRET, { expiresIn: '36000s' });
}

// let token = generateAccessToken("tests")
// console.log(token)

function checkUser(req,res){
    const token=req.headers.authorization
    const decoded=jwt.decode(token)
    console.log(decoded);
    const username = decoded.username
    return username
  }

function authenticateToken(req, res, next) {
    const token = req.headers.authorization
    console.log(token);
    if (token == null) return res.sendStatus(401) 
    jwt.verify(token, SECRET, (err, user) => {
      if (err) return res.sendStatus(403) 
      next()
    })
}
function getHello(req,res){
    const name = checkUser(req, res)
    res.send(`Hello ${name} `)
}
app.get('/', authenticateToken, getHello)

app.post('/register',(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const hashed_password = CryptoJS.SHA256(password).toString();
    let sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.run(sql,[username, hashed_password], function(err){
        if(err){
            res.send(JSON.stringify({status: 'Error Reigstering'}));
        }
        res.send(JSON.stringify({status: 'User Created'}));
    })
})

app.post('/login', (req, res) => {
  const username = req.body.username
  const password = req.body.password
  const hashed_password = CryptoJS.SHA256(password).toString();
  const token = generateAccessToken(username);
  let sql = "SELECT * FROM users WHERE username = ?"
  db.get(sql,[username], function(err, row){
    console.log(row)
    if(username == row.username && hashed_password == row.password) {
        res.send(JSON.stringify({status: "Logged in", jwt: token}));
    }else {
        res.send(JSON.stringify({status: "Wrong credentials"}));
    }
  }) 
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})

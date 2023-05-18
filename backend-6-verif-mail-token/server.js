const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const CryptoJS = require('crypto-js');
const app = express()
app.use(express.json())
const port = 5000
const jwt = require('jsonwebtoken');
require("dotenv").config();
const nodemailer = require('nodemailer');

const  SECRET = "mariam"


const db = new sqlite3.Database('database.db')
db.run("CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY, username TEXT, email TEXT, password TEXT, is_verified INTEGER DEFAULT 0)")


function generateAccessToken(username,email) {
  return jwt.sign({username, email}, SECRET, { expiresIn: '36000s' });
}

function authenticateToken(req, res, next) {
  const token = req.headers.authorization
  console.log(token);
  if (token == null) return res.sendStatus(401) 
  
   jwt.verify(token, SECRET, (err, row) => {
    if (err) return res.sendStatus(403)

    next()  
    }
  )
}

app.get('/verify/:code',(req,res)=>{
    const token = req.params.code
    const decoded= jwt.verify(token,SECRET)
    db.run('UPDATE users SET is_verified=1 WHERE email=?', [decoded.email], (err)=>{
        if(err){
            res.send("err")
        }
        res.send('Verified')
    })
})

app.get('/', authenticateToken, (req, res) => {
    const token = req.headers.authorization
    const decoded = jwt.decode(token)
    console.log(decoded);
    db.get("SELECT * FROM users WHERE email=?", [decoded.email], (err,row)=>{
        console.log(row);
        if(row.is_verified===0){
           return res.send("Not verified")
        }
        return res.send("Hello")
    })
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const hashed_password = CryptoJS.SHA256(password).toString();
    const sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)"
    db.run(sql, [username,email,hashed_password], function(err){
          if(err){
          console.log(err);
          return res.send(JSON.stringify({status: "Error Registering"}))
      }
      let token = generateAccessToken(username,email)
      send_Mail(email,token)
      return res.send(JSON.stringify({status: "User Created"}))
      })  
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email
    const hashed_password = CryptoJS.SHA256(password).toString();

    const sql = "SELECT * from users WHERE email = ?"
    db.get(sql,[email], function(err, row){  
        console.log(row);  
        if(email == row.email && hashed_password == row.password) {
            let token = generateAccessToken(username,row.email)
            console.log(token)
            res.send(JSON.stringify({status: "Logged in",jwt:token}));
        }else {
            res.send(JSON.stringify({status: "Wrong credentials"}));
        }  
    }) 
})

function send_Mail(mail, code){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth:{
            user: "mariam.charchyan.96@gmail.com",
            pass: "kslgcjoqkcxkmhqr"
            },
        tls:{
            rejectUnauthorized: false
            }
    });
        
    const mailOptions = {
        from: "mariam.charchyan.96@gmail.com",
        to: mail,
        subject: 'Sending Email using Node.js',
        text: `http://localhost:5000/verify/${code}`
    };
    
    transporter.sendMail(mailOptions, function(error, info){ //sendMail() մեթոդա
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });
} 


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
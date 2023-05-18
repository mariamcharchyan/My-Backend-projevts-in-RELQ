// //db-um naxnakan tvyalneri avelacum(seeding)
// const sqlite3 = require('sqlite3')
// const express = require('express')
// const port = 3000
// const app = express()

// const db = new sqlite3.Database('main.db')
// db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, post TEXT)")

//  function seed (){
//         //--jnjum- noric enq avelacnum---bayc uni terutyun----oetq e avelacnel-async--
//         db.run("DROP table if exists posts")
//         db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, post TEXT)")
//     for(let i=0; i<10; i++){
//         db.run("INSERT INTO posts (title, post) VALUES (?, ?)", [`title ${i}`, `posts ${i}`], (err)=>{
//           if (err){
//             return err.message
//           }
//         })
//     }
//     return "seeding okay"
// }
// app.get ("/posts", (req, res)=>{
// db.all("SELECT * FROM posts", [], (err, data)=>{
//     res.send(data)
// })
// })

// app.post("/seed", (req, res)=>{

//     const result= seed ()
//     res.send(result)
// })


// app.listen(port, ()=>{
//     console.log(`Listening on port ${port}`)
// })


//----use----async----------------
const sqlite3 = require('sqlite3')
const express = require('express')
const port = 3000
const app = express()
const { promisify } = require('util')

const db = new sqlite3.Database('main.db')
db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, post TEXT)")

async function seed() {
    await promisify(db.run).bind(db)("DROP table if exists posts")
    await promisify(db.run).bind(db)("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY AUTOINCREMENT, title STRING, post TEXT)")
  
    for (let i = 0; i < 10; i++) {
        await promisify(db.run).bind(db)("INSERT INTO posts (title, post) VALUES (?, ?)", [`title ${i}`, `posts ${i}`])
    }
    return "seeding okay"
}

app.get("/posts", async (req, res) => {
    try {
        const data = await promisify(db.all).bind(db)("SELECT * FROM posts", [])
        res.send(data)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})
  
app.post("/seed", async (req, res) => {
    try {
        const result = await seed()
        res.send(result)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})
  
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})


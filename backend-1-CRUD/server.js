//-----------------4---------app.post---------------------------------------
const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 3000

const db = new sqlite.Database('booksDatabase.db', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('OK');
    }
});

app.use(express.json());

app.get('/', (req, res) => {
    db.all('SELECT * FROM books', [], (err, data) => {
        res.send(data)
    })
})

// app.get('/books', (req, res) => {
//     // const id = req.params.id
//     db.get('SELECT * FROM books WHERE id=?', [id], (err, data) => {
//         res.send(data)
//     })
// })

app.post('/',(req,res) => {
    // db.run('INSERT INTO books (name, date_published, page_count, genre) VALUES (?,?,?,?)',[req.body.name,req.body.date_published,req.body.page_count,req.body.genre])
    db.get('INSERT INTO books (name, date_published, page_count, genre) VALUES (?,?,?,?)',[req.body.name,req.body.date_published,req.body.page_count,req.body.genre])
    console.log(req.body)
    res.send('OK OK')
})
app.listen(port)
//-----------------3--------------booksDatabase.db----------------------------------
            // const express = require('express')
            // const sqlite = require('sqlite3').verbose()
            // const app = express()
            // const port = 3000

            // const db = new sqlite.Database('booksDatabase.db');

            // app.get('/', (req, res) => {
            //     db.all('SELECT * FROM books', [], (err, data) => {
            //         res.send(data)
            //     })
            // })

            // app.get('/books/:id', (req, res) => {
            //     const id = req.params.id
            //     db.get('SELECT * FROM books WHERE id=?', [id], (err, data) => {
            //         res.send(data)
            //     })
            // })

            // app.listen(port)


//-----------------2-------database.db-----------------------------------------
        // const express = require('express')
        // const sqlite = require('sqlite3').verbose()
        // const app = express()
        // const port = 3000

        // // const db = sqlite.Database('database.db');
        // const db = new sqlite.Database('database.db', (err) => {
        //     if (err) {
        //         console.log(err)
        //     }
        //     else {
        //         console.log("OK")
        //     }
        // })

        // app.get('/', (req, res) => {
        //     db.all('SELECT * FROM users', [], (err, data) => {
        //         res.send(data)
        //     })
        // })

        // app.get('/users/:id', (req, res) => {
        //     const id = req.params.id
        //     db.get('SELECT * FROM users WHERE id=?', [id], (err, data) => {
        //         res.send(data)
        //     })
        //     // res.send(data[id])
        // })

        // app.listen(port)



//------------------1---------const data----------------------------

        // const data = [{name: 'jon', age:25},{name: 'maks', age:27}]

        // app.get('/', (req, res) => {
        //     res.send(data)
        // })

        // //params?
        // app.get('/users/:id', (req, res) => {
        //     const id = req.params.id
        //     res.send(data[id])
        // })

        //   //  query
        // app.get('/users', (req, res) => {
        //     const id = req.query.id
        //     res.send(id)
        // })

        // app.listen(port)
        // app.listen(port, () => {
        //     console.log(`Example app listening on port ${port}`)
        // })
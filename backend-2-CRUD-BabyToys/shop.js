const express = require('express')
const sqlite = require('sqlite3').verbose()
const app = express()
const port = 3001
const cors = require('cors')

app.use(cors());//http-n haskanalu hamar
app.use(express.json());//post-i hamar

const db = new sqlite.Database('shopToys.db', (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('OK');
    }
});

app.get('/', (req, res) => {
    db.all('SELECT * FROM toys', [], (err, data) => {
        res.send(data)
    })
})

app.get('/toy/:id', (req, res) => {
    const id = req.params.id
    db.get('SELECT * FROM toys WHERE id=?', [id], (err, data) => {
        res.send(data)
    })
})

app.post('/',(req,res) => {
    const img = req.body.img;
    const name = req.body.name;
    const price = req.body. price;
    const description = req.body.description;
    db.get('INSERT INTO toys (img, name, price, description) VALUES (?,?,?,?)',[img, name, price, description])
    console.log(req.body)
    res.send('OK OK')
})

app.delete('/toy/delete/:id', (req, res) => {
    const id = req.params.id;
    db.get('DELETE FROM toys WHERE id=?', [id], (err, data) => {
    res.send(`Toy with ID ${id} has been deleted`)
    })
  });


app.put('/toy/:id', (req, res) => {
    const id = req.params.id;
    const img = req.body.img;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    console.log(id,img,name,price,description);
    db.run('UPDATE toys SET img=?, name=?, price=?, description=? WHERE id=?',
        [img, name, price, description, id], 
        (err, data) => {
        res.send(`Toy with ID ${id} has been update`)
    })
  });

app.listen(port)
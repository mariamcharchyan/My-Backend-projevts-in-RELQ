const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')

const app = express();
const port = 3003;

app.use(cors());

const db = new sqlite3.Database('database.db');

app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  
  // First, get the total count of products
  db.get('SELECT COUNT(*) as count FROM products', (err, countRow) => {
    if (err) {
      console.log(err.message);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    const count = countRow.count;

    // Then, retrieve the products with the limit and offset
    const sql = 'SELECT * FROM products LIMIT ? OFFSET ?';
    db.all(sql, [limit, offset], (err, row) => {
      if (err) {
        console.log(err.message);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }

      res.json({ products: row, count: count });
    });
  });
}); 
// app.get('/products',(req,res)=>{
//   const limit = req.query.limit;
//   const offset = req.query.offset;
//   console.log(limit,offset);
//   const sql = 'SELECT * FROM products limit ? offset ?';
//   db.all(sql,[limit, offset],(err,row)=>{
//       res.json(row)
//   })
// })
//http://localhost:3003/produqts?limit=2&offset=5

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
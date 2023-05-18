const express = require('express');
const multer = require('multer');
const fs = require('fs')

const app = express();
const PORT = 3001;
app.use(express.static('public'))

// const storage = multer.diskStorage({
//     destination: (req,file,cb)=>{
//         cb(null,'./images')
//     },
//     filename: (req,file,cb)=>{
//         cb(null, file.originalname)
//     }
// })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      let count = 1;
      if (fs.existsSync('./image_count.txt')) {
        count = parseInt(fs.readFileSync('./image_count.txt')) + 1;
      }
      fs.writeFileSync('./image_count.txt', count.toString());
      const extension = file.originalname.split('.').pop();
      const newFilename = `${count}.${extension}`;
      cb(null, newFilename);
    }
  })

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('photo'),(req,res)=>{
    if(req.file){
        res.json('success')
    }else{
        res.json('error')
    }
})

app.get('/images/:name', (req, res) => {
    const image_name = req.params.name
    fs.readFile(`./images/${image_name}`, function (err, data) {
      if (err) return res.send(err);
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.end(data);
    });
  })

app.listen(PORT, () => {
    console.log('Listening at ' + PORT );
});

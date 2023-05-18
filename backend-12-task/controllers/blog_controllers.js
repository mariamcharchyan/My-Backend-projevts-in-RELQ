const { db } = require("../models");

async function createBlog(req,res){
    console.log(req.body);
    const{content,recording,url,user_id}=req.body
         db.run('INSERT INTO blog (content,recording,url,user_id) VALUES(?,?,?,?)', 
         [content,recording,url,user_id],
         (err)=>{
          if(err){
              res.send(JSON.stringify({response:'Something went wrong'}));
          }
          res.send(JSON.stringify({response:"Product Created"}));
      })
       
 }

 async function allBlogs(req,res){
    db.all('SELECT * FROM blog', (err, blogs) => {
        if(err){
            res.send(JSON.stringify({response:'Something went wrong'}));
        }
        res.send(blogs)
})
}

async function blogUser(req, res) {
    db.all('SELECT blog.*, users.username FROM blog JOIN users ON users.id = blog.user_id', [], (err, data) => {
      if (err) {
        // 
        res.status(500).send(JSON.stringify({ response: 'Something went wrong' }));
        return;
      }
      res.send(data);
    })
  }


module.exports = {createBlog, allBlogs, blogUser}
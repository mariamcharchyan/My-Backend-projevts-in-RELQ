const express = require('express');
const blog_router = express.Router();
const blog = require('../controllers/blog_controllers')

blog_router.post('/createblog',blog.createBlog)
blog_router.get('/allblogs',blog.allBlogs)
blog_router.get('/bloguser',blog.blogUser)


module.exports = blog_router
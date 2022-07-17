const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')
const { request, response } = require('express')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title && !body.url) {
    return response.status(400).end()
  }

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const user = await User.findById(decodedToken.id)

  //const user = await User.findById(body.userId)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  savedBlog

  response.status(201).json(savedBlog)
})

// blogsRouter.post('/:id/comments'), async (request, response) => {
//   const body = request.body
//   console.log(body)
// }

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(user)

  blogId = mongoose.Types.ObjectId(request.params.id) 

  blog = await Blog.findById(blogId)
  if (!blog) return (response.status(404).json({ error: "blog doesn't exist"}))

  if ( blog.user.toString() === user.id.toString() ) {
    await Blog.findByIdAndRemove(blogId)
    return response.status(204).end()
  }
  return response.status(401).end()


})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes, comments} = request.body

  if (!request.token) {
    return response.status(401).json({ error: 'token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = {
    title: title,
    author: author,
    url: url,
    likes: likes,
    comments: comments
  } 

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  console.log('ASDASDASDASDASD',updatedBlog)
  response.status(204).json(updatedBlog)
})



module.exports = blogsRouter
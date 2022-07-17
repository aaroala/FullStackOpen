const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const totalLikes = require('../utils/likes_counter')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})


test('make new json', async () => {
  const newBlog = {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)

  const title = response.body.map(r => r.title)
  expect(title).toContain('Type wars')
})

test('like test', async () => {
  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
  
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(totalLikes.totalLikes(response.body))
    .toEqual(totalLikes.totalLikes(helper.initialBlogs))

})

test('blog has id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.toBeDefined())
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)
})

test('the first note is about HTTP methods', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].title).toBe('Go To Statement Considered Harmful')
})

test('id field is correct', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('no url or title', async () => {
  const newBlog = {
    author: "Michael Chan",
    likes: 4
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const titles = blogsAtEnd.map(r => r.title)

  expect(titles).not.toContain(blogToDelete.title)
})

test('update blog likes', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const updatedBlog = JSON.parse(JSON.stringify(blogsAtStart[0]))
  updatedBlog.likes = 123123

  await api
    .put(`/api/blogs/${updatedBlog._id}`)
    .send(updatedBlog)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const likes = blogsAtEnd.map(r => r.likes)

  expect(likes).toContain(123123)
})


afterAll(() => {
  mongoose.connection.close()
})

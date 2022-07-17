import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    /*
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    */
    updateBlog(state, action) {
      const id = action.payload.id
      const changedBlog = action.payload
      return state.map(blog =>
        blog.id !== id ? blog : changedBlog
      )
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    removeBlog(state, action) {
      const id = action.payload.id
      return state.filter(blog => blog.id !== id)
    }
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogsService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogsService.remove(blog.id)
    dispatch(removeBlog(blog))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    await blogsService.update(updatedBlog)
    console.log('liked:', updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const updatedBlog = { ...blog, comments: [...blog.comments].concat(comment) }
    await blogsService.update(updatedBlog)
    console.log('updated:', updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const { appendBlog, setBlogs, updateBlog, removeBlog } = blogSlice.actions
export default blogSlice.reducer
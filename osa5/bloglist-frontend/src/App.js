import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [user, setUser] = useState(null)

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const refresh = async () => {
    const newBlogs = await blogService.getAll()
    setBlogs( newBlogs )
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notify(`Logged in as ${user.username}`)
    } catch (exception) {
      notify('wrong username or password', 'alert')
    }
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    await blogService.create(blogObject)
    refresh()
    notify(`new blog "${blogObject.title}" by "${blogObject.author}" has been added`)
  }

  const blogList = () => {
    blogs.sort((a, b) => (b.likes - a.likes))
    return(
      blogs.map(blog =>
        <Blog key={blog.id}
          blog={blog}
          user={user}
          addLike={() => addLike(blog)}
          removeBlog={() => removeBlog(blog)} />
      )
    )
  }

  const addLike = async (blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    await blogService.update(blog.id, updatedBlog)
    blog.likes = blog.likes + 1

  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      notify('Blog removed')
      refresh()
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    notify('logged out')
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Notification notification={notification} />
      {user === null ?
        <div>
          <h2>Login</h2>
          <LoginForm handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword} />
        </div> :
        <div>
          <h2>blogs</h2>
          {user.username} logged in
          <button onClick={logout}>Logout</button>
          <h2>Create new blog</h2>
          <Togglable buttonLabel="create blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          <div id="blogs-list">
            { blogList() }
          </div>
        </div>
      }

    </div>
  )
}

export default App

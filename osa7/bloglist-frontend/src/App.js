import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import blogService from './services/blogs'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { setUser as setCurrentUser } from './reducers/currentUserReducer'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Navbar from './components/Menu'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setCurrentUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const currentUser = useSelector(state => state.currentUser)

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setCurrentUser(null))
    dispatch(setNotification('logged out'))
  }

  return (
    <div className='container'>
      <Router>
        <Notification />
        {currentUser === null ?
          <LoginForm />
          :
          <div>
            <Navbar logout={logout}/>
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
          </div>
        }
      </Router>
    </div>
  )
}

export default App

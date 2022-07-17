import { useState } from 'react'
import { useDispatch } from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { setUser } from '../reducers/currentUserReducer'
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification(`Logged in as ${user.username}`))
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'alert'))
    }
  }
  return(
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control type="text" name="username" placeholder='Enter username' onChange={({ target }) => setUsername(target.value)} />
          <Form.Label>password:</Form.Label>
          <Form.Control type="password" placeholder='Enter password' onChange={({ target }) => setPassword(target.value)}/>
          <Button variant="primary" type="submit">login</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm

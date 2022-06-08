import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, user, addLike, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return(
    <div style={blogStyle} onClick={toggleVisibility} data-testid="clickableText">
      {blog.title} {blog.author}
      <div style={showWhenVisible}>
        {blog.url} <br />
        likes {blog.likes}
        <button onClick={addLike}>like</button> <br />
        {blog.user.name} <br />
        {user.username === blog.user.username ?
          <div>
            <button onClick={removeBlog} value={blog.id}>remove</button>
          </div>
          :
          <div></div>
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
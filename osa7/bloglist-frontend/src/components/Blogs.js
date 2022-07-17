import { useRef } from 'react'
import Togglable from './Toggable'
import BlogList from './BlogList'
import BlogForm from './BlogForm'


const Blogs = () => {
  const blogFormRef = useRef()
  const blogToggle = () => {blogFormRef.current.toggleVisibility()}
  return(
    <div>
      <h2>Blog App</h2>
      <BlogList/>
      <h2>Create new blog</h2>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm blogToggle={blogToggle} />
      </Togglable>
    </div>

  )
}
export default Blogs
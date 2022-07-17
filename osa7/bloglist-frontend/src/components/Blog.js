import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import CommentForm from './CommentForm'
import CommentList from './CommentList'

const Blog = () => {
  const currentUser = useSelector(state => state.currentUser)
  const dispatch = useDispatch()

  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  if (blogs === null || blogs.length === 0) return (<>Not found</>)
  const blog = blogs.find(( u ) => u.id === id)
  if (blog === undefined) return(<div>Content has been deleted or does not exist</div>)

  const blogLiked = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(setNotification(` blog "${blog.title}" by "${blog.author}" has been liked`))
  }

  const removeBlog = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await dispatch(deleteBlog(blog))
      //await blogService.remove(blog.id)
      dispatch(setNotification('Blog removed'))
    }
  }


  return(
    <div>
      <h2>{blog.title}</h2>
      likes {blog.likes}
      <button onClick={() => blogLiked(blog)}>like</button> <br />
      {blog.url} <br />
      <>added by </>
      <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
      {currentUser.username === blog.user.username ?
        <div>
          <button onClick={() => removeBlog(blog)}>remove</button>
        </div>
        :
        <div></div>
      }
      <CommentList blog={blog}/>
      <CommentForm blog={blog}/>
    </div>
  )
}


export default Blog
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const handleCreateComment = (event) => {
    event.preventDefault()
    console.log(comment, blog)
    dispatch(addComment(blog, comment))
  }
  return(
    <form onSubmit={handleCreateComment}>
      <h3>Add comment</h3>
      <input id="content"
        value={comment}
        onChange={({ target }) => setComment(target.value)}/>
      <button type="submit">Add</button>
    </form>
  )
}

export default CommentForm
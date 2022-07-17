import { v4 as uuidv4 } from 'uuid'

const CommentList = ({ blog }) => {

  const listItems = blog.comments.map((comment) =>
    <li key={uuidv4()}>{comment}</li>)
  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {listItems}
      </ul>
    </div>
  )
}

export default CommentList
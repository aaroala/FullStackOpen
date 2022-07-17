import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const User = () => {
  const id = useParams().id
  console.log('id:', id)
  const users = useSelector(state => state.users)
  if (users === null) return (<>Not found</>)
  console.log(users)
  const user = users.find(( u ) => u.id === id)
  console.log(user)
  //const user = users.find(n => n.id === Number(id))
  return(
    <div>
      <h2>{user.username}</h2>
      <h4>Added blogs</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Author</th>
            <th>Url</th>
          </tr>
        </thead>
        <tbody>
          {user.blogs.map((blog, index) =>
            <tr key={blog.id}>
              <td>{index}</td>
              <td><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></td>
              <td>{blog.author}</td>
              <td>{blog.url}</td>
            </tr>
          )}
        </tbody>
      </Table>

    </div>
  )
}
export default User
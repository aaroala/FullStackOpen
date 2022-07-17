import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Table = ({ user }) => {

  //<Link to={`/users/${}`}>{name}</Link>
  return(
    <tr>
      <th><Link to={`/users/${user.id}`}>{user.username}</Link></th>
      <th>{user.blogs.length}</th>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)
  if (users === null) return(null)

  return(
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
          {users.map(user =>
            <Table key={user.id} user={user}/>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users
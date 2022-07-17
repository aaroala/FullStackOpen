import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Navbar, Nav } from 'react-bootstrap'

const Menu = ({ logout }) => {
  const currentUser = useSelector(state => state.currentUser)
  if (currentUser === null) return(null)

  const padding = {
    paddingRight: 5
  }

  return(
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <em>{currentUser.username} logged in </em>
              <button onClick={() => logout()}>Logout</button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default Menu
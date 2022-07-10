import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(content)
    props.createAnecdote(content)

    props.setNotification("Added anecdote", 5)
  }

  return (
    <>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div><input name="anecdote" /></div>
          <div><button type="submit">create</button></div>

      </form>
    </>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}


export default connect(null, mapDispatchToProps)(AnecdoteForm)
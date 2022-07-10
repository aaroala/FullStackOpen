import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filterText = useSelector(state => state.filterText)
  const dispatch = useDispatch()
  const filteredAnecdotes = anecdotes.filter(anecdote => anecdote["content"].toLowerCase().includes(filterText.toLowerCase()))
  const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => (b.votes - a.votes))

  const vote = (event) => {
    dispatch(voteAnecdote(event.target.value))
    dispatch(setNotification("Voted anecdote", 5))
  }


  return(
    <div>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={vote} value={anecdote.id}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
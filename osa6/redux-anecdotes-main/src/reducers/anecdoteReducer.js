import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

/*
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'ADD_VOTE':
      const id = action.data.id
      const selectedAnectode = state.find(n => n.id === id)
      const changedAnectode = { 
        ...selectedAnectode, 
        votes: selectedAnectode.votes + 1
      }
      return state.map(anecdode =>
        anecdode.id !== id ? anecdode : changedAnectode 
      )
    case 'NEW_ANECTODE':
      return [...state, action.data]

  default:
    return state
  }
}

*/
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    /*
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    */
   
    updateAnecdote(state, action) {
      const id = action.payload.id
      const changedAnectode = action.payload
      
      return state.map(anecdode =>
        anecdode.id !== id ? anecdode : changedAnectode 
      )
      },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.get(id)
    const changedAnectode = { 
      ...anecdote, 
      votes: anecdote.votes + 1
    }

    const updatedAnecdote = await anecdoteService.update(id, changedAnectode)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const { updateAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

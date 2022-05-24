import { useState } from 'react'


const MaxIndex = (points) => {
  return (points.indexOf(Math.max.apply(Math, points)))
}
const MaxValue = (points) => {
  return (Math.max.apply(Math, points))
}

const App = () => {
  const anecdotes = [
    'Adding manpower to a late software project makes it later!',
    'The best way to get a project done faster is to start sooner',
    'Even the best planning is not so omniscient as to get it right the first time.',
    'How does a project get to be a year late?... One day at a time.',
    'Plan to throw one (implementation) away; you will, anyhow.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0])


  const nextAnecdote = () => {
    console.log(points)
    const random = Math.floor(Math.random() * anecdotes.length);
    console.log(random)
    setSelected(random)
  }

  const voteAnecdote = () => {
    console.log(selected)
    const copy = [...points]
    copy[selected] += 1 
    setPoints(copy)
  }

  console.log(points, "logi")
  console.log(Math.max(points), "logi")

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>Has {points[selected]} votes</p>
      <div>
        <button onClick={nextAnecdote}>Next anecdote</button>
        <button onClick={voteAnecdote}>Vote anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[MaxIndex(points)]}</p>
      <p>Has {MaxValue(points)} votes</p>
    </div>
  )
}

export default App
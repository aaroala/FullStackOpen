import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const StatisticLine = (props) => {
  console.log(props, "props")

  if (props.text === "average") {
    const sum = props.good * 1 + props.bad * -1
    const all = props.good + props.neutral + props.bad
    const result = sum/all
    return(
      <tr>
        <td>{props.text}</td> 
        <td>{result}</td>
      </tr>
    )
  }
  else if (props.text === "positive") {
    const all = props.good + props.neutral + props.bad
    const result = (props.good/all)*100
    return(
      <tr>
        <td>{props.text}</td> 
        <td>{result} %</td>
      </tr>
    )
  }
  else if (props.text === "all") {
    const result = props.good + props.neutral + props.bad
    return(
      <tr>
        <td>{props.text}</td> 
        <td>{result}</td>
      </tr>
    )
  }

  return(
    <tr>
        <td>{props.text}</td> 
        <td>{props.value}</td>
      </tr>
  )
} 

const Statistics = ({good, neutral, bad}) => {
  console.log(good)
  if ((good + neutral + bad) === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <div>
      <h1>Statistics</h1>

      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" good={good} neutral={neutral} bad={bad}/>
          <StatisticLine text="average" good={good} neutral={neutral} bad={bad}/>
          <StatisticLine text="positive" good={good} neutral={neutral} bad={bad}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral= () => {
    setNeutral(neutral + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="good"/>
      <Button handleClick={handleNeutral} text="neutral"/>
      <Button handleClick={handleBad} text="bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App
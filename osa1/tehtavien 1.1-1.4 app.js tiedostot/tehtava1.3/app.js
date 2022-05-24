const Header = (props) => {
  console.log(props)
  return (
    <div>
        <h1>{props.course}</h1>
    </div>
    )
  }

  const Part = (props) => {
    console.log("here")
    console.log(props)
    return (
      <div>
        <p>
          {props.props.name} {props.props.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log("this one")
    console.log(props)
    return (
      <div>
        <Part props={props.part1}/>
        <Part props={props.part2}/>
        <Part props={props.part3}/>
      </div>
    )
  }

  const Total = (props) => {
    return (
      <div>
        <p>
        Number of exercises {props.total}
        </p>
      </div>
    )
  }
  
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3}/>
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App
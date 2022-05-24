const Header = (props) => {
  console.log(props)
  return (
    <div>
        <h1>{props.course}</h1>
    </div>
    )
  }

  const Part = (props) => {
    console.log("part")
    console.log(props)
    return (
      <div>
        <p>
          {props.part.name} {props.part.exercises}
        </p>
      </div>
    )
  }
  
  const Content = (props) => {
    console.log(props)
    console.log(props["content"])
    const lista = props["content"].concat()
    console.log(lista)
    lista.forEach(value => {
      console.log(value)
    })
    return (
      <div>
        <Part part={props.content[0]}/>
        <Part part={props.content[1]}/>
        <Part part={props.content[2]}/>
      </div>

    )

  }

  const Total = (props) => {
    console.log(props)
    let num = 0
    props["total"].forEach(element => {
      num = num + element.exercises
    });
    console.log("total")
    console.log(num)
    return (
      <div>
        <p>
        Number of exercises {num}
        </p>
      </div>
    )
  }
  
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course}/>
      <Content content={parts}/>
      <Total total={parts}/>
    </div>
  )
}

export default App
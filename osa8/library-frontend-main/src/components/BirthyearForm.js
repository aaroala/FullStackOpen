import { useState } from "react"
import { useMutation } from "@apollo/client"
import { useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries"

const BirthyearForm = () => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState(1995)

  const [ editBirthyear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  })

  const result = useQuery(ALL_AUTHORS)
  const authors = result.data.allAuthors


  const submit = (event) => {
    event.preventDefault()
    console.log("nice", name, born)
    editBirthyear({ variables: { name, born }})

    setName('')
    setBorn(0)
  }

  return(
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <label>
          Author:
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => 
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </label>
        <div>
          birthyear
          <input
            type="number"
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}


export default BirthyearForm
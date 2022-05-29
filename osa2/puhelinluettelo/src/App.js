import { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const Persons = ({persons, filterName, deletePerson}) => {
  function personFilter(person) {return person["name"].toLowerCase().includes(filterName.toLowerCase())}
  const filteredPersons = persons.filter(personFilter)
  return(
  filteredPersons.map(person =>
    <div key={person.id}>
      {person.name} {person.number}
      <button value={person.id} name={person.name} onClick={deletePerson}>delete</button>
    </div>)
  )
}

const Personform = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return(
  <div>
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
  )
}

const Filter = ({filterName, handleNameFilter}) => {
  return(
    <div>
      filter by name
      <input value={filterName} onChange={handleNameFilter}/>
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [message, setMessage] = useState(null)
  const [messageStatus, setMessageStatus] = useState('error')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])



  function personExists() {return((persons.find(({ name }) => name === newName) !== undefined))}
  function dublicatePersonInfo() {return(persons.find(({ name }) => name === newName))}

  const addPerson = (event) => {
    event.preventDefault()

    if (personExists()) {
      if (window.confirm(`${newName} is already added to phonebook, do you want to replace old number with a new one?`)) {
        const selectedPerson = dublicatePersonInfo()
        personService
          .update(selectedPerson.id, {name: selectedPerson.name, number: newNumber})
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id !== selectedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessageStatus('success')
            setMessage(`Changed number succesfully!`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(() => {
            setMessageStatus('error')
            setMessage(`Information on ${newName} has already been removed from server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          }
          )
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessageStatus('success')
        setMessage(`Added ${personObject.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deletePerson = (event) => {
    const id = event.target.value
    
    if (!(window.confirm(`Delete ${event.target.name} ?`))) return

    personService
      .remove(id)
      .then(() => setPersons(persons.filter(x => x["id"].toString() !== id)))
      .then(() => {
        setMessageStatus('error')
        setMessage(
          `Deleted ${event.target.name}`
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
    })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleNameFilter = (event) => {
    console.log(event.target.value)
    setFilterName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} status={messageStatus}/>
      <Filter filterName={filterName} handleNameFilter={handleNameFilter}/>

      <h2>Add new</h2>
      <Personform addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} deletePerson={deletePerson} />
    </div>
  )

}

export default App
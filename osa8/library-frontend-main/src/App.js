import { useState, useEffect } from 'react'
import { useQuery, useMutation, useSubscription, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  useEffect(() => {setToken(localStorage.getItem('current-user-token'))}, [])

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      window.alert(`Added book ${addedBook.title} by ${addedBook.author.name}`)
    }
})

  if (!token) {
    return(
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <LoginForm setToken={setToken} />
          <Authors show={page === 'authors'} />

          <Books show={page === 'books'} />

          <NewBook show={page === 'add'} />
        </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }



  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={() => logout()}>logout</button>
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === 'recommendations'}/>
    </div>
  )
}

export default App

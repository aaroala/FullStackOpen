import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_GENRES, BOOKS_BY_GENRE } from '../queries'



const Books = (props) => {

  const [genreFilter, setGenreFilter] = useState(null)
  
  const books_result = useQuery(BOOKS_BY_GENRE, 
    { skip: !props.show })

  const genre_result = useQuery(ALL_GENRES, 
    { skip: !props.show })

  if (!props.show) {
    return null
  }

  const loading = books_result.loading || genre_result.loading;

  if (loading) {
    return <div>loading...</div>
  }

  const books = books_result.data.booksByGenre
  const allGenres = genre_result.data.allGenres

  console.log(books)
  console.log(allGenres)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <>
            {!genreFilter || a.genres.includes(genreFilter) ?
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
              :
              null
            }
            </>
          ))}
        </tbody>
      </table>

      <div>
        {allGenres.map((genre) => (
          <button key={genre} onClick={() => setGenreFilter(genre)}>{genre}</button>
        ))}
        <button onClick={() => setGenreFilter(null)}>all genres</button>

      </div>
    </div>
  )
}

export default Books

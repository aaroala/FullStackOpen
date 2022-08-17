import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, CURRENT_USER } from '../queries'



const Recommendations = (props) => {

  const [genreFilter, setGenreFilter] = useState(null)
  
  const result = useQuery(ALL_BOOKS, 
    { skip: !props.show })

  const currentUser = useQuery(CURRENT_USER, { skip: !props.show })

  if (!props.show) {
    return null
  }

  if (result.loading || currentUser.loading) {
    return <div>loading...</div>
  }

  if (result.data === undefined) {
    return <div>not found...</div>
  }


  const books = result.data.allBooks
  console.log(currentUser)

  const favoriteGenre = currentUser.data.me.favoriteGenre



  return (
    <div>
      <h2>Recommendations</h2>
      <>Books that contain your favorite genre! (favorite genre: {favoriteGenre})</>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <>
            { a.genres.includes(favoriteGenre) ?
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
    </div>
  )
}

export default Recommendations

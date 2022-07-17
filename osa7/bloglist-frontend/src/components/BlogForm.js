import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ blogToggle }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (blogObject) => {
    blogToggle()
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`new blog "${blogObject.title}" by "${blogObject.author}" has been added`))
  }


  const handleCreateBlog = (event) => {
    event.preventDefault()
    console.log(`creating new blog with title "${title}", author "${author}", url "${url}"`)

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    addBlog(blogObject)

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return(
    <form onSubmit={handleCreateBlog}>
      <div>
      title:
        <input
          id="title"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder='write title'
        />
      </div>
      <div>
      author:
        <input
          id="author"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder='write author'
        />
      </div>
      <div>
      url:
        <input
          id="url"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder='write url'
        />
      </div>
      <button id="create-button" type="submit">create</button>
    </form>
  )
}

export default BlogForm
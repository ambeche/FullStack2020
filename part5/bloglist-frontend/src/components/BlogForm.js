import React, { useState } from 'react'
import Button from './Button'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = ({ target }) => setTitle(target.value)
  const handleAuthorChange = ({ target }) => setAuthor(target.value)
  const handleUrlChange = ({ target }) => setUrl(target.value)

  const handleBlogCreation = (event) => {
    event.preventDefault()
    addBlog({ title, author, url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div style={{ marginBottom:5 }}>
      <h2>Create New Blog</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          <label>
            Title
            <input
              onChange={handleTitleChange}
              value={title}
              type="text"
              name="title"
              autoComplete="on"
            />
          </label>
        </div>
        <div>
          <label>
            Author
            <input
              onChange={handleAuthorChange}
              value={author}
              type="text"
              name="author"
              autoComplete="name"
            />
          </label>
        </div>
        <div>
          <label>
            Url
            <input
              onChange={handleUrlChange}
              value={url}
              type="url"
              name="url"
              autoComplete="url"
            />
          </label>
        </div>
        <Button label='create' color= 'green' id='post-blog' />
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default BlogForm

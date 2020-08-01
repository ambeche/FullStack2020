import React from 'react'
import ToggleVisibility from './ToggleVisibility'
import Button from './Button'
import PropTypes from 'prop-types'

const Blog = ({ blog, loggedUser, modifyBlog, handleBlogDeletion }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likeBlog = () => modifyBlog(blog)

  const handleDeletion = () =>
    window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)
      ? handleBlogDeletion(blog.id)
      : null

  const toggleDeleteButton = () => {
    if (blog.user.username === loggedUser) {
      return (
        <Button handleClick={handleDeletion} label="delete" id="delete-blog" color="#f44336" />
      )
    }
  }

  return (
    <div className="blogs" style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <ToggleVisibility labelOne="hide" labelTwo="view" className="toggle">
        <div> {blog.url}</div>
        <div>
            likes <span id="num-of-likes">{blog.likes}</span>
          <Button handleClick={likeBlog} label="like" color="green" id="like-blog"/>
        </div>
        <div> {blog.author}</div>
        {toggleDeleteButton()}
      </ToggleVisibility>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  loggedUser: PropTypes.string,
  modifyBlog: PropTypes.func,
  handleBlogDeletion: PropTypes.func,
}

export default Blog

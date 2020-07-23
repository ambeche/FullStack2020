import React from "react";
import ToggleVisibility from './ToggleVisibility'

const Blog = ({ blog, modifyBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeBlog = () => modifyBlog(blog)

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <ToggleVisibility labelOne='hide' labelTwo='view'>
      <div> {blog.url}</div>
      <div>
        likes {blog.likes}
        <button onClick={likeBlog}>like</button>
      </div>
      <div> {blog.author}</div>
      </ToggleVisibility>
    </div>
  );
};

export default Blog;

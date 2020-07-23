import React from "react";
import ToggleVisibility from './ToggleVisibility'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <ToggleVisibility labelOne='hide' labelTwo='view'>
      <div> {blog.url}</div>
      
      <div>
        likes {blog.likes}
        <button>like</button>
      </div>
      <div> {blog.author}</div>
      </ToggleVisibility>
    </div>
  );
};

export default Blog;

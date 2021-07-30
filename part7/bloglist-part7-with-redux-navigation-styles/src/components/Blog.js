import React from 'react';
import { NavLink } from 'react-router-dom';

const Blog = ({ data }) => {
  const blog = data;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div className="blogs" style={blogStyle}>
      <div className="blog-title">
        <NavLink to={`/blogs/${blog.id}`}>
          {blog.title}{' '}
          <span style={{ marginLeft: 10, textDecoration: 'none' }}>
            {blog.author}
          </span>
        </NavLink>
      </div>
    </div>
  );
};

export default Blog;

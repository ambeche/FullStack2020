import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const Blogs = ({ loggedUser }) => {
  const blogs = useSelector((state) =>
    state.blogs
      .concat()
      .sort((a, b) => a.likes - b.likes)
      .reverse()
  );

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} loggedUser={loggedUser} />
      ))}
    </div>
  );
};

export default Blogs;

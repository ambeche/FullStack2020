import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyBlog, deleteBlog } from '../reducers/blogsReducer';
import { notifyUser } from '../reducers/notificationReducer';
import ToggleVisibility from './ToggleVisibility';
import Button from './Button';

const Blog = ({ data }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.users.currentUser);
  const blog = data;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const likeBlog = () => {
    dispatch(
      modifyBlog({ ...blog, user: blog.user.id, likes: (blog.likes += 1) })
    );
    dispatch(notifyUser(`Thanks for liking the post, '${blog.title}'!`, 1));
  };

  const handleBlogDeletion = () =>
    window.confirm(`Remove blog '${blog.title}' by ${blog.author}`)
      ? dispatch(deleteBlog(blog.id))
      : null;

  const toggleDeleteButton = () => {
    if (blog.user.username === currentUser.username) {
      return (
        <Button
          handleClick={handleBlogDeletion}
          label="delete"
          id="delete-blog"
          color="#f44336"
        />
      );
    }
  };

  return (
    <div className="blogs" style={blogStyle}>
      <div className="blog-title">
        {blog.title} {blog.author}
      </div>
      <ToggleVisibility labelOne="hide" labelTwo="view" className="toggle">
        <div className="blog-url"> {blog.url}</div>
        <div>
          likes <span id="num-of-likes">{blog.likes}</span>
          <Button
            handleClick={likeBlog}
            label="like"
            color="green"
            id="like-blog"
          />
        </div>
        <div> {blog.author}</div>
        {toggleDeleteButton()}
      </ToggleVisibility>
    </div>
  );
};

export default Blog;

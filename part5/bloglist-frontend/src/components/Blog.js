import React from "react";
import ToggleVisibility from "./ToggleVisibility";
import Button from "./Button";

const Blog = ({ blog, modifyBlog, handleBlogDeletion }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const likeBlog = () => modifyBlog(blog);
  const deleteBlog = () => handleBlogDeletion(blog);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      <ToggleVisibility labelOne="hide" labelTwo="view">
        <div> {blog.url}</div>
        <div>
          likes {blog.likes}
          <Button handleClick={likeBlog} label="like" color="green" />
        </div>
        <div> {blog.author}</div>
        <Button handleClick={deleteBlog} label="delete" color="#f44336" />
      </ToggleVisibility>
    </div>
  );
};

export default Blog;

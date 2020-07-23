import React, { useState } from "react";

const BlogForm = ({ addBlock }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleTitleChange = ({target}) => setTitle(target.value);
  const handleAuthorChange = ({target}) => setAuthor(target.value);
  const handleUrlChange = ({target}) => setUrl(target.value);

  const handleBlogCreation = (event) => {
    event.preventDefault();
    addBlock({title, author, url})

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          <label>
            title
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
            URL
            <input
              onChange={handleUrlChange}
              value={url}
              type="text"
              name="url"
              autoComplete="url"
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;

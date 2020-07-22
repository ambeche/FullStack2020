import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [noticeToUser, setNoticeToUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem('loggedInUser')
    if (isLoggedIn) {
      const parsedUser = JSON.parse(isLoggedIn)
      setUser(parsedUser)
      blogService.setToken(parsedUser.token)
    }
  }, []);

  const alertUser = async (newMessage, newCode) => {
    setNoticeToUser({ message: newMessage, code: newCode })
    await setTimeout(() => setNoticeToUser(null), 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log("login error", err.response.data.error);
      await alertUser('Wrong password or username!', 0)
    }
  };

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    try {
      const createdBlog = await blogService.createBlog({title, author, url})
      setBlogs(blogs.concat(createdBlog))
      await alertUser(`A new blog '${createdBlog.title}' has been added!`, 1)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (err) {
      console.log('blog creation failed', err.response.data.error);
      await alertUser(`${err.response.data.error}!`, 0)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification noticeToUser={noticeToUser} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>
              Username
              <input
                onChange={({ target }) => setUsername(target.value)}
                value={username}
                type="text"
                name="username"
                autoComplete="username"
              />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                onChange={({ target }) => setPassword(target.value)}
                value={password}
                type="password"
                name="password"
                autoComplete="currnt-password"
              />
            </label>
          </div>
          <button>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification noticeToUser={noticeToUser} />
      <h2>blogs</h2>
      <p>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      <h2>Create New Blog</h2>
      <form onSubmit={handleBlogCreation}>
          <div>
            <label>
              title
              <input
                onChange={({ target }) => setTitle(target.value)}
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
                onChange={({ target }) => setAuthor(target.value)}
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
                onChange={({ target }) => setUrl(target.value)}
                value={url}
                type="text"
                name="url"
                autoComplete="url"
              />
            </label>
          </div>
          <button>Create</button>
        </form>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

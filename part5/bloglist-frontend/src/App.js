import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);
  
  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem('loggedInUser')
    if (isLoggedIn) {
      const parsedUser = JSON.parse(isLoggedIn)
      setUser(parsedUser)
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log("login error", err.message);
    }
  };

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
  }

  if (user === null) {
    return (
      <div>
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
      <h2>blogs</h2>
      <p>
        {user.name} is logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;

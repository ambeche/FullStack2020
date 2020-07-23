import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import ToggleVisibility from "./components/ToggleVisibility";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [noticeToUser, setNoticeToUser] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem("loggedInUser");
    if (isLoggedIn) {
      const parsedUser = JSON.parse(isLoggedIn);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const alertUser = async (newMessage, newCode) => {
    setNoticeToUser({ message: newMessage, code: newCode });
    await setTimeout(() => setNoticeToUser(null), 5000);
  };

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (err) {
      console.log("login error", err.response.data.error);
      await alertUser("Wrong password or username", 0);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedInUser");
  };

  const handleBlogCreation = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility();
      const createdBlog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(createdBlog));
      await alertUser(`A new blog '${createdBlog.title}' has been added!`, 1);
    } catch (err) {
      console.log("blog creation failed", err.response.data.error);
      await alertUser(`${err.response.data.error}!`, 0);
    }
  };

  const modifyBlog = async (newBlog) => {
    try {
      const updatedBlog = await blogService.updateBlog({
        ...newBlog,
        likes: (newBlog.likes += 1)
      });
      setBlogs(
        blogs
          .map((b) => b.likes === newBlog.likes && b.title === newBlog.title ? updatedBlog : b)
      );
      await alertUser(`Thanks for liking the post, '${updatedBlog.title}'!`, 1);
    } catch (err) {
      console.log("failed to update", err.response.data.error);
      await alertUser(`${err.response.data.error}!`, 0);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification noticeToUser={noticeToUser} />
        <LoginForm login={handleLogin} />
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
      <ToggleVisibility
        ref={blogFormRef}
        labelOne="cancel"
        labelTwo="create blog"
      >
        <BlogForm addBlog={handleBlogCreation} />
      </ToggleVisibility>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} modifyBlog={modifyBlog} />
      ))}
    </div>
  );
};

export default App;

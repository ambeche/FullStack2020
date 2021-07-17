import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import userService from './services/users';
import ToggleVisibility from './components/ToggleVisibility';
import Button from './components/Button';
import SignUpForm from './components/SignUpForm';
import { setBlogs } from './reducers/blogsReducer';

const App = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [toggleSignUp, setToggleSignUp] = useState(false);
  const blogFormRef = useRef();

  // initializes the redux store with blogs from the server
  useEffect(() => {
    dispatch(setBlogs());
  }, [dispatch]);

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem('loggedInUser');
    if (isLoggedIn) {
      const parsedUser = JSON.parse(isLoggedIn);
      setUser(parsedUser);
      blogService.setToken(parsedUser.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
    } catch (err) {
      console.log('login error', err.response.data.error);
      // await alertUser('Wrong password or username', 0);
    }
  };

  const registerUser = async (newUser) => {
    try {
      const createdUser = await userService.createUser(newUser);
      await handleLogin({
        username: createdUser.username,
        password: newUser.password
      });
    } catch (err) {
      console.log('sign up error', err.response.data.error);
      // await alertUser(`${err.response.data.error}`, 0);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setToggleSignUp(false);
    window.localStorage.removeItem('loggedInUser');
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm login={handleLogin} toggleSignUp={toggleSignUp} />
        <ToggleVisibility
          labelOne="Sign in"
          labelTwo="Register"
          setToggleSignUp={setToggleSignUp}
        >
          <SignUpForm addUser={registerUser} />
        </ToggleVisibility>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {user.name} is logged in
        <Button handleClick={handleLogout} label="logout" color="grey" />
      </p>
      <ToggleVisibility
        ref={blogFormRef}
        labelOne="cancel"
        labelTwo="create blog"
      >
        <BlogForm toggleForm={blogFormRef} />
      </ToggleVisibility>

      <Blogs loggedUser={user.username} />
    </div>
  );
};

export default App;

import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import ToggleVisibility from './components/ToggleVisibility';
import Button from './components/Button';
import SignUpForm from './components/SignUpForm';
import { setBlogs } from './reducers/blogsReducer';
import { setCurrentUser, logoutUser, setUsers } from './reducers/usersReducer';

const App = () => {
  const dispatch = useDispatch();
  const [currentUser] = useSelector((state) => [state.users.currentUser]);
  const blogFormRef = useRef();

  useEffect(() => {
    // initializes the redux store with blogs users from the server
    dispatch(setBlogs());
    dispatch(setUsers());
  }, [dispatch]);

  useEffect(() => {
    const isLoggedIn = window.localStorage.getItem('currentUser');
    if (isLoggedIn) {
      dispatch(setCurrentUser(JSON.parse(isLoggedIn)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  if (!currentUser) {
    return (
      <div>
        <Notification />
        <LoginForm />
        <ToggleVisibility labelOne="Sign in" labelTwo="Register">
          <SignUpForm />
        </ToggleVisibility>
      </div>
    );
  }

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      <p>
        {currentUser.name} is logged in
        <Button handleClick={handleLogout} label="logout" color="grey" />
      </p>
      <ToggleVisibility
        ref={blogFormRef}
        labelOne="cancel"
        labelTwo="create blog"
      >
        <BlogForm toggleForm={blogFormRef} />
      </ToggleVisibility>

      <Blogs />
    </div>
  );
};

export default App;

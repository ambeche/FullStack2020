import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch, useHistory } from 'react-router-dom';
import DataList from './components/DataList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import ToggleVisibility from './components/ToggleVisibility';
import { setBlogs } from './reducers/blogsReducer';
import { setCurrentUser, logoutUser, setUsers } from './reducers/usersReducer';
import Blog from './components/Blog';
import UserDetails from './components/UserDetails';
import BlogDetails from './components/BlogDetails';
import { Container, Paper } from '@material-ui/core';
import AppNav from './components/AppNav';
import UserList from './components/UserList';
import Profile from './components/Profile';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import useStyles from './styles/useStyles';
import LoginOrRegister from './components/LoginOrRegister';

const App = () => {
  const dispatch = useDispatch();
  const [currentUser, users, blogs] = useSelector((state) => [
    state.users.currentUser,
    state.users.users,
    state.blogs
  ]);
  const matchedUser = useRouteMatch('/users/:id');
  const matchedBlog = useRouteMatch('/blogs/:id');
  const matchProfile = useRouteMatch('/profile');
  const history = useHistory();
  const blogFormRef = useRef();
  const classes = useStyles();

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
    history.push('/');
  };

  const detailsToBeShown = (match, data) =>
    match && data?.find((data) => data.id === match.params.id);

  // currentUser token is encripted and lacks some info needed for the profile
  // hence this approach is used
  // this will be optimized in the backend later

  const profileInfo = () => {
    const bookmarks = blogs.filter((blog) =>
      blog.reads.includes(currentUser?.id)
    ).length;

    const cUser = users?.find(
      (user) =>
        user?.username === currentUser?.username &&
        user?.name === currentUser?.name
    );

    return { ...cUser, bookmarkCounts: bookmarks };
  };
  if (!currentUser) return <LoginOrRegister />;

  return (
    <div className={classes.app}>
      <Container className={classes.appInnerContainer}>
        <ScrollToTop />
        <AppNav currentUser={currentUser} handleLogout={handleLogout} />
        <Notification />
        <ToggleVisibility
          ref={blogFormRef}
          labelOne="cancel"
          labelTwo="create blog"
        >
          <BlogForm toggleForm={blogFormRef} />
        </ToggleVisibility>
        <Switch>
          <Route path="/users/:id">
            <UserDetails user={detailsToBeShown(matchedUser, users)} />
          </Route>
          <Route path="/blogs/:id">
            <BlogDetails blog={detailsToBeShown(matchedBlog, blogs)} />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/profile">
            <Profile currentUser={profileInfo()} />
          </Route>
          <Route path="/">
            <Container component={Paper} className={classes.blogListContainer}>
              <DataList
                scroll={true}
                type="blogs"
                sortby="likes"
                currentUser={profileInfo()}
              >
                <Blog />
              </DataList>
            </Container>
          </Route>
        </Switch>
      </Container>
      <Container>
        {matchProfile?.path ? <Footer /> : <Footer currentUser={currentUser} />}
      </Container>
    </div>
  );
};

export default App;

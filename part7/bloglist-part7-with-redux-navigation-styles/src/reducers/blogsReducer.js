import blogService from '../services/blogs';
import userService from '../services/users';
import { notifyUser } from '../reducers/notificationReducer';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case 'BLOGS':
    return action.blogs;
  case 'NEW_BLOG':
    return [...state, action.newBlog];
  case 'LIKE_BLOG':
    // returns a new state contianing the modified blog
    return state.map((b) =>
      b.id !== action.likedBlog.id ? b : { ...action.likedBlog }
    );
  case 'DELETE_BLOG':
    return state.filter((blog) => blog.id !== action.id);
  case 'COMMENT_ON_BLOG':
    return state.map((b) =>
      b.id !== action.commentedBlog.id ? b : { ...action.commentedBlog }
    );
  default:
    return state;
  }
};

const setBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'BLOGS',
      blogs
    });
  };
};

const createNewBlog = (newBlog) => {
  return async (dispatch) => {
    try {
      const createdBlog = await blogService.createBlog(newBlog);
      const blogCreator = await userService.getUser(createdBlog.user);

      createdBlog.user = blogCreator; //populates user field of created blog with the creator's details
      dispatch({
        type: 'NEW_BLOG',
        newBlog: createdBlog
      });
    } catch (err) {
      console.log('blog creation failed', err.response.data.error);
      dispatch(
        notifyUser(`blog creation failed: ${err.response.data.error}`, 0)
      );
    }
  };
};

const modifyBlog = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = await blogService.updateBlog(blog, blog.id);
      likedBlog.user = blog.user; // replaces the ObjectId type of the user field from the server with the user object
      dispatch({
        type: 'LIKE_BLOG',
        likedBlog
      });
    } catch (err) {
      console.error('error', err.message);
    }
  };
};

const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      const deleted = await blogService.deleteBlog(id);
      console.log('res', deleted);

      if (deleted.status === 204) {
        dispatch({
          type: 'DELETE_BLOG',
          id
        });
        dispatch(notifyUser('blog successfully deleted?', 1));
      }
    } catch (err) {
      console.error('error', err);
    }
  };
};

const commentOnBlog = (cmt, blogId) => {
  return async (dispatch) => {
    try {
      // returns the commented blog with the newly created comment
      const commentedBlog = await blogService.createComment(cmt, blogId);

      dispatch({
        type: 'COMMENT_ON_BLOG',
        commentedBlog
      });
    } catch (err) {
      console.error('error', err.message);
    }
  };
};

export {
  blogsReducer as default,
  setBlogs,
  createNewBlog,
  modifyBlog,
  deleteBlog,
  commentOnBlog
};

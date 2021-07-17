import blogService from '../services/blogs';
import userService from '../services/users';

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'BLOGS':
      return action.blogs;
    case 'NEW_BLOG':
      return [...state, action.newBlog];
    case 'MODIFY_BLOG':
      // returns a new state contianing the modified blog
      return state.map((b) =>
        b.id !== action.modifiedBlog.id ? b : { ...action.modifiedBlog }
      );
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.id);
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
    }
  };
};

const modifyBlog = (blog) => {
  return async (dispatch) => {
    try {
      const modifiedBlog = await blogService.updateBlog(blog, blog.id);
      modifiedBlog.user = blog.user; // replaces the ObjectId type of the user field from the server with the user object
      dispatch({
        type: 'MODIFY_BLOG',
        modifiedBlog
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
      }
    } catch (err) {
      console.error('error', err);
    }
  };
};

export {
  blogsReducer as default,
  setBlogs,
  createNewBlog,
  modifyBlog,
  deleteBlog
};

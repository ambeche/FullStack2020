import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import notificationReducer from './reducers/notificationReducer';
import blogsReducer from './reducers/blogsReducer';
import App from './App';

const reducers = combineReducers({
  notice: notificationReducer,
  blogs: blogsReducer
});
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);

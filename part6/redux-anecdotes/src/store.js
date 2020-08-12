import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";
import filter from "./reducers/filterReducer";

const store = createStore(
  combineReducers({anecdotes, notification, filter}),
  composeWithDevTools()
);

export default store;

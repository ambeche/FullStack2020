import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import anecdotes from "./reducers/anecdoteReducer";
import notification from "./reducers/notificationReducer";

const store = createStore(
  combineReducers({anecdotes, notification}),
  composeWithDevTools()
);

export default store;

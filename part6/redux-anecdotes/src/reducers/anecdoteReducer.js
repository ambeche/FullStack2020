import anecdoteService from "../services/anecdotes";

const initializeAnecdote = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAnecdotes();
    dispatch({
      type: "INIT_ANECDOTE",
      anecdotes,
    });
  };
};

const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    anecdote.votes += 1;
    const voted = await anecdoteService.updateAnecdote(anecdote, anecdote.id);
    dispatch({
      type: "VOTE",
      anecdote: voted,
    });
  };
};

const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.postAnecdote(content);
    dispatch({
      type: "NEW_ANECDOTE",
      newAnecdote,
    });
  };
};

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);

  switch (action.type) {
    case "INIT_ANECDOTE":
      return action.anecdotes;
    case "NEW_ANECDOTE":
      return [...state, action.newAnecdote];
    case "VOTE":
      return state.map((a) =>
        a.id !== action.anecdote.id ? a : action.anecdote
      );
    default:
      return state;
  }
};

export { reducer as default, voteAnecdote, createAnecdote, initializeAnecdote };

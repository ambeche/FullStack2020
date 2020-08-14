const initializeAnecdote = (anecdotes) => {
  return {
    type: "INIT_ANECDOTE",
    anecdotes,
  };
};
const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

const createAnecdote = (newAnecdote) => {
  return {
    type: "NEW_ANECDOTE",
    newAnecdote,
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
        a.id !== action.id ? a : { ...a, votes: a.votes + 1 }
      );
    default:
      return state;
  }
};

export { reducer as default, voteAnecdote, createAnecdote, initializeAnecdote };

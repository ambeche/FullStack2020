import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  );
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({anecdotes, filter}) =>
    !filter
      ? anecdotes
      : anecdotes.filter((a) =>
          a.content.toLowerCase().includes(filter.toLowerCase())
        )
  );
 
  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(` You voted '${anecdote.content}'`, 5));
  };

  const sortByVotes = (anecdotes) =>
    anecdotes.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortByVotes(anecdotes).map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

export default AnecdoteList;

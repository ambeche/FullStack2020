import React from "react";
import { connect } from "react-redux";
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

const AnecdoteList = (props) => {
  const vote = (anecdote) => {
    props.voteAnecdote(anecdote);
    props.setNotification(` You voted '${anecdote.content}'`, 5);
  };

  const sortByVotes = (anecdotesArray) =>
    anecdotesArray.sort((a, b) => b.votes - a.votes);

  return (
    <div>
      {sortByVotes(props.anecdotes).map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => vote(anecdote)}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
    anecdotes: !state.filter
      ? state.anecdotes
      : state.anecdotes.filter((a) =>
          a.content.toLowerCase().includes(state.filter.toLowerCase())
        ),
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
};

export default connect (mapStateToProps, mapDispatchToProps) (AnecdoteList);

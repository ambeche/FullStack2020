import React from 'react'
import {Link} from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Anecdote = ({ anecdote, vote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    has {anecdote.votes} votes
    <button onClick={()=>vote(anecdote.id)}>vote</button>
  </div>
);

export {Anecdote, AnecdoteList}
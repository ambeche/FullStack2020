import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import {notify} from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await anecdoteService.postAnecdote(content)
    dispatch(createAnecdote(newAnecdote))
    notify(dispatch,` Anecdote '${newAnecdote.content}' created successfully!`)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote"/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
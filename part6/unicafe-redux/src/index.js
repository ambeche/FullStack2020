import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

store.dispatch({ type: 'GOOD', votes: 5})
store.dispatch({ type: 'OK', votes: 4})
store.dispatch({ type: 'BAD', votes: 2})

const App = () => {

  const good = () =>  store.dispatch({ type: 'GOOD', votes: 1})
  const ok = () => store.dispatch({type: 'OK', votes: 1 })
  const bad = () => store.dispatch({type: 'BAD', votes: 1})
  const reset = () => store.dispatch({type: 'ZERO'})

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>neutral</button> 
      <button onClick={bad}>bad</button>
      <button onClick={reset}> reset stats</button>
      <div>good <strong>{store.getState().good}</strong></div>
      <div>neutral <strong>{store.getState().ok}</strong></div>
      <div>bad <strong>{store.getState().bad}</strong></div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)

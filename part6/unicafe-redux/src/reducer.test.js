import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
      votes: 1
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('ok is incremented', () => {
    deepFreeze(initialState)
    const newState = counterReducer(initialState, { type: 'OK', votes: 1})
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    deepFreeze(initialState)
    const newState = counterReducer(initialState, { type: 'BAD', votes: 1})
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1
    })
  })

  test('feedback states can be reset to zero', () => {
    const state = {
      good: 5,
      ok: 4,
      bad: 2
    }

    deepFreeze(state)

    const newState = counterReducer(state, { type: 'ZERO'})
    expect(newState).toEqual(initialState)
  })
})
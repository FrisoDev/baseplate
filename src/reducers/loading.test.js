import { expect } from 'chai'
import loading from './loading'
import { APP_LOADING, APP_DONE_LOADING } from '../actions/loading'

describe('loading reducer', () => {
  const reducer =  loading
  const initialState = false

  it('initial state returns false', () => {
    expect(reducer()).to.eql(initialState)
  })

  it(APP_LOADING, () => {
  const eventualState = true

  const loadingAction = {
    type: APP_LOADING,
    payload: eventualState
  }

  expect(reducer(initialState, loadingAction)).to.eql(eventualState)
  })

  it(APP_DONE_LOADING, () => {
  const eventualState = false

  const loadingAction = {
    type: APP_DONE_LOADING,
    payload: eventualState
  }

  expect(reducer(initialState, loadingAction)).to.eql(eventualState)
  })
})

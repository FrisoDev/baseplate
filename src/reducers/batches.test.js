import { expect } from 'chai'
import batches from './batches'
import { FETCHED_BATCHES, FETCHED_ONE_BATCH} from '../actions/batches/fetch'

describe('batches reducer', () => {
  const reducer = batches
  const initialState = []

  it('returns an array', () => {
    expect(reducer()).to.eql(initialState)
  })

  it(FETCHED_BATCHES, () => {
  const eventualState = ['1', '2']

  const fetchAction = {
    type: FETCHED_BATCHES,
    payload: eventualState
  }

  expect(reducer(initialState, fetchAction)).to.eql(eventualState)

  it(FETCHED_ONE_BATCH, () => {
    const eventualState = ['1', '2']

    const fetchAction = {
      type: FETCHED_ONE_BATCH,
      payload: eventualState
    }

    expect(reducer(initialState, fetchAction)).to.eql(eventualState)
  })
 })
})

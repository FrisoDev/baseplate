import { expect } from 'chai'
import batches from './batches'
import { FETCHED_ONE_STUDENT} from '../actions/students/fetch'

describe('batches reducer', () => {
  const reducer = batches
  const initialState = []

  it('returns an array', () => {
    expect(reducer()).to.eql(initialState)
  })

  it(FETCHED_ONE_STUDENT, () => {
  const eventualState = []

  const fetchAction = {
    type: FETCHED_ONE_STUDENT,
    payload: eventualState
  }

  expect(reducer(initialState, fetchAction)).to.eql(eventualState)
 })
})

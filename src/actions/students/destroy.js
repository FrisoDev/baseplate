import API from '../../api/client'
import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import { push } from 'react-router-redux'

export const DELETE_STUDENT = 'DELETE_STUDENT'

const api = new API()

export default (student) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

  api.delete(`/students/${student._id}`)
    .then((result) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({ type: LOAD_SUCCESS })
      dispatch(push(`/batches/${student.batchId}`))

    })

    .catch((error) => {
      dispatch({ type: APP_DONE_LOADING })
      dispatch({
        type: LOAD_ERROR,
        payload: error.message
      })
    })
  }
}

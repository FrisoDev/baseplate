import {
  APP_LOADING,
  APP_DONE_LOADING,
  LOAD_ERROR,
  LOAD_SUCCESS
} from '../loading'
import API from '../../api/client'
import { fetchOneBatch } from '../batches/fetch'

export const EVAL_STUDENT = 'EVAL_STUDENT'

const api = new API()

export default (evalu,studentId,batchId) => {
  return dispatch => {
    dispatch({ type: APP_LOADING })

   api.patch(`/students/${studentId}`, evalu)
      .then((result) => {
        dispatch({ type: APP_DONE_LOADING })
        dispatch({ type: LOAD_SUCCESS })
        dispatch(fetchOneBatch(batchId))

        dispatch({
          type: EVAL_STUDENT,
          payload: result.body
        })
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

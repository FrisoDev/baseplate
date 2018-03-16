import { FETCHED_ONE_STUDENT, EVAL_STUDENT, UPDATE_STUDENT } from '../actions/students'
import { FETCHED_ONE_BATCH } from '../actions/batches'

export default (state = [], { type, payload } = {}) => {
  switch(type) {

     case FETCHED_ONE_BATCH:
        return [...payload.students]

      case UPDATE_STUDENT:
      case EVAL_STUDENT :
      console.log(payload)
        return state.map((student) => {
          if (student._id === payload._id) {
           return { ...payload }
         }
         return student
       })

     case FETCHED_ONE_STUDENT :
       const studentIds = state.map(s => s._id)
        if (studentIds.indexOf(payload._id) < 0) {
        return [{ ...payload }].concat(state)
   }

      return state.map((student) => {
        if (student._id === payload._id) {
        return { ...payload }
       }
         return student
     })

    default :
      return state
  }
}

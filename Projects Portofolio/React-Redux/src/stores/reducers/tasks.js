// Req 10: Import tipul de acțiune ADD_TASK
import { ADD_TASK } from '../actions/tasks'

// Req 02: Starea inițială cu 3 task-uri predefinite
const initialState = {
  list: [
    { id: 1, title: 'Învață Redux' },
    { id: 2, title: 'Scrie tema la React' },
    { id: 3, title: 'Bea o cafea' }
  ]
}

export function tasksReducer(state = initialState, action) {
  switch (action.type) {
    // Req 10: Tratarea acțiunii ADD_TASK
    case ADD_TASK:
      return {
        ...state,
        list: [...state.list, action.payload]
      }

    default:
      return state
  }
}

import { combineReducers } from 'redux'
import { tasksReducer } from './tasks'
import { selectionReducer } from './selection'

// Req 01: rootReducer cu slice-urile tasks și selection
export const rootReducer = combineReducers({
  tasks: tasksReducer,
  selection: selectionReducer
})

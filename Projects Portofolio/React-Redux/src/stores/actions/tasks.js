// Req 04: Constantă ADD_TASK
export const ADD_TASK = 'ADD_TASK'

// Req 05: Action creator addTask
export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task
})

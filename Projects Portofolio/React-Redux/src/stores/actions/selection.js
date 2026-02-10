// Req 06: Constantă SELECT_TASK
export const SELECT_TASK = 'SELECT_TASK'

// Req 07: Constantă DESELECT_TASK
export const DESELECT_TASK = 'DESELECT_TASK'

// Req 08: Action creator selectTask
export const selectTask = (taskId) => ({
    type: SELECT_TASK,
    payload: taskId
})

// Req 09: Action creator deselectTask
export const deselectTask = (taskId) => ({
    type: DESELECT_TASK,
    payload: taskId
})

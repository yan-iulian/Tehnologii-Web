// Req 11: Import tipurile de acțiuni pentru selecție
import { SELECT_TASK, DESELECT_TASK } from '../actions/selection'

// Req 03: Starea inițială cu selectedIds gol
const initialState = {
  selectedIds: []
}

export function selectionReducer(state = initialState, action) {
  switch (action.type) {
    // Req 11: Tratarea acțiunii SELECT_TASK
    case SELECT_TASK:
      // Nu permite duplicate
      if (state.selectedIds.includes(action.payload)) {
        return state
      }
      return {
        ...state,
        selectedIds: [...state.selectedIds, action.payload]
      }

    // Req 11: Tratarea acțiunii DESELECT_TASK
    case DESELECT_TASK:
      return {
        ...state,
        selectedIds: state.selectedIds.filter(id => id !== action.payload)
      }

    default:
      return state
  }
}

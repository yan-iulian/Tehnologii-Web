import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { describe, expect, it } from 'vitest'

import App from '../App'
import { rootReducer } from '../stores/reducers'

function renderWithStore(ui, { preloadedState } = {}) {
  const store = createStore(rootReducer, preloadedState)
  const result = render(
    <Provider store={store}>
      {ui}
    </Provider>
  )

  return { store, ...result }
}

describe('Redux + React test 19', () => {
  it('Requirement 19: AddTaskForm trimite acțiunea ADD_TASK și noul task apare în TaskList', () => {
    const { store } = renderWithStore(<App />)

    const input = screen.getByPlaceholderText('Titlul task-ului')
    const addButton = screen.getByText('Add task')

    fireEvent.change(input, { target: { value: 'Task nou pentru test' } })
    fireEvent.click(addButton)

    expect(screen.getByText('Task nou pentru test')).toBeInTheDocument()

    const state = store.getState()
    const lastTask = state.tasks.list[state.tasks.list.length - 1]
    expect(lastTask.title).toBe('Task nou pentru test')
  })
});
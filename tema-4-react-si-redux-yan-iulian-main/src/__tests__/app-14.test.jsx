import '@testing-library/jest-dom/vitest'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { describe, expect, it } from 'vitest'

import { rootReducer } from '../stores/reducers'

import App from '../App'

function renderWithStore(ui, { preloadedState } = {}) {
  const store = createStore(rootReducer, preloadedState)
  const result = render(
    <Provider store={store}>
      {ui}
    </Provider>
  )

  return { store, ...result }
}

describe('Redux + React test 14', () => {
  it('Requirement 14: TaskList folosește selectedIds pentru a afișa butoane "select" sau "deselect"', () => {
    const baseState = rootReducer(undefined, { type: '@@INIT' })
    const preloadedState = {
      ...baseState,
      selection: {
        ...baseState.selection,
        selectedIds: [baseState.tasks.list[0].id]
      }
    }

    renderWithStore(<App />, { preloadedState })

    const listItems = screen.getAllByRole('listitem')

    const firstItem = listItems[0]
    const secondItem = listItems[1]

    expect(firstItem.textContent).toContain('deselect')
    expect(secondItem.textContent).toContain('select')
  })
});
import '@testing-library/jest-dom/vitest'
import { render, screen, within } from '@testing-library/react'
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

describe('Redux + React test 17', () => {
  it('Requirement 17: SelectedTasksList afișează doar task-urile ale căror id-uri se află în selectedIds', () => {
    const baseState = rootReducer(undefined, { type: '@@INIT' })
    const ids = baseState.tasks.list.map(t => t.id)

    const preloadedState = {
      ...baseState,
      selection: {
        ...baseState.selection,
        selectedIds: [ids[0], ids[2]]
      }
    }

    renderWithStore(<App />, { preloadedState })

    const selectedSectionHeading = screen.getByRole('heading', {
      name: 'Task-uri selectate'
    })
    const selectedSection = selectedSectionHeading.parentElement
    const { getByText, queryByText } = within(selectedSection)

    expect(getByText('Învață Redux')).toBeInTheDocument()
    expect(getByText('Bea o cafea')).toBeInTheDocument()
    expect(queryByText('Scrie tema la React')).not.toBeInTheDocument()
  })
});
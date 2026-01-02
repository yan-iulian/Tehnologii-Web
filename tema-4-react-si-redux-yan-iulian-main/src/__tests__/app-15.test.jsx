import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
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

describe('Redux + React test 15', () => {
  it('Requirement 15: click pe "select" într-un rând din TaskList selectează task-ul și îl face vizibil în SelectedTasksList', () => {
    renderWithStore(<App />)

    const selectButtons = screen.getAllByText('select')
    fireEvent.click(selectButtons[0])

    // verificăm explicit în secțiunea "Task-uri selectate"
    const selectedSectionHeading = screen.getByRole('heading', {
      name: 'Task-uri selectate'
    })
    const selectedSection = selectedSectionHeading.parentElement
    const { getByText } = within(selectedSection)

    expect(getByText('Învață Redux')).toBeInTheDocument()

    // pe primul rând din TaskList butonul devine "deselect"
    const firstListItem = screen.getAllByRole('listitem')[0]
    expect(firstListItem.textContent).toContain('deselect')
  })
});
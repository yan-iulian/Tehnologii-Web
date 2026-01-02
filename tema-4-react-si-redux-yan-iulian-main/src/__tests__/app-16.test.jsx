import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen } from '@testing-library/react'
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

describe('Redux + React test 16', () => {
  it('Requirement 16: click pe "deselect" în TaskList scoate task-ul din SelectedTasksList', () => {
    renderWithStore(<App />)

    const selectButtons = screen.getAllByText('select')
    fireEvent.click(selectButtons[0])

    const deselectButton = screen.getAllByText('deselect')[0]
    fireEvent.click(deselectButton)

    // Căutăm din nou mesajul de listă goală (match flexibil)
    const emptyMessage = screen.getByText(text =>
      text.includes('Niciun') && text.includes('selectat')
    )

    expect(emptyMessage).toBeInTheDocument()
  })
});
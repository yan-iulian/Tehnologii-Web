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

describe('Redux + React test 13', () => {
  it('Requirement 13: SelectedTasksList afișează un mesaj de listă goală când selectedIds este gol', () => {
    renderWithStore(<App />)

    // Match mai flexibil: orice text care conține "Niciun" și "selectat"
    const emptyMessage = screen.getByText(text =>
      text.includes('Niciun') && text.includes('selectat')
    )

    expect(emptyMessage).toBeInTheDocument()
  })
});
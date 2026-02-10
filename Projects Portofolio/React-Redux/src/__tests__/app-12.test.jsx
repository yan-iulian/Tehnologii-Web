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

describe('Redux + React test 12', () => {
  it('Requirement 12: TaskList afișează task-urile citite din state.tasks.list', () => {
    renderWithStore(<App />)

    expect(screen.getByText('Învață Redux')).toBeInTheDocument()
    expect(screen.getByText('Scrie tema la React')).toBeInTheDocument()
    expect(screen.getByText('Bea o cafea')).toBeInTheDocument()
  })
});
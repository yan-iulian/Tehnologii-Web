import '@testing-library/jest-dom/vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
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

describe('Redux + React test 20', () => {
  it('Requirement 20: noul task adăugat poate fi selectat și apare în SelectedTasksList', () => {
    renderWithStore(<App />)

    const input = screen.getByPlaceholderText('Titlul task-ului')
    const addButton = screen.getByText('Add task')

    fireEvent.change(input, { target: { value: 'Task nou selectabil' } })
    fireEvent.click(addButton)

    // în TaskList găsim rândul cu acest text și apăsăm primul buton (select)
    const listItem = screen.getAllByRole('listitem').find(
      li => li.textContent?.includes('Task nou selectabil')
    )

    const selectButton = listItem.querySelector('button')
    fireEvent.click(selectButton)

    // verificăm în secțiunea "Task-uri selectate"
    const selectedSectionHeading = screen.getByRole('heading', {
      name: 'Task-uri selectate'
    })
    const selectedSection = selectedSectionHeading.parentElement
    const { getByText } = within(selectedSection)

    expect(getByText('Task nou selectabil')).toBeInTheDocument()
  })
});
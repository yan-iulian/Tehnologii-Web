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

describe('Redux + React test 18', () => {
  it('Requirement 18: click pe "deselect" în SelectedTasksList deselectează task-ul și actualizează mesajul de listă goală', () => {
    renderWithStore(<App />)

    const selectButtons = screen.getAllByText('select')
    fireEvent.click(selectButtons[0])

    // butonul "deselect" din lista de selecții pentru "Învață Redux"
    const selectedSectionHeading = screen.getByRole('heading', {
      name: 'Task-uri selectate'
    })
    const selectedSection = selectedSectionHeading.parentElement
    const utils = within(selectedSection)

    const deselectInSelectedList = utils.getAllByText('deselect').find(
      button => button.closest('li')?.textContent?.includes('Învață Redux')
    )

    fireEvent.click(deselectInSelectedList)

    // Mesajul de listă goală (match flexibil)
    const emptyMessage = screen.getByText(text =>
      text.includes('Niciun') && text.includes('selectat')
    )

    expect(emptyMessage).toBeInTheDocument()
  })
});
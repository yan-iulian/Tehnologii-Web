import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

import { rootReducer } from '../stores/reducers'

describe('Redux + React test 1', () => {
  it('Requirement 01: rootReducer expune slice-urile tasks și selection', () => {
    const state = rootReducer(undefined, { type: '@@INIT' })
    expect(state).toHaveProperty('tasks')
    expect(state).toHaveProperty('selection')
  })
});

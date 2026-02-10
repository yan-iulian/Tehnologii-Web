import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

import {
  ADD_TASK,
} from '../stores/actions/tasks'

describe('Redux + React test 4', () => {
  it('Requirement 04: acțiunea ADD_TASK este definită și exportată ca string constant', () => {
    expect(ADD_TASK).toBe('ADD_TASK')
  })
});
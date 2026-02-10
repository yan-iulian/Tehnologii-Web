import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

import {
  SELECT_TASK
} from '../stores/actions/selection'

describe('Redux + React test 6', () => {
  it('Requirement 06: constantă SELECT_TASK este definită și exportată', () => {
    expect(SELECT_TASK).toBe('SELECT_TASK')
  })
});
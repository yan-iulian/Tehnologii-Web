import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

import {
  DESELECT_TASK

} from '../stores/actions/selection'

describe('Redux + React test 7', () => {
  it('Requirement 07: constantă DESELECT_TASK este definită și exportată', () => {
    expect(DESELECT_TASK).toBe('DESELECT_TASK')
  })
});
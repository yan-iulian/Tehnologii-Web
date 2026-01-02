import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';

import { rootReducer } from '../stores/reducers';

describe('Redux + React test 3', () => {
  it('Requirement 03: starea inițială de selection are selectedIds gol', () => {
    const state = rootReducer(undefined, { type: '@@INIT' })
    expect(Array.isArray(state.selection.selectedIds)).toBe(true)
    expect(state.selection.selectedIds.length).toBe(0)
  })
});
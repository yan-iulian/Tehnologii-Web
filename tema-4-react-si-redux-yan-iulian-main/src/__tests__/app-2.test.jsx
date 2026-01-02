import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';

import { rootReducer } from '../stores/reducers';

describe('Redux + React test 2', () => {
  it('Requirement 02: starea inițială de tasks conține exact 3 task-uri predefinite', () => {
    const state = rootReducer(undefined, { type: '@@INIT' })
    expect(Array.isArray(state.tasks.list)).toBe(true)
    expect(state.tasks.list.length).toBe(3)
  })
});
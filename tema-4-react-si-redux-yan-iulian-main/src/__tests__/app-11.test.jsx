import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';

import { selectionReducer } from '../stores/reducers/selection';

import {
  deselectTask,
  selectTask
} from '../stores/actions/selection';

describe('Redux + React test 11', () => {
  it('Requirement 11: selectionReducer tratează SELECT_TASK și DESELECT_TASK fără duplicate și cu imutabilitate', () => {
    const initial = {
      selectedIds: []
    }

    const afterSelect = selectionReducer(initial, selectTask(3))
    expect(afterSelect.selectedIds).toEqual([3])
    expect(afterSelect).not.toBe(initial)
    expect(afterSelect.selectedIds).not.toBe(initial.selectedIds)

    const afterDuplicateSelect = selectionReducer(afterSelect, selectTask(3))
    expect(afterDuplicateSelect.selectedIds).toEqual([3])

    const afterDeselect = selectionReducer(afterSelect, deselectTask(3))
    expect(afterDeselect.selectedIds).toEqual([])
  })
});
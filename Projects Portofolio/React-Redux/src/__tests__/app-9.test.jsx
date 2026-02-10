import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';

import {
  DESELECT_TASK,
  deselectTask
} from '../stores/actions/selection';

describe('Redux + React test 9', () => {
  it('Requirement 09: deselectTask(id) întoarce acțiunea corectă cu type DESELECT_TASK și payload id', () => {
    const action = deselectTask(7)

    expect(action).toEqual({
      type: DESELECT_TASK,
      payload: 7
    })
  })
});
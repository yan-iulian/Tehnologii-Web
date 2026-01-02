import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';

import {
  SELECT_TASK,
  selectTask,
} from '../stores/actions/selection';

describe('Redux + React test 8', () => {
  it('Requirement 08: selectTask(id) întoarce acțiunea corectă cu type SELECT_TASK și payload id', () => {
    const action = selectTask(5)

    expect(action).toEqual({
      type: SELECT_TASK,
      payload: 5
    })
  })
});
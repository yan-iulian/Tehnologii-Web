import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom/vitest'

import {
  ADD_TASK,
  addTask
} from '../stores/actions/tasks'

describe('Redux + React test 5', () => {
  it('Requirement 05: addTask(task) întoarce acțiunea corectă cu type ADD_TASK și payload task', () => {
    const task = { id: 10, title: 'Test task' }
    const action = addTask(task)

    expect(action).toEqual({
      type: ADD_TASK,
      payload: task
    })
  })
});
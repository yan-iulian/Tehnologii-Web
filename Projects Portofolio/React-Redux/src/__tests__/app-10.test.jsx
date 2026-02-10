import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';

import {
  addTask
} from '../stores/actions/tasks';
import { tasksReducer } from '../stores/reducers/tasks';


describe('Redux + React test 10', () => {
  it('Requirement 10: tasksReducer tratează ADD_TASK adăugând payload-ul la listă', () => {
    const initial = {
      list: [{ id: 1, title: 'A' }]
    }

    const newTask = { id: 2, title: 'B' }
    const next = tasksReducer(initial, addTask(newTask))

    expect(next.list.length).toBe(2)
    expect(next.list[1]).toEqual(newTask)
  })
});
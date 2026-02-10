### Redux + React Homework – Requirements (EN)

Each requirement corresponds to one automated test (“Requirement 01” … “Requirement 20”).  
Implement the application so that **all** requirements below are satisfied.

---

#### Requirement 01 – Store structure

Implement `rootReducer` so that the global state contains two slices:

- `tasks`
- `selection`

---

#### Requirement 02 – Initial state for tasks

In the `tasks` reducer, the initial state must contain exactly 3 predefined tasks stored in an array named `list`.

---

#### Requirement 03 – Initial state for selection

In the `selection` reducer, the initial state must contain an empty `selectedIds` array.

---

#### Requirement 04 – ADD_TASK constant

Define and export a constant `ADD_TASK` (string literal `'ADD_TASK'`) in `stores/actions/tasks.js`.

---

#### Requirement 05 – addTask action creator

Implement `addTask(task)` in `stores/actions/tasks.js` so that it returns an action object with:

- `type: ADD_TASK`
- `payload: task`

---

#### Requirement 06 – SELECT_TASK constant

Define and export a constant `SELECT_TASK` (string literal `'SELECT_TASK'`) in `stores/actions/selection.js`.

---

#### Requirement 07 – DESELECT_TASK constant

Define and export a constant `DESELECT_TASK` (string literal `'DESELECT_TASK'`) in `stores/actions/selection.js`.

---

#### Requirement 08 – selectTask action creator

Implement `selectTask(taskId)` in `stores/actions/selection.js` so that it returns an action object with:

- `type: SELECT_TASK`
- `payload: taskId`

---

#### Requirement 09 – deselectTask action creator

Implement `deselectTask(taskId)` in `stores/actions/selection.js` so that it returns an action object with:

- `type: DESELECT_TASK`
- `payload: taskId`

---

#### Requirement 10 – tasksReducer handles ADD_TASK

In `tasksReducer`, handle the `ADD_TASK` action so that:

- the new task from `action.payload` is appended at the end of `state.list`;
- immutability is preserved (do not mutate `state` directly, return a new object).

---

#### Requirement 11 – selectionReducer handles SELECT_TASK and DESELECT_TASK

In `selectionReducer`:

1. For `SELECT_TASK`:
   - add `action.payload` to `selectedIds` **only if** the id is not already present (no duplicates);
   - preserve immutability.

2. For `DESELECT_TASK`:
   - remove `action.payload` from `selectedIds` if present;
   - preserve immutability.

---

#### Requirement 12 – TaskList displays tasks

In the `TaskList` component:

- Read the tasks from `state.tasks.list` (using `useSelector`).
- Render all task titles in the UI.

---

#### Requirement 13 – SelectedTasksList shows an empty-list message

In the `SelectedTasksList` component:

- Read `tasks` and `selectedIds` from the store.
- If no tasks are selected (`selectedIds` is empty), display an empty-state message such as:
  - “Niciun task selectat” or an equivalent text clearly indicating that there are no selections.

---

#### Requirement 14 – TaskList differentiates selected vs. unselected

In `TaskList`:

- Determine for each task whether it is selected (its id is in `selectedIds`).
- For selected tasks, render a `deselect` button.
- For unselected tasks, render a `select` button.

---

#### Requirement 15 – Selecting in TaskList adds to SelectedTasksList

In `TaskList`:

- When clicking the `select` button for a task:
  - dispatch `selectTask(id)`;
  - that task must appear in `SelectedTasksList`;
  - on that row in `TaskList`, the button must change from `select` to `deselect`.

---

#### Requirement 16 – Deselect in TaskList empties SelectedTasksList when appropriate

In `TaskList`:

- When clicking the `deselect` button for a task:
  - dispatch `deselectTask(id)`;
  - if no tasks remain selected after this operation, `SelectedTasksList` must display the empty-list message again.

---

#### Requirement 17 – SelectedTasksList filters correctly by selectedIds

In `SelectedTasksList`:

- Build a `selectedTasks` list that contains only the tasks whose ids are present in `selectedIds`.
- Render **only** these tasks in the selected list (no other tasks).

---

#### Requirement 18 – Deselect from SelectedTasksList

In `SelectedTasksList`:

- For each selected task, render a `deselect` button.
- When clicking `deselect` for a task:
  - dispatch `deselectTask(id)`;
  - if no tasks remain selected after this operation, display the empty-list message.

---

#### Requirement 19 – AddTaskForm dispatches ADD_TASK

In `AddTaskForm`:

- Store the new task title in local component state (e.g. `title`).
- Read the current list of tasks from the store (in order to compute a new id).
- On submit:
  - prevent the default form submission;
  - ignore the input if the title is empty (only whitespace);
  - build a `newTask` object with:
    - `id` = a new id (e.g. `maxId + 1`);
    - `title` = the trimmed input title;
  - dispatch `addTask(newTask)`;
  - clear the input after adding the task.

---

#### Requirement 20 – The new task can be selected

Ensure that:

- The task added through `AddTaskForm` appears in `TaskList`.
- Its row has a `select` button.
- Clicking `select` adds this new task to `SelectedTasksList`, and it behaves like any other task with respect to select/deselect.

### Tema Redux + React – Cerințe (RO)

Fiecare cerință corespunde unui test automat („Requirement 01” … „Requirement 20”).  
Implementați aplicația astfel încât toate cerințele de mai jos să fie îndeplinite.

---

#### Requirement 01 – Structura store-ului

Implementați `rootReducer` astfel încât starea globală să conțină două slice-uri:

- `tasks`
- `selection`

---

#### Requirement 02 – Starea inițială pentru tasks

În reducer-ul pentru `tasks`, starea inițială trebuie să conțină exact 3 task-uri predefinite, stocate într-un array `list`.

---

#### Requirement 03 – Starea inițială pentru selection

În reducer-ul pentru `selection`, starea inițială trebuie să conțină un array `selectedIds` gol.

---

#### Requirement 04 – Constanta ADD_TASK

Definiți și exportați o constantă `ADD_TASK` (string literal `'ADD_TASK'`) în `stores/actions/tasks.js`.

---

#### Requirement 05 – Action creator addTask

Implementați `addTask(task)` în `stores/actions/tasks.js` astfel încât să întoarcă un obiect de acțiune:

- `type: ADD_TASK`
- `payload: task`

---

#### Requirement 06 – Constanta SELECT_TASK

Definiți și exportați o constantă `SELECT_TASK` (string literal `'SELECT_TASK'`) în `stores/actions/selection.js`.

---

#### Requirement 07 – Constanta DESELECT_TASK

Definiți și exportați o constantă `DESELECT_TASK` (string literal `'DESELECT_TASK'`) în `stores/actions/selection.js`.

---

#### Requirement 08 – Action creator selectTask

Implementați `selectTask(taskId)` în `stores/actions/selection.js` astfel încât să întoarcă un obiect de acțiune:

- `type: SELECT_TASK`
- `payload: taskId`

---

#### Requirement 09 – Action creator deselectTask

Implementați `deselectTask(taskId)` în `stores/actions/selection.js` astfel încât să întoarcă un obiect de acțiune:

- `type: DESELECT_TASK`
- `payload: taskId`

---

#### Requirement 10 – Reducer-ul tasks tratează ADD_TASK

În `tasksReducer`, tratați acțiunea `ADD_TASK` astfel încât:

- noul task din `action.payload` să fie adăugat la finalul array-ului `state.list`
- să respectați imutabilitatea (nu modificați direct `state`, ci creați un nou obiect).

---

#### Requirement 11 – Reducer-ul selection tratează SELECT_TASK și DESELECT_TASK

În `selectionReducer`:

1. Pentru `SELECT_TASK`:
   - adăugați `action.payload` în `selectedIds` **doar dacă** id-ul nu există deja (nu permiteți duplicate);
   - respectați imutabilitatea.

2. Pentru `DESELECT_TASK`:
   - eliminați `action.payload` din `selectedIds`, dacă există;
   - respectați imutabilitatea.

---

#### Requirement 12 – TaskList afișează task-urile

În componenta `TaskList`:

- Citiți lista de task-uri din `state.tasks.list` (folosind `useSelector`).
- Afișați toate titlurile task-urilor din listă în interfață.

---

#### Requirement 13 – SelectedTasksList afișează mesaj pentru listă goală

În componenta `SelectedTasksList`:

- Citiți `tasks` și `selectedIds` din store.
- Dacă niciun task nu este selectat (`selectedIds` este gol), afișați un mesaj de tip:
  - „Niciun task selectat” sau un text echivalent care indică clar că nu există selecții.

---

#### Requirement 14 – TaskList diferențiază între selectat / neselectat

În `TaskList`:

- Determinați pentru fiecare task dacă este selectat (id-ul se află în `selectedIds`).
- Pentru task-urile selectate afișați un buton `deselect`.
- Pentru task-urile neselectate afișați un buton `select`.

---

#### Requirement 15 – Select din TaskList adaugă în SelectedTasksList

În `TaskList`:

- La click pe butonul `select` al unui task:
  - dispecerați acțiunea `selectTask(id)`.
  - task-ul trebuie să apară în `SelectedTasksList`.
  - pe rândul din `TaskList`, butonul trebuie să devină `deselect`.

---

#### Requirement 16 – Deselect din TaskList goliște SelectedTasksList (când e cazul)

În `TaskList`:

- La click pe butonul `deselect` al unui task:
  - dispecerați acțiunea `deselectTask(id)`.
  - dacă nu mai rămâne niciun task selectat, `SelectedTasksList` trebuie să afișeze din nou mesajul de listă goală.

---

#### Requirement 17 – SelectedTasksList filtrează corect după selectedIds

În `SelectedTasksList`:

- Construiți o listă `selectedTasks` care conține doar task-urile a căror id se regăsește în `selectedIds`.
- Afișați în această listă **doar** aceste task-uri (niciun alt task).

---

#### Requirement 18 – Deselect din SelectedTasksList

În `SelectedTasksList`:

- Pentru fiecare task selectat afișați un buton `deselect`.
- La click pe `deselect` pentru un task:
  - dispecerați `deselectTask(id)`.
  - dacă după această operație nu mai există task-uri selectate, afișați mesajul de listă goală.

---

#### Requirement 19 – AddTaskForm trimite ADD_TASK

În `AddTaskForm`:

- Țineți titlul noului task într-o stare locală (ex. `title`).
- Citiți lista curentă de task-uri din store (pentru a putea calcula un id nou).
- La submit:
  - preveniți comportamentul default al formularului;
  - ignorați input-ul dacă titlul este gol (doar whitespace);
  - construiți un obiect `newTask` cu:
    - `id` = un nou id (de ex. `maxId + 1`);
    - `title` = titlul introdus, tăiat de spații inutile;
  - dispecerați `addTask(newTask)`;
  - goliți input-ul după adăugare.

---

#### Requirement 20 – Noul task poate fi selectat

Asigurați-vă că:

- Task-ul adăugat prin `AddTaskForm` apare în `TaskList`.
- Rândul corespunzător are un buton `select`.
- La click pe `select`, noul task apare în `SelectedTasksList` și poate fi gestionat la fel ca oricare alt task.

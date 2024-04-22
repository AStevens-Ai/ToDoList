const renderDom = require('./renderDom').default;
import '../styles.css';
import '../buttons.css'

function saveTodosToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todosArray));
}

function loadTodosFromLocalStorage() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todosArray = JSON.parse(storedTodos);
    renderAllTodos(); // Render todos after loading from Local Storage
  }
}

let todosArray = [];
class Todo {
  constructor(title, description, duedate, priority, notes, checklist) {
    (this.title = title),
      (this.description = description),
      (this.duedate = duedate),
      (this.priority = priority),
      (this.notes = notes),
      (this.checklist = checklist);
  }
}
const newTodo = new Todo(
  "Test", // Title
  "Do test", // Description
  "2024-04-22", // Due Date
  "Medium", // Priority
  "test", // Notes
  "test" // Checklist
);

todosArray.push(newTodo);

const list = document.querySelector('.list');

function createTodo(formData) {
  todosArray.push(formData);
  list.innerHTML = '';
  todosArray.forEach((data) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const title = document.createElement('h2');
    title.textContent = `Todo Title: ${data.title}`;

    const description = document.createElement('p');
    description.textContent = `Description: ${data.description}`;

    const duedate = document.createElement('p');
    duedate.textContent = `Due Date: ${data.duedate}`;

    const priority = document.createElement('p');
    priority.textContent = `priority: ${data.priority}`;

    const notes = document.createElement('p');
    notes.textContent = `Notes: ${data.notes}`;

    const checklist = document.createElement('p');
    checklist.textContent = `CheckList: ${data.checklist}`;

    todo.appendChild(title);
    todo.appendChild(description);
    todo.appendChild(duedate);
    todo.appendChild(priority);
    todo.appendChild(notes);
    todo.appendChild(checklist);

    list.appendChild(todo);

    saveTodosToLocalStorage();
  });
}
// Function to render all todos
function renderAllTodos() {
  list.innerHTML = ''
  createTodoElements(todosArray);
  saveTodosToLocalStorage();
}

// Function to render low priority todos
function renderLowPriorityTodos() {
  list.innerHTML = ''
  const lowPriorityTodos = todosArray.filter(todo => todo.priority === 'Low');
  createTodoElements(lowPriorityTodos);
}

// Function to render medium priority todos
function renderMediumPriorityTodos() {
  list.innerHTML = ''
  const mediumPriorityTodos = todosArray.filter(todo => todo.priority === 'Medium');
  createTodoElements(mediumPriorityTodos);
}

// Function to render high priority todos
function renderHighPriorityTodos() {
  list.innerHTML = ''
  const highPriorityTodos = todosArray.filter(todo => todo.priority === 'High');
  createTodoElements(highPriorityTodos);
}

// Function to create todo elements
function createTodoElements(todos) {
  list.innerHTML = '';
  todos.forEach((data, index) => {
    const todo = document.createElement('div');
    todo.classList.add('todo');

    const title = document.createElement('h2');
    title.textContent = `Todo Title: ${data.title}`;

    const description = document.createElement('p');
    description.textContent = `Description: ${data.description}`;

    const duedate = document.createElement('p');
    duedate.textContent = `Due Date: ${data.duedate}`;

    const priority = document.createElement('p');
    priority.textContent = `Priority: ${data.priority}`;

    const notes = document.createElement('p');
    notes.textContent = `Notes: ${data.notes}`;

    const checklist = document.createElement('p');
    checklist.textContent = `Checklist: ${data.checklist}`;

    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', () => {
      deleteTodo(index)
    })
    deleteButton.textContent = 'delete todo'
    deleteButton.classList.add('button-5', 'button-def', 'delete-btn')

    todo.appendChild(title);
    todo.appendChild(description);
    todo.appendChild(duedate);
    todo.appendChild(priority);
    todo.appendChild(notes);
    todo.appendChild(checklist);
    todo.appendChild(deleteButton)

    list.appendChild(todo);
  });
}

function deleteTodo(index) {
  todosArray.splice(index, 1); // Remove the todo at the specified index
  renderAllTodos(); // Re-render todos after deletion
}


document.addEventListener('DOMContentLoaded', function () {
  renderDom(createTodo);

  // Render all todos by default
  loadTodosFromLocalStorage()

  // Attach event listeners to each tab
  const allTodosTab = document.getElementById('allTodosTab');
  const lowPriorityTab = document.getElementById('lowPriorityTab');
  const mediumPriorityTab = document.getElementById('mediumPriorityTab');
  const highPriorityTab = document.getElementById('highPriorityTab');

  allTodosTab.addEventListener('click', renderAllTodos);
  lowPriorityTab.addEventListener('click', renderLowPriorityTodos);
  mediumPriorityTab.addEventListener('click', renderMediumPriorityTodos);
  highPriorityTab.addEventListener('click', renderHighPriorityTodos);
});
const renderDom = require('./renderDom').default;
import '../styles.css';

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
let todosArray = [];
const list = document.querySelector('.list');

function createTodo(formData) {
  todosArray.push(formData);
  todosArray.forEach((data) => {
    const todo = document.createElement('p');
    todo.classList.add('todo');
    todo.textContent = `Todo Title: ${data.title}, Description: ${data.description}, Due Date: ${data.duedate}, Priority: ${data.priority}, Notes: ${data.notes}, Checklist: ${data.checklist}`;
    list.appendChild(todo);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  renderDom(createTodo);
});

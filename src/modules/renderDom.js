export default function renderDom(callback) {
  // Modal Container
  const modalCtn = document.createElement('div');
  modalCtn.classList.add('modal');

  // Page content
  const openBtn = document.createElement('button');
  openBtn.textContent = 'Open Modal';

  // Modal content
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'X';
  closeBtn.style.display = 'none'; // Initially hide the close button

  // Form element
  const form = document.createElement('form');

  // Title input
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Title:';
  const titleInput = document.createElement('input');
  titleInput.setAttribute('type', 'text');
  titleInput.setAttribute('name', 'title');

  // Description input
  const descriptionLabel = document.createElement('label');
  descriptionLabel.textContent = 'Description:';
  const descriptionInput = document.createElement('textarea');
  descriptionInput.setAttribute('name', 'description');

  // Due date input
  const duedateLabel = document.createElement('label');
  duedateLabel.textContent = 'Due Date:';
  const duedateInput = document.createElement('input');
  duedateInput.setAttribute('type', 'date');
  duedateInput.setAttribute('name', 'duedate');

  // Priority input
  const priorityLabel = document.createElement('label');
  priorityLabel.textContent = 'Priority:';
  const priorityInput = document.createElement('select');
  priorityInput.setAttribute('name', 'priority');
  const priorities = ['Low', 'Medium', 'High'];
  priorities.forEach((priority) => {
    const option = document.createElement('option');
    option.textContent = priority;
    priorityInput.appendChild(option);
  });

  // Notes input
  const notesLabel = document.createElement('label');
  notesLabel.textContent = 'Notes:';
  const notesInput = document.createElement('textarea');
  notesInput.setAttribute('name', 'notes');

  // Checklist input
  const checklistLabel = document.createElement('label');
  checklistLabel.textContent = 'Checklist:';
  const checklistInput = document.createElement('textarea');
  checklistInput.setAttribute('name', 'checklist');

  // Submit button
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';

  // Appending children
  modalCtn.appendChild(closeBtn);
  modalCtn.appendChild(form);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(descriptionLabel);
  form.appendChild(descriptionInput);
  form.appendChild(duedateLabel);
  form.appendChild(duedateInput);
  form.appendChild(priorityLabel);
  form.appendChild(priorityInput);
  form.appendChild(notesLabel);
  form.appendChild(notesInput);
  form.appendChild(checklistLabel);
  form.appendChild(checklistInput);
  form.appendChild(submitBtn);

  document.body.appendChild(modalCtn); // Append modal container to the document body

  const todos = document.querySelector('.list');
  if (todos) {
    // Check if '.list' element exists
    todos.appendChild(openBtn); // Append open button to '.list' element
  } else {
    console.error("Element with class 'list' not found.");
  }

  // Function to handle opening the modal
  openBtn.addEventListener('click', function () {
    // Show the modal and the close button
    modalCtn.style.display = 'block';
    closeBtn.style.display = 'block';
  });

  // Function to handle closing the modal
  closeBtn.addEventListener('click', function () {
    // Hide the modal and the close button
    modalCtn.style.display = 'none';
    closeBtn.style.display = 'none';
  });

  window.onclick = function (event) {
    if (event.target == modalCtn) {
      modalCtn.style.display = 'none';
    }
  };

  // Function to handle form submission
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    // Access form fields here and submit them
    const formData = {
      title: titleInput.value,
      description: descriptionInput.value,
      duedate: duedateInput.value,
      priority: priorityInput.value,
      notes: notesInput.value,
      checklist: checklistInput.value,
    };
    if (typeof callback === 'function') {
      callback(formData);
    }
    modalCtn.style.display = 'none';
  });
}

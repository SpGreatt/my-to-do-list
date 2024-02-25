document.addEventListener('DOMContentLoaded', function () {
    loadTasks();
});

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach(function (task, index) {
        addTaskToDOM(task, index);
    });
}
// create a new task, that is also stored on your local storage
function addTask() {
    const newTaskInput = document.getElementById('newTask');
    const newTaskText = newTaskInput.value.trim();

    if (newTaskText === '') return;

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: newTaskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToDOM({ text: newTaskText, completed: false }, tasks.length - 1);

    newTaskInput.value = '';
}
// upon new task addition, the edit and delete buttons are added
function addTaskToDOM(task, index) {
    const taskList = document.getElementById('taskList');
    const newTaskItem = document.createElement('li');
    newTaskItem.innerHTML = `
        <span>${task.text}</span>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
    `;

    if (task.completed) {
        newTaskItem.classList.add('completed');
    }

    newTaskItem.addEventListener('click', function () {
        toggleTaskCompletion(index);
    });

    taskList.appendChild(newTaskItem);
}

// edit button function
function editTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const editedText = prompt('Edit task:', tasks[index].text);

    if (editedText !== null) {
        tasks[index].text = editedText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

// delete button function
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    loadTasks();
}


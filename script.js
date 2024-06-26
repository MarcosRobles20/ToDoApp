
document.getElementById('tasks-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('tasks-title').value;
    const description = document.getElementById('tasks-description').value;
    const dueDate = document.getElementById('tasks-date').value;
    const importance = document.getElementById('tasks-importance').value;
    const status = document.getElementById('tasks-status').value;

    addTask(title, description, dueDate, importance,status);
});
function addTask(title, description, dueDate, importance, status) {
    const taskList = document.getElementById('tasks-list');
    const li = document.createElement('li');
    li.classList.add('task-item');

    // Crear celdas para cada categoría
    const titleCell = document.createElement('span');
    titleCell.textContent = title;
    const descriptionCell = document.createElement('span');
    descriptionCell.textContent = description;
    const dueDateCell = document.createElement('span');
    dueDateCell.textContent = dueDate;
    dueDateCell.setAttribute('data-due-date', dueDate);

    const importanceCell = document.createElement('span');
    importanceCell.textContent = importance;
    importanceCell.setAttribute('data-importance', importance);
    const statusCell = document.createElement('span');
    statusCell.textContent = status;

    // Crear y agregar botón de completado
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '✓';
    completeButton.classList.add('complete-button');
    completeButton.onclick = function() {
        li.classList.toggle('completed'); // Alternar la clase 'completed' para marcar como completado
        li.classList.contains('completed') ? statusCell.textContent = 'Completed' : statusCell.textContent = 'Pending';
    };

    // Crear y agregar botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '🗑'; // Ícono de basura
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function() {
        taskList.removeChild(li); // Eliminar la tarea de la lista
    };
    li.appendChild(completeButton);
    // Agregar celdas a la tarea
    li.appendChild(titleCell);
    li.appendChild(descriptionCell);
    li.appendChild(dueDateCell);
    li.appendChild(importanceCell);
    li.appendChild(statusCell);

    li.appendChild(deleteButton);
    

    // Agregar la tarea a la lista
    taskList.appendChild(li);

    // Marcar como completada si el estado inicial es 'completed'
    if (status.toLowerCase() === 'completed') {
        li.classList.add('completed');
    }
}
function filterTasks(status) {
    const allTasks = document.querySelectorAll('.task-item');
    allTasks.forEach(task => {
        switch (status.toLowerCase()) {
            case 'all':
                task.style.display = '';
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = '';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'pending':
                if (!task.classList.contains('completed')) {
                    task.style.display = '';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
}


function sortTasks(criteria) {
    let tasks = Array.from(document.querySelectorAll('#tasks-list li'));
    tasks.sort((a, b) => {
        let aDate = a.querySelector('[data-due-date]').getAttribute('data-due-date');
        let bDate = b.querySelector('[data-due-date]').getAttribute('data-due-date');
        let aImportance = a.querySelector('[data-importance]').getAttribute('data-importance');
        let bImportance = b.querySelector('[data-importance]').getAttribute('data-importance');

        if (criteria === 'asc') {
            return new Date(aDate) - new Date(bDate);
        } else if (criteria === 'desc') {
            return new Date(bDate) - new Date(aDate);
        } else if (criteria === 'importance') {
            const importanceLevels = { 'low': 1, 'medium': 2, 'high': 3 };
            return importanceLevels[bImportance] - importanceLevels[aImportance];
        }
    });

    const parent = document.getElementById('tasks-list');
    parent.innerHTML = ''; // Clear the list
    tasks.forEach(task => parent.appendChild(task)); // Append sorted tasks
}

function searchTasks() {
    let query = document.getElementById('task-search').value.toLowerCase();
    let tasks = document.querySelectorAll('#tasks-list li');

    tasks.forEach(task => {
        let title = task.querySelector('span').textContent.toLowerCase();
        if (title.includes(query)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}
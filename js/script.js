document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('tarea');
    const taskTitleInput = document.getElementById('nomTarea');
    const taskDateInput = document.getElementById('fecha');
    const taskPriorityInput = document.getElementById('prioridad');
    const taskList = document.getElementById('lista');

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id; 
        li.className = `priority-${task.priority}`; 

        if (task.completed) {
            li.classList.add('completed');
        }

        const taskInfo = document.createElement('span');
        taskInfo.textContent = `${task.title} (Fecha: ${task.date})`;
        
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completar';
        completeButton.className = 'complete-btn';
        
        completeButton.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks(); 
            renderAllTasks(); 
        });

        li.appendChild(taskInfo);
        li.appendChild(completeButton);

        taskList.appendChild(li);
    }

    function renderAllTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => renderTask(task));
    }

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const title = taskTitleInput.value;
        const date = taskDateInput.value;
        const priority = taskPriorityInput.value;

        const newTask = {
            id: Date.now(), 
            title: title,
            date: date,
            priority: priority,
            completed: false
        };

        tasks.push(newTask);
        
        saveTasks();
        renderAllTasks();

        taskForm.reset();
        

    });
    renderAllTasks();
});
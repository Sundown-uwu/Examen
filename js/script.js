document.addEventListener('DOMContentLoaded', () => {

    const tarea = document.getElementById('tarea');
    const tareaTitle = document.getElementById('nomTarea');
    const fechaTarea = document.getElementById('fecha');
    const prioridadTarea = document.getElementById('prioridad');
    const listaTarea = document.getElementById('lista');

    let tareas = JSON.parse(localStorage.getItem('tarea')) || [];

    function guardarTareas() {
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    function renderTask(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id; 
        li.className = `priority-${task.priority}`; 

        if (tarea.completada) {
            li.classList.add('completed');
        }

        const taskInfo = document.createElement('span');
        taskInfo.textContent = `${task.title} (Fecha: ${task.date})`;
        
        const completeButton = document.createElement('button');
        completeButton.textContent = 'Completar';
        completeButton.className = 'complete-btn';
        
        completeButton.addEventListener('click', () => {
            tarea.completada = !tarea.completada;
            guardarTareas(); 
            mostrar(); 
        });

        li.appendChild(taskInfo);
        li.appendChild(completeButton);

        listaTarea.appendChild(li);
    }

    function mostrar() {
        listaTarea.innerHTML = '';
        tareas.forEach(task => renderTask(task));
    }

    tarea.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const title = tareaTitle.value;
        const date = fechaTarea.value;
        const priority = prioridadTarea.value;

        const nuevaTarea = {
            id: Date.now(), 
            title: title,
            date: date,
            priority: priority,
            completed: false
        };

        tareas.push(nuevaTarea);
        
        guardarTareas();
        mostrar();

        tarea.reset();
        

    });
    mostrar();
});
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');
const taskDelFirst = document.querySelector('#taskDelFirst');
const taskDelLast = document.querySelector('#taskDelLast');
const taskEven = document.querySelector('#taskEven');
const taskOdd = document.querySelector('#taskOdd');


let tasks = [];
let even = false;
let odd = false;


if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    /*  tasks.forEach((task) => renderTask(task)); */
    renderTaskEvOdd(tasks);
}




checkEmptyList();


//добавление задачи
form.addEventListener('submit', addTask);

//удаление зачади
tasksList.addEventListener('click', deleteTask)

//отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)


//***
taskDelFirst.addEventListener('click', delFirst)
taskDelLast.addEventListener('click', delLast)
taskEven.addEventListener('click', evenTask)
taskOdd.addEventListener('click', oddTask)


function evenTask() {
    console.log(even);
    if (even) even = false; else even = true;
    safeToLocalStorage();
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTaskEvOdd(tasks);
    checkEmptyList();
}

function oddTask() {
    if (odd) odd = false; else odd = true;
    safeToLocalStorage();
    tasks = JSON.parse(localStorage.getItem('tasks'));
    renderTaskEvOdd(tasks);
    checkEmptyList();
}

function delFirst() {
    tasks.splice(0, 1);
    safeToLocalStorage();
    console.log('delFirst');
    renderTaskEvOdd(JSON.parse(localStorage.getItem('tasks')));
    checkEmptyList();
}

function delLast() {
    console.log(tasks.length);
    tasks.splice(tasks.length - 1, 1);
    safeToLocalStorage();
    renderTaskEvOdd(JSON.parse(localStorage.getItem('tasks')));
    checkEmptyList();
}


//***

function addTask(e) {    //отменили отправку формы
    e.preventDefault();
    //достаем текст задачи из поля ввода
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    console.log

    tasks.push(newTask);


    //добавляем задачу в хранилище локалстор
    safeToLocalStorage();
    taskInput.value = "";
    taskInput.focus();

    /* renderTask(newTask); //если бы не отмечать цветом */
    tasks = JSON.parse(localStorage.getItem('tasks'))
    renderTaskEvOdd(tasks);

    //очищаем поле ввода и взвр фокус
    taskInput.value = "";
    taskInput.focus();


    //проверка на кол во задач
    checkEmptyList();


}

function deleteTask(e) {


    if (e.target.dataset.action !== 'delete') return;


    const parenNode = e.target.closest('.list-group-item');

    const id = Number(parenNode.id);



    const index = tasks.findIndex((task) => task.id === id);
    tasks.splice(index, 1);

    safeToLocalStorage();

    parenNode.remove();
    checkEmptyList();
}




function doneTask(e) {
    if (e.target.dataset.action !== 'done') return;

    const parentNode = e.target.closest('.list-group-item');
    //определяем id задачи
    const id = Number(parentNode.id);
    const task = tasks.find(function (task) {
        if (task.id === id) {
            return true;
        }
    })

    task.done = !task.done;

    safeToLocalStorage();

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');

}

function checkEmptyList() {
    if (tasks.length === 0) {
        const emptyListHTML = `
        <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/watermelon.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }
    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
    }
}

function safeToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('even', JSON.stringify(even));
    localStorage.setItem('odd', JSON.stringify(odd));
}


function renderTaskEvOdd(tasks) {
    document.getElementById(id = "tasksList").innerHTML = "";
    for (let i = 0; i <= tasks.length - 1; i++) {
        if (i % 2 == 0) {
            renderTaskOdd(tasks[i]);
        } else {
            renderTaskEvv(tasks[i]);
        }
    }
}

function renderTaskEvv(task) {
    //формируем css класс
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    const evenIs = JSON.parse(localStorage.getItem('even')) ? "list-group-item d-flex justify-content-between task-item evenTask" : "list-group-item d-flex justify-content-between task-item";
    const taskHTML = `				
     <li id= "${task.id}" class="${evenIs}">
     <span class="${cssClass}">${task.text}</span>
     <div class="task-item__buttons">
         <button type="button" data-action="done" class="btn-action">
             <img src="./img/tick.svg" alt="Done" width="18" height="18">
         </button>
         <button type="button" data-action="delete" class="btn-action">
             <img src="./img/cross.svg" alt="Done" width="18" height="18">
         </button>
     </div>
    </li>`

    //добавление задачи на стр
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}

function renderTaskOdd(task) {
    //формируем css класс
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    const oddIs = JSON.parse(localStorage.getItem('odd')) ? "list-group-item d-flex justify-content-between task-item oddTask" : "list-group-item d-flex justify-content-between task-item";
    const taskHTML = `				
     <li id= "${task.id}" class="${oddIs}">
     <span class="${cssClass}">${task.text}</span>
     <div class="task-item__buttons">
         <button type="button" data-action="done" class="btn-action">
             <img src="./img/tick.svg" alt="Done" width="18" height="18">
         </button>
         <button type="button" data-action="delete" class="btn-action">
             <img src="./img/cross.svg" alt="Done" width="18" height="18">
         </button>
     </div>
    </li>`

    //добавление задачи на стр
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}


/* function renderTask(task) {
    //формируем css класс
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    const taskHTML = `				
     <li id= "${task.id}" class="list-group-item d-flex justify-content-between task-item">
     <span class="${cssClass}">${task.text}</span>
     <div class="task-item__buttons">
         <button type="button" data-action="done" class="btn-action">
             <img src="./img/tick.svg" alt="Done" width="18" height="18">
         </button>
         <button type="button" data-action="delete" class="btn-action">
             <img src="./img/cross.svg" alt="Done" width="18" height="18">
         </button>
     </div>
    </li>`

    //добавление задачи на стр
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
} */


const $body = document.querySelector('#body');
const $login = document.querySelector("#login");
const $todo = document.querySelector("#todo");
const $modalDelete = document.querySelector("#modal-delete");
const $modalEdit = document.querySelector("#modal-edit");
let $inputTask = document.querySelector('.todo__input-task');

const $btnLogin = document.querySelector('.login__submit');
const $btnAddTask = document.querySelector('#btn-add-task');
const $btnEditCancel = document.querySelector('#btn-edit-cancel');
const $btnDeleteNo = document.querySelector('#btn-delete-no');

let taskList = [];


$btnLogin.addEventListener('click', getLoginValue);
$btnLogin.addEventListener('click', validation);
$btnAddTask.addEventListener('click', addTask);
$btnDeleteNo.addEventListener('click', hideModalDelete);
$btnEditCancel.addEventListener('click', hideModalEdit);


function getLoginValue(event) {
    event.preventDefault();
    let email = document.querySelector('#email').value;
    let pass = document.querySelector('#pass').value;
    let errors = document.querySelectorAll('.login__text');

    if (email === 'testuser@todo.com' && pass === '12345678') {
        $login.classList.add('login_hidden');
        $todo.classList.add('todo_show');
    }
    if (email !== 'testuser@todo.com') {
        errors[0].classList.add('login__text_visible');
    }
    if (pass !== '12345678') {
        errors[1].classList.add('login__text_visible');
    }
}

function validation() {
    let $input = document.querySelector('#pass');
    let pass = document.querySelector('#pass').value;
    if (pass.length < 8 || pass.length > 12) {
        $input.classList.add('login__input_validation');
    }
}

function addTask() {
    const newTask = {
        year: new Date().getFullYear(),
        date: new Date().getDate(),
        month: new Date().getMonth() + 1,
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        todo: $inputTask.value,
        priority: 1,
    };
    taskList.push(newTask);
    $inputTask.value = '';
    let $task = document.createElement('div');
    if (newTask.todo.length === 0) $task = '';
    $task.className = 'task';
    $task.innerHTML = `            <div class="task__box-left">
            <div class="task__wrap">
                <time class="task__time">${newTask.date = (newTask.date < 10) ? '0' + newTask.date : false}.${newTask.month = (newTask.month < 10) ? '0' + newTask.month : false}.${newTask.year}</time>
                <time class="task__time">${newTask.hour}:${newTask.minute}</time>
                </div>
                <div class="task__priority">${newTask.priority}</div>
                <div class="task__wrap">
                    <button class="task__priority-button"><i class="fas fa-chevron-up"></i></button>
                    <button class="task__priority-button"><i class="fas fa-chevron-down"></i></button>
                </div>
            </div>
            <p class="task__text">${newTask.todo}</p>
            <div class="task__box-right">
                <button class="task__button task__button_green" onClick="showModalEdit();"><i class="fas fa-pencil-alt"></i></button>
                <button class="task__button"><i class="fas fa-check"></i></button>
                <button class="task__button" onClick="showModalDelete();"><i class="fas fa-trash-alt"></i></button>
            </div>`;
    $todo.children[0].append($task);
}

function showModalDelete() {
    $modalDelete.classList.add('modal-delete_show');
    $body.classList.add('body_hidden');
}

function hideModalDelete() {
    $modalDelete.classList.remove('modal-delete_show');
    $body.classList.remove('body_hidden');
}

function showModalEdit() {
    $modalEdit.classList.add('modal-edit_show');
    $body.classList.add('body_hidden');
}

function hideModalEdit() {
    $modalEdit.classList.remove('modal-edit_show');
    $body.classList.remove('body_hidden');
}















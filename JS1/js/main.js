
const $login = document.querySelector("#login");
const $todo = document.querySelector("#todo");
const $modalDelete = document.querySelector("#modal-delete");
const $modalEdit = document.querySelector("#modal-edit");
const $btnLogin = document.querySelector('.login__submit');
const btnAddTask = document.querySelector('#btn-add-task');
const $body = document.querySelector('#body');
const btnDeleteNo = document.querySelector('#btn-delete-no');

let year = new  Date().getFullYear();
let date = new Date().getDate();
if (date < 10) date = '0' + date;
let month = new Date().getMonth() + 1;
if (month < 10) month = '0' + month;
let hour = new Date().getHours();
let minute = new Date().getMinutes();


$btnLogin.addEventListener('click', getLoginValue);
$btnLogin.addEventListener('click', validation);
btnAddTask.addEventListener('click', addTask);
btnDeleteNo.addEventListener('click', hideModalDelete);


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
    let $task = document.createElement('div');
    $task.className = 'task';
    $task.innerHTML = `            <div class="task__box-left">
            <div class="task__wrap">
                <time class="task__time">${date}.${month}.${year}</time>
                <time class="task__time">${hour}:${minute}</time>
                </div>
                <div class="task__priority">1</div>
                <div class="task__wrap">
                    <button class="task__priority-button"><i class="fas fa-chevron-up"></i></button>
                    <button class="task__priority-button"><i class="fas fa-chevron-down"></i></button>
                </div>
            </div>
            <p class="task__text"></p>
            <div class="task__box-right">
                <button class="task__button task__button_green"><i class="fas fa-pencil-alt"></i></button>
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















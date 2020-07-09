
window.addEventListener('load', function () {


    const $body = document.querySelector('#body');
    const $login = document.querySelector("#login");
    const $todo = document.querySelector("#todo");
    // let $inputTask = document.querySelector('.todo__input-task').value;

    const $btnLogin = document.querySelector('.login__submit');
    const $btnAddTask = document.querySelector('#btn-add-task');
    const $btnTimeUp = document.querySelector('.todo__button-up');
    // const $btnCheck = document.querySelectorAll('.check');
    // let $btnPriorityUp = document.querySelector('.fas fa-chevron-up');

    let taskList = [];
    let timeUp = [];
    const storageKey = 'task';


    $btnLogin.addEventListener('click', getLoginValue);
    $btnLogin.addEventListener('click', validation);
    // $btnAddTask.addEventListener('click', addTask);
    // $btnTimeUp.addEventListener('click', compareNumeric);


    document.addEventListener('click', function (event) {
        let id = event.target.dataset.showDelete;
        if (!id) return;
        let elem = document.getElementById(id);
        elem.hidden = !elem.hidden;
        $body.classList.toggle('body_hidden');
    });
    document.addEventListener('click', function (event) {
        let id = event.target.dataset.showEdit;
        if (!id) return;
        let elem = document.getElementById(id);
        elem.hidden = !elem.hidden;
        $body.classList.toggle('body_hidden');
    });




    function saveInStorage() {
        localStorage.setItem(storageKey, JSON.stringify(taskList));
    }

    function loadFromStorage () {
        const saveData = localStorage.getItem(storageKey);
        if (saveData) {
            const data = JSON.parse(saveData);
            return data;
        }
        return [];
    }



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
        let $inputTask = document.querySelector('.todo__input-task').value;
        let $task = document.createElement('div');
        $task.className = 'task';
        $task.innerHTML = `            <div class="task__box-left">
                <div class="task__wrap">
                    <time class="task__time"></time>
                    <time class="task__time"></time>
                    </div>
                    <div class="task__priority"></div>
                    <div class="task__wrap">
                        <button class="task__priority-button"><i class="fas fa-chevron-up"></i></button>
                        <button class="task__priority-button"><i class="fas fa-chevron-down"></i></button>
                    </div>
                </div>
                <p class="task__text">${$inputTask}</p>
                <div class="task__box-right">
                    <button class="task__button task__button_green" data-show-delete = 'modal-edit'><i class="fas fa-pencil-alt" data-show-delete = 'modal-edit'></i></button>
                    <button class="task__button check"><i class="fas fa-check"></i></button>
                    <button class="task__button" data-show-delete = 'modal-delete'><i class="fas fa-trash-alt" data-show-delete = 'modal-delete'></i></button>
                </div>`;
        $todo.children[0].append($task);
    }






    $btnAddTask.addEventListener('click', addTask);








});




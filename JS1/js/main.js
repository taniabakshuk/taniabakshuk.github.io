
window.addEventListener('load', function () {


    const $body = document.querySelector('#body');
    const $login = document.querySelector("#login");
    const $todo = document.querySelector("#todo");
    let $inputTask = document.querySelector('.todo__input-task');

    const $btnLogin = document.querySelector('.login__submit');
    const $btnAddTask = document.querySelector('#btn-add-task');


    let taskList = [];
    const storageKey = 'task';

    let form = document.forms.login;
    let email = form.elements.email;
    let pass = form.elements.password;

    /*Загрузка тасків зі стореджу*/

    const myLoadedItems = loadFromStorage ();
    if (localStorage.length !== 0) {
        for (let item of myLoadedItems) {
            taskList.push(item);
            let $task = document.createElement('div');
            $task.className = 'task';
            $task.id = taskList.length -1;
            $task.innerHTML = `            <div class="task__box-left">
            <div class="task__wrap">
                <time class="task__time">${item.date}.${item.month}.${item.year}</time>
                <time class="task__time">${item.hour}:${item.minute}</time>
                </div>
                <div class="task__priority">${item.priority}</div>
                <div class="task__wrap">
                    <button class="task__priority-button"><i class="fas fa-chevron-up"></i></button>
                    <button class="task__priority-button"><i class="fas fa-chevron-down"></i></button>
                </div>
            </div>
            <p class="task__text">${item.todo}</p>
            <div class="task__box-right">
                <button class="task__button task__button_green" data-show-delete = 'modal-edit'><i class="fas fa-pencil-alt" data-show-delete = 'modal-edit'></i></button>
                <button class="task__button check"><i class="fas fa-check"></i></button>
                <button class="task__button" data-show-delete = 'modal-delete'><i class="fas fa-trash-alt" data-show-delete = 'modal-delete'></i></button>
            </div>`;
            $todo.children[0].append($task);
            saveInStorage();
        }
    }


    $btnLogin.addEventListener('click', login);
    $btnAddTask.addEventListener('click', addTask);

    /*Показ та скривання модальних вікон*/

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

    /*Валідація форми*/

    pass.onblur = function () {
        let errors = document.querySelectorAll('.login__error');
        if ((pass.value.length < 8 || pass.value.length > 12) && pass.value.length !== 0) {
            pass.classList.add('login__input_validation');
            errors[1].innerText = 'Enter the correct password';
        }
    };
    pass.onfocus = function () {
        let errors = document.querySelectorAll('.login__error');
        if (pass.classList.contains('login__input_validation')) {
            pass.classList.remove('login__input_validation');
            errors[1].innerText = '';
        }
    };
    email.onblur = function () {
        let errors = document.querySelectorAll('.login__error');
        if (!email.value.includes('@') && email.value.length !== 0) {
            email.classList.add('login__input_validation');
            errors[0].innerText = 'Enter the correct email';
        }
    };
    email.onfocus = function () {
        let errors = document.querySelectorAll('.login__error');
        if (email.classList.contains('login__input_validation')) {
            email.classList.remove('login__input_validation');
            errors[0].innerText = '';
        }
    };

    /*Функції*/

    function login(event) {
        event.preventDefault();
        let errors = document.querySelectorAll('.login__text');

        if (email.value === 'testuser@todo.com' && pass.value === '12345678') {
            $login.hidden = !$login.hidden;
            $todo.hidden = !$todo.hidden;
        }
        if (email.value !== 'testuser@todo.com') {
            errors[0].classList.add('login__text_visible');
        }
        if (pass.value !== '12345678') {
            errors[1].classList.add('login__text_visible');
        }
    }

    function addTask() {
        const newTask = {
            year: new Date().getFullYear(),
            date: new Date().getDate(),
            month: new Date().getMonth() + 1,
            hour: new Date().getHours(),
            minute: new Date().getMinutes(),
            milliseconds: new Date().getMilliseconds(),
            todo: $inputTask.value,
            priority: 1,
        };

        taskList.push(newTask);
        $inputTask.value = '';

        let $task = document.createElement('div');
        if (newTask.todo.length === 0) $task = '';
        $task.className = 'task';
        $task.id = taskList.length - 1;
        $task.innerHTML = `            <div class="task__box-left">
                <div class="task__wrap">
                    <time class="task__time">${newTask.date = (newTask.date < 10) ? '0' + newTask.date : newTask.date}.${newTask.month = (newTask.month < 10) ? '0' + newTask.month : newTask.month}.${newTask.year}</time>
                    <time class="task__time">${newTask.hour}:${newTask.minute = (newTask.minute < 10) ? '0' + newTask.minute : newTask.minute}</time>
                    </div>
                    <div class="task__priority">${newTask.priority}</div>
                    <div class="task__wrap">
                        <button class="task__priority-button"><i class="fas fa-chevron-up"></i></button>
                        <button class="task__priority-button"><i class="fas fa-chevron-down"></i></button>
                    </div>
                </div>
                <p class="task__text">${newTask.todo}</p>
                <div class="task__box-right">
                    <button class="task__button task__button_green" data-show-delete = 'modal-edit'><i class="fas fa-pencil-alt" data-show-delete = 'modal-edit'></i></button>
                    <button class="task__button check"><i class="fas fa-check"></i></button>
                    <button class="task__button" data-show-delete = 'modal-delete'><i class="fas fa-trash-alt" data-show-delete = 'modal-delete'></i></button>
                </div>`;
        $todo.children[0].append($task);
        saveInStorage();
    }


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



});












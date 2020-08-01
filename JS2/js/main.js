



    const $body = document.querySelector('#body');
    const $login = document.querySelector("#login");
    const $todo = document.querySelector("#todo");
    let $inputTask = document.querySelector('.todo__input-task');
    let $inputEdit = document.querySelector('.modal-edit__input');
    const $tasksContainer = document.querySelector('#tasksContainer');
    const $todoFilter = document.querySelector('.todo__filter');
    const $modalEdit = document.querySelector('#modal-edit');

    const $btnLogin = document.querySelector('.login__submit');
    const $btnAddTask = document.querySelector('#btn-add-task');
    const $removeTask = document.querySelector('#remove');


    let taskList = [];
    const storageKey = 'task';

    let form = document.forms.login;
    let email = form.elements.email;
    let pass = form.elements.password;



    $btnLogin.addEventListener('click', login);
    $btnAddTask.addEventListener('click', addTask);
    $removeTask.addEventListener('click', function (event) {
        removeTask(event.target);
    });

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


    function init(){
        loadFromStorage();
        render();
    }

    function addTask() {
        if($inputTask.value.trim().length !== 0) {
            const newTask = {
                year: new Date().getFullYear(),
                date: new Date().getDate(),
                month: new Date().getMonth() + 1,
                hour: new Date().getHours(),
                minute: new Date().getMinutes(),
                milliseconds: new Date().getTime(),
                todo: $inputTask.value,
                priority: 1,
                done: false,
                id: taskList.length,
            };

            $inputTask.value = '';
            taskList.push(newTask);

            saveInStorage();
            render();
        }
    }

    function done(itemIndex){
        // если done === false то становится true и наоборот
        taskList[itemIndex].done = !taskList[itemIndex].done;
        saveInStorage();
        render();
    }

    function withZero(num){
        return num < 10 ? '0'+ num: num;
    }

    function genItem(task, index){
        // после каждого рендера таска его индекс будет разный в зависимости от порядка елементов
        let classList = 'task__text ';
        if(task.done) classList += 'task__text_done';
        const template = `<div id="${index}" class="task">
                <div class="task__box-left">
                <div class="task__wrap">
                    <time class="task__time">${withZero(task.date)}.${withZero(task.month)}.${task.year}</time>
                    <time class="task__time">${task.hour}:${withZero(task.minute)}</time>
                    </div>
                    <div class="task__priority">${task.priority}</div>
                    <div class="task__wrap">
                        <button class="task__priority-button"><i class="fas fa-chevron-up"></i></button>
                        <button class="task__priority-button"><i class="fas fa-chevron-down"></i></button>
                    </div>
                </div>
                <p class="${classList}">${task.todo}</p>
<!--                <div class="task__box-right">-->
                    <button class="task__button task__button_green" data-show-delete = 'modal-edit'><i class="fas fa-pencil-alt" data-show-delete = 'modal-edit'></i></button>
                    <button class="task__button check" onclick="done(${index})"><i class="fas fa-check"></i></button>
                    <button class="task__button" data-show-delete = 'modal-delete'><i class="fas fa-trash-alt" data-show-delete = 'modal-delete'></i></button>
<!--                </div>-->
                </div>`;
        let $task = document.createElement('div');
        $task.innerHTML = template;
        // убираем внешний div заменяя на первый елемент который и есть таском
        $task = $task.firstChild;
        return $task;
    }



    function render() {
        $tasksContainer.innerHTML = '';  // очищаем перед перерисовкой
        // для циклов с полным перебором используйте forEach
        for (let i = 0; i < taskList.length; i++) {
            const item = genItem(taskList[i], i);
            $tasksContainer.appendChild(item);
        }
    }


    function saveInStorage() {
        localStorage.setItem(storageKey, JSON.stringify(taskList));
    }

    function loadFromStorage () {
        const itemsFromStorage = localStorage.getItem(storageKey);
        taskList = itemsFromStorage ? JSON.parse(itemsFromStorage) : [];
    }

    window.addEventListener('load', function () {
        init();
    });


    function removeTask(elementThis){
        const taskId = elementThis.parentNode.id; //taskId === index в массиве
        taskList.splice(taskId, 1);
        saveInStorage();
        render();
    }

    $tasksContainer.addEventListener('click', function(event) {
        let id =  event.target.closest('.task').getAttribute('id');


        // изменение приоритета
        changePriority(event.target, id);

        saveInStorage();
        render();
    });

    function changePriority(target,id) {
        if(target.classList.contains('fa-chevron-up')) {
            taskList[id].priority++;
        }
        if(target.classList.contains('fa-chevron-down')) {
            taskList[id].priority--;
        }
        if( taskList[id].priority <= 1) {
            taskList[id].priority = 1;
        }

    }

    $todoFilter.addEventListener('click', function(event) {

        sort(event.target);

        saveInStorage();
        render();
    });


    function sort(target) {

        if (target.classList.contains('todo__button-small-up')) {
                taskList.sort((a, b) => {
                    return b.priority > a.priority ? 1 : -1;
                });
        }
        if (target.classList.contains('todo__button-small-down')) {
            taskList.sort((a, b) => {
                return a.priority > b.priority ? 1 : -1;
            });
        }

        if(target.classList.contains('fa-filter')) {
            taskList.sort((a, b) => {
                return (a.done - b.done);
            });
        }

        if(target.classList.contains('todo__button-up')) {

            taskList.sort((a, b) => {
                return b.milliseconds > a.milliseconds ? 1 : -1;
            });
        }

        if(target.classList.contains('todo__button-down')) {
            taskList.sort((a, b) => {
                return a.milliseconds > b.milliseconds ? 1 : -1;
            });

        }
    }


    $modalEdit.addEventListener('click', function(event) {
        let id = event.target.parentNode.id;
        editText(event.target, id);
        saveInStorage();
        render();
    });

    function editText(target, id) {
        if (target.getAttribute('data-edit') == 'save') {
            if (!$inputEdit.value) return;
            taskList[id].todo = $inputEdit.value;
            $modalEdit.style.visibility = 'hidden';
            $modalEdit.removeAttribute('data-edit');
        }
    }





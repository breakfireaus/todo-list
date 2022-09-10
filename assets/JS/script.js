window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    var nameInput = document.querySelector('#name');
    var newTodoForm = document.querySelector('#new-todo-form');
    var username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e=> {
        localStorage.setItem('username', e.target.value);
    })

    newTodoForm.addEventListener('submit', e=>{
        e.preventDefault();

        var todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        }
todos.push(todo)

localStorage.setItem('todos', JSON.stringify(todos));

e.target.reset();
Displaytodos();
    })
    Displaytodos
})

function Displaytodos () {
    var todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        var todoItem = document.createElement('div')
        todoItem.classList.add('todo-item')

        var label = document.createElement('label')
        var input = document.createElement('input')
        var span = document.createElement('span')
        var content = document.createElement('div')
        var actions = document.createElement('div')
        var edit = document.createElement('button')
        var deleteButton = document.createElement('button')

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble')
        if (todo.category == 'personal'); {
            span.classList.add('personal');
            } else  {
                span.classList.add('business')
            }

            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteButton.classList.add('delete');

            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            edit.innerHTML = 'Edit';
            deleteButton.innerHTML = 'Delete';

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem)

            if (todo.done) {
                todoItem.classList.add('done')
            }
            input.addEventListener('click', e => {
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));

                if (todo.done) {
                    todoItem.classList.add('done');
                } else {
                    todoItem.classList.remove('done');
                }

                Displaytodos();
            })

            edit.addEventListener('click', e => {
                var input = content.querySelector('input');
                input.removeAttribute('readonly');
                input.focus();
                input.addEventListener('blur', e =>{
                    input.setAttribute('readonly', true);
                    todo.content = e.target.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                    Displaytodos();    
                })
            })

            deleteButton.addEventListener('click', (e) => {
                todos = todos.filter(t => t != todo);
                localStorage.setItem('todos', JSON.stringify(todos));
                Displaytodos();
            })
    })
}


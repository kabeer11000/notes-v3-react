async function getTodos(user_id = '123456') {
    let key = undefined, todos = [];
    for (let i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.substring(0, 5) === 'todo-') {
            todos.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
    return todos;
}

function getTodos_non_async(user_id = '123456') {
    let key = undefined, todos = [];
    for (let i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.substring(0, 5) === 'todo-') {
            todos.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
    return todos;
}

async function getTodosByLabel(l) {
    let notes = [], todos = getTodos_non_async();
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].label === l) {
            notes.push(todos[i]);
        }
    }
    return notes;
}

export default getTodos;
export {getTodos_non_async, getTodosByLabel};

async function getTodos(user_id='123456'){
    let key = undefined, todos = [];
    for (let i = localStorage.length - 1; i >= 0; i--) {
        key = localStorage.key(i);
        if (key.substring(0, 5) === 'todo-') {
            todos.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
        }
    }
    return todos;
}
export default getTodos;


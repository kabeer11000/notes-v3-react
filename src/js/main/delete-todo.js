function deleteTodo (dateTime) {
    localStorage.removeItem('todo-' + dateTime);
}
export default deleteTodo;

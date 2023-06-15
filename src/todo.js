const { nanoid } = require('nanoid');

let todos = [];

// { id: 'dflgadfljg', task: 'Buy milk', done: false }

function add(task) {
    todos.push({id: nanoid(8), task, done: false })
}

function list() {
    return todos
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id)
}

function update(id, done) {
    todos = todos.map(todo => (todo.id === id ? { id, task: todo.task, done } : todo))
}


module.exports = {
    add,
    list,
    deleteTodo,
    update
}

const { nanoid } = require('nanoid')

let todos = []

function add(task) {
  const id = nanoid(8)
  todos.push({ id, task, done: false })
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

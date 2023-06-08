const todoList = document.getElementById('todo-list')
const button = document.getElementById('add-todo')
const input = document.getElementById('new-todo')

button.addEventListener('click', async () => {
  const response = await fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task: input.value })
  })
  await fetchTodoList()
})

async function toggleDone(div, todo) {
  todo.done = !todo.done
  div.style.textDecoration = todo.done ? 'line-through' : 'none'

  const response = await fetch(`http://localhost:3000/api/${todo.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: todo.done })
  })

  console.log(await response.text())
}

async function deleteTodo(id) {
  await fetch(`http://localhost:3000/api/${id}`, {
    method: 'DELETE'
  })
  await fetchTodoList()
}

async function fetchTodoList() {
  todoList.innerHTML = ''

  const response = await fetch('http://localhost:3000/api', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })

  const todos = await response.json()

  for (const todo of todos) {
    const todoDiv = document.createElement('div')
    todoDiv.style.cursor = 'pointer'

    todoDiv.addEventListener('click', () => toggleDone(todoDiv, todo))

    if (todo.done) {
      todoDiv.style.textDecoration = 'line-through'
    }

    const task = document.createTextNode(todo.task)

    const deleteButton = document.createElement('button')
    deleteButton.style.marginRight = '10px'
    deleteButton.style.backgroundColor = 'red'
    deleteButton.innerText = 'X'
    deleteButton.addEventListener('click', () => deleteTodo(todo.id))
    todoDiv.appendChild(deleteButton)

    todoDiv.appendChild(task)
    todoList.appendChild(todoDiv)
  }
}

fetchTodoList().then(() => {})

async function list() {
  const response = await fetch('http://localhost:3000/api', {
    method: 'GET'
  })

  return await response.json()
}

async function add(task) {
  await fetch('http://localhost:3000/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ task })
  })
  await paint(await list())
}

async function toggle(todo) {
  await fetch(`http://localhost:3000/api/${todo.id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ done: !todo.done })
  })
  await paint(await list())
}

async function deleteTodo(id) {
  await fetch(`http://localhost:3000/api/${id}`, {
    method: 'DELETE'
  })
  await paint(await list())
}

function paintTodos(todos) {
  const todosDiv = document.createElement('div')

  for (const todo of todos) {
    const todoDiv = document.createElement('div')
    todoDiv.style.cursor = 'pointer'
    todoDiv.style.margin = '0.3em'

    todoDiv.addEventListener('click', () => toggle(todo))

    const deleteButton = document.createElement('button')
    deleteButton.style.marginRight = '10px'
    deleteButton.style.backgroundColor = 'red'
    deleteButton.style.color = 'white'
    deleteButton.style.border = '0'

    deleteButton.style.borderRadius = '13px'
    deleteButton.innerText = 'X'
    deleteButton.addEventListener('click', () => deleteTodo(todo.id))
    todoDiv.appendChild(deleteButton)

    const task = document.createTextNode(todo.task)
    if (todo.done) {
      todoDiv.style.textDecoration = 'line-through'
    }
    todoDiv.appendChild(task)

    todosDiv.appendChild(todoDiv)
  }

  return todosDiv
}

function paintApp(todos) {
  const content = document.createElement('div')
  content.appendChild(paintTodos(todos))

  const newTodo = document.createElement('input')
  newTodo.addEventListener('input', () => {
    addTodoButton.disabled = newTodo.value === ''
  })

  newTodo.type = 'text'
  content.appendChild(newTodo)

  const addTodoButton = document.createElement('button')
  addTodoButton.style.margin = '0.5em'
  addTodoButton.innerText = 'Add'
  addTodoButton.disabled = true

  addTodoButton.addEventListener('click', () => add(newTodo.value))
  content.appendChild(addTodoButton)

  return content
}

function paint(todos) {
  document.body.innerHTML = ''
  document.body.appendChild(paintApp(todos))
}

async function main() {
  paint(await list())
}

main().then(() => {})

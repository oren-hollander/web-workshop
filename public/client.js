console.log('Hello World!');

async function list() {
    const response = await fetch('http://localhost:3000/api', {method: 'GET'})
    return await response.json()
}

async function add(task) {
    await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({task})
    })
    paint(await list())
}

async function deleteTodo(id) {
    await fetch(`http://localhost:3000/api/${id}`, {method: 'DELETE'})
    paint(await list())
}

async function update(id, done) {
    await fetch(`http://localhost:3000/api/${id}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({done})
    })
    paint(await list())
}

function paintTodoList(todos) {
    const listDiv = document.createElement('div')

    for (const todo of todos) {
        const todoDiv = document.createElement('div')

        const taskSpan = document.createElement('span')
        taskSpan.style.cursor = 'pointer'
        taskSpan.innerText = todo.task
        taskSpan.style.textDecoration = todo.done ? 'line-through' : 'none'
        taskSpan.addEventListener('click', async () => await update(todo.id, !todo.done))

        const deleteButton = document.createElement('button')
        deleteButton.innerText = 'X'
        deleteButton.addEventListener('click', async () => await deleteTodo (todo.id))

        todoDiv.appendChild(deleteButton)
        todoDiv.appendChild(taskSpan)

        listDiv.appendChild(todoDiv)
    }

    return listDiv
}

function paint(todos) {
    document.body.innerHTML = ''

    document.body.appendChild(paintTodoList(todos))

    const input = document.createElement('input')
    input.type = 'text'

    input.addEventListener('input', () => {button.disabled = input.value === ''})

    const label = document.createElement('label')
    label.innerText = 'Task: '
    label.appendChild(input)

    document.body.appendChild(label)


    const button = document.createElement('button')
    button.disabled = true
    button.innerText = 'Add'

    button.addEventListener('click', async () => {
        await add(input.value)
    })

    document.body.appendChild(button)

}

async function main() {
    paint(await list())
}

main().catch(error => console.error(error.message))

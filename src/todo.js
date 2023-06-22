const { MongoClient, ObjectId } = require('mongodb');

// { _id: <ObjectID>, task: 'Buy milk', done: false }

function getCollection() {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);
    return client.db('todos-db').collection('todos')
}

async function add(task) {
    await getCollection().insertOne({ task, done: false })
}

async function list() {
    const todos = await getCollection().find().toArray()

    return todos.map(todo => ({ id: todo._id.toHexString(), task: todo.task, done: todo.done }))
}

async function deleteTodo(id) {
    const _id = ObjectId.createFromHexString(id)
    await getCollection().deleteOne({_id})
}

async function update(id, done) {
    const _id = ObjectId.createFromHexString(id)
    await getCollection().updateOne({_id}, {$set: {done}})
}


module.exports = {
    add,
    list,
    deleteTodo,
    update
}

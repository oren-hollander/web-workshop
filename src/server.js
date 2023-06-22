const express = require('express');
const path = require('path');

const { list, add, deleteTodo, update }  = require('./todo');

const port = 3000

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api', async (req, res) => {
    const todos = await list();
    res.status(200).json(todos);
});

app.post('/api', async (req, res) => {
    await add(req.body.task);
    res.status(200).send('OK');
});

app.delete('/api/:id', async (req, res) => {
    await deleteTodo(req.params.id);
    res.status(200).send('OK');
})

app.post('/api/:id', async (req, res) => {
    await update(req.params.id, req.body.done);
    res.status(200).send('OK');
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

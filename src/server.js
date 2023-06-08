const express = require('express')
const path = require('path')

const app = express()
const router = express.Router()

const { add, list, deleteTodo, update } = require('./todos')

router.post('/', function (req, res) {
  add(req.body.task)
  res.status(200).send('OK')
})

router.get('/', function (req, res) {
  res.status(200).json(list())
})

router.post('/:id', function (req, res) {
  update(req.params.id, req.body.done)
  res.status(200).send('OK')
})

router.delete('/:id', function (req, res) {
  deleteTodo(req.params.id)
  res.status(200).send('OK')
})

app.use(express.static(path.join(__dirname, '..', 'public')))
app.use(express.json())
app.use('/api', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

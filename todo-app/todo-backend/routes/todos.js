const express = require('express');
const { Todo } = require('../mongo')
const router = express.Router();
const { getAsync, setAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  //Increment the todo counter
  const currentCounterValue = await getAsync('todo_counter');
  const parsedCounterValue = parseInt(currentCounterValue);
  if (isNaN(parsedCounterValue)) {
    await setAsync('todo_counter', 1);
  } else { 
    await setAsync('todo_counter', parsedCounterValue + 1);
  }
  
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  const body = req.body
  let todo = {}

  if (body.done !== undefined) {
    todo.done = body.done
  }

  if (body.text){
    todo.text = body.text
  }

  try {
    const updatedTodo = await req.todo.set(todo).save();
    res.send(updatedTodo);
  } catch (error) {
    res.status(500).send({ error: 'Error updating todo.' });
  }
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;

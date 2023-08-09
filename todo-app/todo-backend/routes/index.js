const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const { getAsync } = require('../redis')

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET statistics. */
router.get('/statistics', async (req, res) => {
  try {
    const addedTodos = await getAsync('todo_counter');
    console.log(addedTodos)
    const statistics = {
      added_todos: parseInt(addedTodos) || 0
    };

    res.json(statistics);
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;

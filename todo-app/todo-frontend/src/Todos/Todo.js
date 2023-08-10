import React from "react"

const Todo = ({ todo }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
    <span>{todo.text}</span>
    <span>{todo.done ? "This todo is done" : "This todo is not done"}</span>
    <span>
      <button> Delete </button>
      {!todo.done && <button> Set as done </button>}
    </span>
  </div>
)

export default Todo
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
    const todo = {
        text: 'New todo',
        done: false
    }

    render(<Todo key={todo.id} todo={todo} />)

    const todoText = screen.getByText('New todo')
    const deleteButton = screen.getByText('Delete')
    const setAsDoneButton = screen.getByText('Set as done')
    
    expect(todoText).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()

    if (!todo.done) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(setAsDoneButton).toBeInTheDocument()
    }
})
// src/components/TodoList.js

// import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodo, setEditingTodo, selectTodos } from '../features/todoSlice';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Details</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((todo) => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.details}</td>
            <td>{todo.status}</td>
            <td>
              <button onClick={() => dispatch(setEditingTodo(todo))}>Edit</button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TodoList;

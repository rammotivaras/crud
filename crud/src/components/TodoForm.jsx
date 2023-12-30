// src/components/TodoForm.js

import  { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, updateTodo, selectEditingTodo, setEditingTodo } from '../features/todoSlice';

const TodoForm = () => {
  const dispatch = useDispatch();
  const editingTodo = useSelector(selectEditingTodo);
  const [todo, setTodo] = useState({
    id: '',
    details: '',
    status: 'pending',
  });

  useEffect(() => {
    if (editingTodo) {
      setTodo({
        id: editingTodo.id,
        details: editingTodo.details,
        status: editingTodo.status,
      });
    } else {
      setTodo({
        id: '',
        details: '',
        status: 'pending',
      });
    }
  }, [editingTodo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTodo) {
      await dispatch(updateTodo(todo.id, todo));
    } else {
      await dispatch(addTodo(todo));
    }
    setTodo({
      id: '',
      details: '',
      status: 'pending',
    });
    dispatch(setEditingTodo(null));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Details:
        <input
          type="text"
          value={todo.details}
          onChange={(e) => setTodo({ ...todo, details: e.target.value })}
        />
      </label>
      <label>
        Status:
        <select
          value={todo.status}
          onChange={(e) => setTodo({ ...todo, status: e.target.value })}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button type="submit">{editingTodo ? 'Update' : 'Add'}</button>
      {editingTodo && (
        <button type="button" onClick={() => dispatch(setEditingTodo(null))}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default TodoForm;

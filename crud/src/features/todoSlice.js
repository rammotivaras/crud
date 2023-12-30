// src/features/todoSlice.jsx

import { createSlice } from '@reduxjs/toolkit';

export const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    editingTodo: null,
  },
  reducers: {
    setTodos: (state, action) => {
      state.data = action.payload;
      console.log(setTodos,'setTodos');
    },
    setEditingTodo: (state, action) => {
      state.editingTodo = action.payload;
    },
    addTodo: (state, action) => {
      state.data.push(action.payload);
    },
    // Other reducers...
  },
});

export const { setTodos, setEditingTodo, addTodo } = todoSlice.actions;

export const selectTodos = (state) => state.todos.data;
export const selectEditingTodo = (state) => state.todos.editingTodo;

export default todoSlice.reducer;

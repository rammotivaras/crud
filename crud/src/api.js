// src/api.js

import axios from 'axios';

const baseURL = 'http://localhost:3001/todos'; // Adjust this URL based on your json-server setup

const api = axios.create({
  baseURL,
});

export const getAllTodos = async () => {
  const response = await api.get('/');
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await api.post('/', todo);
  return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
  const response = await api.put(`/${id}`, updatedTodo);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/${id}`);
  return response.data;
};

import axios from 'axios';
import store from '../redux/store';

const BASE_URL = 'http://localhost:5000/api/tasks';

const authHeaders = () => {
  const state = store.getState()
  const token = state.auth.token
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export const getTodos = async () => {
  try {
    const res = await axios.get(BASE_URL, { headers: authHeaders() });
    return res.data;
  } catch (err) {
    console.log('Error fetching todos:', err);
    throw err;
  }
};

export const createTodo = async (todo) => {
  try {
    const res = await axios.post(BASE_URL, todo, { headers: authHeaders() });
    return res.data;
  } catch (err) {
    console.log('Error creating todo:', err);
    throw err;
  }
};

export const updateTodo = async (id, updates) => {
  try {
    const res = await axios.put(`${BASE_URL}/${id}`, updates, { headers: authHeaders() });
    return res.data;
  } catch (err) {
    console.log('Error updating todo:', err);
    throw err;
  }
};

export const deleteTodo = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/${id}`, { headers: authHeaders() });
    return res.data;
  } catch (err) {
    console.log('Error deleting todo:', err);
    throw err;
  }
};
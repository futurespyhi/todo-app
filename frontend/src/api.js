import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// user registration
export const register = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Registration API error:', error);
      if (error.response) {
        console.log('Error response data:', error.response.data);
        console.log('Error response status:', error.response.status);
      }
      throw error; // Re-throw the error for the caller to handle
    }
  };

// user login
export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

// get all tasks
export const getTasks = async (token) => {
  const response = await axios.get(`${API_URL}/tasks`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};

// create a task
export const createTask = async (title, description, token) => {
  const response = await axios.post(
    `${API_URL}/tasks`,
    { title, description },
    { headers: { 'x-auth-token': token } }
  );
  return response.data;
};

// update a task
export const updateTask = async (id, title, description, completed, token) => {
  const response = await axios.put(
    `${API_URL}/tasks/${id}`,
    { title, description, completed },
    { headers: { 'x-auth-token': token } }
  );
  return response.data;
};

// delete a task
export const deleteTask = async (id, token) => {
  const response = await axios.delete(`${API_URL}/tasks/${id}`, {
    headers: { 'x-auth-token': token },
  });
  return response.data;
};
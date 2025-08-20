// src/api/mongoAuth.js
import axios from 'axios';
import { API_MONGO } from '../config/api';

export async function mongoLogin(email, password) {
  const { data } = await axios.post(`${API_MONGO}/login`, { email, password });
  return data; // { token, user }
}

export async function mongoRegister(payload) {
  const { data } = await axios.post(`${API_MONGO}/register`, payload);
  return data;
}
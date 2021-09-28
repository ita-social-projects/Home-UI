import axios from 'axios';

const encodedCredentials = window.btoa('admin@example.com:password');
const auth = `Basic ${encodedCredentials}`;

export const HTTP = axios.create({
  // baseURL: 'https://home-project-academy.herokuapp.com/api/0',
  baseURL: 'http://localhost:3000',
  headers: {
    Authorization: auth,
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'production',
});

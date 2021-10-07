import axios from 'axios';

const encodedCredentials = window.btoa('admin@example.com:passworD123');
const auth = `Basic ${encodedCredentials}`;

export const HTTP = axios.create({
  baseURL: 'https://home-project-academy.herokuapp.com/api/0',
  headers: {
    Authorization: auth,
    'Content-Type': 'application/json',
  },
  withCredentials: process.env.NODE_ENV === 'production',
});

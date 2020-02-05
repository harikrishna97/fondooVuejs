import axios from 'axios';
require('dotenv/config')
export const HTTP = axios.create({
  baseURL: "http://localhost:4000/",
  headers: {
    // Authorization: 'Bearer {token}'
    token:localStorage.getItem('token')
  },
 
})

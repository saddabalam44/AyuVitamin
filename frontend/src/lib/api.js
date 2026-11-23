import axios from 'axios'

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL || 'https://ayuvitamin.onrender.com/api').replace(/\/$/, ''),
})

export default api

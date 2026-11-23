import axios from 'axios'

const configuredApiUrl = import.meta.env.VITE_API_URL ||
  'https://ayuvitamin.onrender.com/api'

const normalizedApiUrl = configuredApiUrl.replace(/\/$/, '')
const apiBaseUrl = normalizedApiUrl.endsWith('/api')
  ? normalizedApiUrl
  : `${normalizedApiUrl}/api`

const api = axios.create({
  baseURL: apiBaseUrl,
})

export default api

import axios from 'axios'

const api = axios.create({
    baseURL: 'https://fishing-store-production-12bd.up.railway.app/api'
})

export default api

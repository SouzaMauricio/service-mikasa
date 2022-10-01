import axios from 'axios'
// import { store } from '@/store/store'

const arminAxios = axios.create({
  baseURL: 'http://localhost:3003',
  timeout: 30000
})

export {
  arminAxios
}

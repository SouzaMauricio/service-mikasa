import axios from 'axios'
// import { store } from '@/store/store'

const arminAxios = axios.create({
  baseURL: 'https://api.corretoraandreia.com.br',
  timeout: 30000
})

export {
  arminAxios
}

import axios from 'axios'
// import { store } from '@/store/store'

const arminAxios = axios.create({
  baseURL: 'https://andreia.totustech.com.br',
  timeout: 30000
})

export {
  arminAxios
}

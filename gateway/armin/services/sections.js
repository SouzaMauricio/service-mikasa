import { arminAxios } from '../ArminAxiosClient'

const resource = 'sections'

const find = async (params = '') => {
  const response = await arminAxios.get(`${resource}?${params}`)
  return response.data
}

export {
  find
}

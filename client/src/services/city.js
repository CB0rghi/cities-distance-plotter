import axios from 'axios'
const baseURL = 'http://localhost:3010/'

export const getNearestCities = async (state = 'SP', city, count) => {
  const route = `${baseURL}nearest-cities/${city}/${count}`
  const response = await axios.get(route)
  const { data } = response
  return data
}
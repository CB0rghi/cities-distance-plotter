import axios from 'axios'
const baseURL = 'http://localhost:3010/'

export const getNearestCities = async (state = 'SP', city, count) => {
  const route = `${baseURL}nearest-cities/${state}/${city}/${count}`
  const response = await axios.get(route)
  const { data } = response
  return data
}

export const getCities = async (state = 'SP') => {
  const route = `${baseURL}cities/${state}`
  const response = await axios.get(route)
  const { data } = response
  return data
}
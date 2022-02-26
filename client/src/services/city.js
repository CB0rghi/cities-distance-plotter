import axios from 'axios'
const baseURL = 'http://localhost:3010/'

export const getNearestCities = async (state = 'SP', city, count) => {
  const route = `${baseURL}nearest-cities/${state}/${city}/${count}`
  const response = await axios.get(route)
  const { data } = response
  return data
}

export const getShortestRoute = async (state = 'SP', source, destiny) => {
  const route = `${baseURL}cities/shortest/${state}/${source}/${destiny}`
  const response = await axios.get(route)
  return response.data
}

export const getCities = async (state = 'SP') => {
  const route = `${baseURL}cities/${state}`
  const response = await axios.get(route)
  const { data } = response
  return data
}
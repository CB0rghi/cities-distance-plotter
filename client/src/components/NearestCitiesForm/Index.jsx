/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import useCityStore from '../../stores/cityStore'
import { getNearestCities } from '../../services/city.js'
import CitiesSelect from '../CitiesSelect/CitiesSelect.jsx'

const node = ({ distance, next }) => ({ distance, next })

const routes = []
const findCityDistances = (distancesArray, city) => {
  return distancesArray.filter(distance => distance.cityA === city || distance.cityB === city)
}
const calculateRoutes = (distancesArray, from, to) => {
  const fromDistances = findCityDistances(from)
    
}

const from = 'Rio Claro'
const to = 'Sao Paulo'

const Main = () => {
  const [ nearestCount, setNearestCount ] = useState(10)
  const { setDistances, setLoading, selectedCity } = useCityStore(state => ({
    setDistances: state.setDistances,
    setLoading: state.setLoading,

    selectedCity: state.selectedCity
  }))

  const loadNearedCities = async () => {
      if(!selectedCity) return
      setLoading(true)
      const response = await getNearestCities('SP', selectedCity, nearestCount)
      setDistances(response)
      setLoading(false)
  }

  useEffect(() => {
    loadNearedCities()
  }, [selectedCity, nearestCount])

  const handleSubmit = async (e) => {
    e.preventDefault()
    loadNearedCities()
  }

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit} className="bg-teal-400 shadow-md rounded p-4">
        <div className='mb-4'>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            Escolha uma cidade 
          </label>
          <CitiesSelect />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nearestCount">
            Cidades mais próximas 
          </label>
          <input
          className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          id="nearestCount"
          type="number"
          value={nearestCount}
          onChange={(e) => setNearestCount(parseInt(e.target.value))}
          />
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"' type='submit'>Search!</button>
      </form>
    </div>
  )
}

export default Main
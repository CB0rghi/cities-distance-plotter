import React, { useState } from 'react'
import useCityStore from '../../stores/cityStore'
import { getNearestCities } from '../../services/city.js'

const Main = () => {
  const [nearestCount, setNearestCount] = useState(10)
  const { selectedCity, selectCity } = useCityStore(state => ({selectCity: state.selectCity, selectedCity: state.selectedCity}))
  const setDistances = useCityStore(state => state.setDistances)

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('City', selectedCity)
    const response = await getNearestCities('SP', selectedCity, nearestCount)
    console.log('Response', response)
    setDistances(response)
  }

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit} className="bg-teal-400 shadow-md rounded p-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            Cidade 
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="Selecione a cidade!"
            value={selectedCity}
            onChange={(e) => selectCity(e.target.value)}/>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nearestCount">
            Número de cidades mais próximas 
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
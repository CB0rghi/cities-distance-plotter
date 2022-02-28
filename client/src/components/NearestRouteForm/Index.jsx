/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import useCityStore from '../../stores/cityStore'
import { getShortestRoute } from '../../services/city.js'
import CitiesSelect from '../CitiesSelect/CitiesSelect.jsx'

const NearestRouteForm = () => {
  const { setShortestRoute, setLoading, setDistances, setTotalDistance, sourceCity, destinyCity} = useCityStore(state => ({
    setShortestRoute: state.setShortestRoute,
    setLoading: state.setLoading,
    setDistances: state.setDistances,
    setTotalDistance: state.setTotalDistance,

    sourceCity: state.sourceCity,
    destinyCity: state.destinyCity
  }))

  const loadShortestRoute = async () => {
      if(!sourceCity || !destinyCity) return
      setLoading(true)
      const response = await getShortestRoute('SP', sourceCity, destinyCity)
      setShortestRoute(response.path)
      // console.log(response)
      setDistances(response.previousDistances)
      setTotalDistance(response.distance)
      setLoading(false)
  }

  useEffect(() => {
    loadShortestRoute()
  }, [sourceCity, destinyCity])

  const handleSubmit = async (e) => {
    e.preventDefault()
    loadShortestRoute()
  }

  return (
    <div className="w-full max-w-xs" style={{ position: 'absolute', zIndex: 1000 }}>
      <form onSubmit={handleSubmit} className="bg-teal-400 shadow-md rounded p-4">
        <div className='mb-4'>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            Source
          </label>
          <CitiesSelect isSource />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            Destiny
          </label>
          <CitiesSelect isDestiny />
        </div>
        
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"' type='submit'>Search!</button>
      </form>
    </div>
  )
}

export default NearestRouteForm
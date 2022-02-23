import { getCities } from "../../services/city"
import React, { useState, useEffect } from "react"
import useCityStore from "../../stores/cityStore"
import Select from 'react-select'

const CitySelect = () => {
  const [ cities, setCities ] = useState([])
  const [ options, setOptions ] = useState([])
  const { selectCity } = useCityStore(state => ({ selectCity: state.selectCity, selectedCity: state.selectedCity}))

  useEffect(() => {
    const fetchCities = async () => {
      const cityList = await getCities()
      setCities(cityList)
    }

    fetchCities()
  }, [])

  useEffect(() => {
    const options = cities.map((city) => ({ label: city.nm_municipio, value: city.nm_municipio }))
    setOptions(options)
  }, [cities])

  const handleChange = (e) => {
    console.log('Changed', e.value)
    selectCity(e.value)
  }

  return (
    <div className="inline-block relative w-64">
      <Select options={options} placeholder="Escolha uma cidade" onChange={handleChange}/>
    </div>
  )
}

export default CitySelect
import { getCities } from "../../services/city"
import React, { useState, useEffect } from "react"
import useCityStore from "../../stores/cityStore"
import Select from 'react-select'

const CitySelect = (props) => {
  const { isSource, isDestiny } = props
  const [ cities, setCities ] = useState([])
  const [ options, setOptions ] = useState([])
  const { setSource, setDestiny, selectCity } = useCityStore(state => ({
    selectCity: state.selectCity,

    setSource: state.setSource,

    setDestiny: state.setDestiny
  }))

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
    // console.log('Changed', e.value)
    if(isSource) {
      setSource(e.value)
    } else if (isDestiny) {
      setDestiny(e.value)
    }
    else {
      selectCity(e.value)
    }
  }

  return (
    <div className="inline-block relative w-full">
      <Select options={options} placeholder="Escolha uma cidade" onChange={handleChange}/>
    </div>
  )
}

export default CitySelect
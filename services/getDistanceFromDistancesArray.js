const getDistance = ({ distances, nameCityA, nameCityB }) => {
	const distanceObj = distances.find((obj) => {
		const { cityA, cityB } = obj
		const { nm_municipio: municipioA } = cityA
		const { nm_municipio: municipioB } = cityB
		if(
			(municipioA === nameCityA && municipioB === nameCityB)
      ||
      (municipioB === nameCityA && municipioA === nameCityB)
		)
		{
			return true
		}
		return false
	})
	return distanceObj.distance
}

export default getDistance
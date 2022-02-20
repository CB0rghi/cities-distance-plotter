const getDistance = ({ distances, nameCityA, nameCityB }) => {
	const distanceObj = distances.find((obj) => {
		const { cityA, cityB } = obj
		if(
			(cityA === nameCityA && cityB === nameCityB)
      ||
      (cityB === nameCityA && cityA === nameCityB)
		)
		{
			return true
		}
		return false
	})
	return distanceObj.distance
}

export default getDistance
const filterDistancesByCity = (distances, name) => {
	return distances.filter((distance) => {
		const { cityA, cityB } = distance
		if(cityA === name || cityB === name)
			return true

		return false
	})
}

export default filterDistancesByCity
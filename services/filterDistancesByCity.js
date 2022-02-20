const filterDistancesByCity = (distances, name) => {
	return distances.filter((distance) => {
		const { cityA, cityB } = distance
		if(cityA.nm_municipio === name || cityB.nm_municipio === name)
			return true

		return false
	})
}

export default filterDistancesByCity
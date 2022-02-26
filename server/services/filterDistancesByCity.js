const filterDistancesByCity = (distances, name) => {
	return distances.filter(distance => {
		const { cityA, cityB } = distance

		let foundCity = cityA === name || cityB === name
		let citiesAreDifferent = cityA !== cityB

		return foundCity && citiesAreDifferent
	})
}

export default filterDistancesByCity

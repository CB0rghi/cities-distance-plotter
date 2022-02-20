import filterDistancesByCity from './filterDistancesByCity.js'

const filterNearestCities = ({ distancesArray, cityName, nearestCount }) => {
	const distances = filterDistancesByCity(distancesArray, cityName)
	const array = distances
		.sort((a, b) => a.distance - b.distance)
		.splice(0, nearestCount)

	return array 
}

export default filterNearestCities
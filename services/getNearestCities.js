import filterNearestCities from './filterNearestCitiesFromDistancesArray.js'
import getDistancesArray from './getDistancesArray.js'

const getNearestCities = async (state, city, count) => {
	const distancesArray = await getDistancesArray(state)
	const closestCities = filterNearestCities({ distancesArray, cityName: city, nearestCount: count })
	return closestCities
}

export default getNearestCities
import { calculateDistancen2 } from './calculateDistance.js'
import saveDistancesToDisk from './saveDistancesToDisk.js'
import getCitiesArray from './getCities.js'

const closestCitiesCount = 10

const filterRoutesByClosesCities = async (cities, distances) => {
	let newDistances = []
	cities.forEach(city => {
		let cityDistances = distances.filter(route => route.cityA === city.nm_municipio)
		// order distances
		let orderedDistances = cityDistances.sort((a, b) => a.distance - b.distance)

		// splice
		let closestCitiesRoutes = orderedDistances.splice(0, closestCitiesCount)
		newDistances = [ ...newDistances, ...closestCitiesRoutes ]
	})
	return newDistances
}

const buildDistancesArray = async (state) => {
	console.time('Get cities array')
	let stateCities = await getCitiesArray(state)
	console.timeEnd('Get cities array')
	const size = stateCities.length
	console.time(`Calculate Distances n² (${size} cities)`)
	// TODO: Migrate from n² to middle method (but needs to build the same array)
	const distancesArray = calculateDistancen2(stateCities)
	console.timeEnd(`Calculate Distances n² (${size} cities)`)


	console.time('Save distances to disk')
	saveDistancesToDisk(distancesArray, state)
	console.timeEnd('Save distances to disk')

	console.time('Filter by closest cities')
	const closestRoutesArray = await filterRoutesByClosesCities(stateCities, distancesArray)	
	console.timeEnd('Filter by closest cities')

	return closestRoutesArray 
}
export default buildDistancesArray
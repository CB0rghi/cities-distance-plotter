import { calculateDistancen2, calculateDistancesArray } from './calculateDistance.js'
import saveDistancesToDisk from './saveDistancesToDisk.js'
import getCitiesArray from './getCities.js'

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
	return distancesArray
}
export default buildDistancesArray
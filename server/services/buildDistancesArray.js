import { calculateDistancen2, calculateDistancesArray } from './calculateDistance.js'
import saveDistancesToDisk from './saveDistancesToDisk.js'
import getCitiesArray from './getCities.js'

const buildDistancesArray = async (state) => {
	const size = 200
	console.time('Get cities array')
	let stateCities = await getCitiesArray(state)
	console.timeEnd('Get cities array')
	stateCities = stateCities.splice(0, size)
	console.time(`Calculate Distances n² (${size} cities)`)
	const distancesArray = calculateDistancen2(stateCities)
	console.timeEnd(`Calculate Distances n² (${size} cities)`)
	console.time('Save distances to disk')
	saveDistancesToDisk(distancesArray, state)
	console.timeEnd('Save distances to disk')
	return distancesArray
}
export default buildDistancesArray
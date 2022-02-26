import { calculateDistancen2, calculateDistancesArray } from './calculateDistance.js'
import saveDistancesToDisk from './saveDistancesToDisk.js'
import getCitiesArray from './getCities.js'

const buildDistancesArray = async (state) => {
	const stateCities = await getCitiesArray(state)
	const maxCities = 400 
	const distancesArray = calculateDistancen2(stateCities.splice(0, maxCities))
	saveDistancesToDisk(distancesArray, state)
	return distancesArray
}
export default buildDistancesArray
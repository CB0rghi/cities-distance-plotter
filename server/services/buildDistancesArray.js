import { calculateDistancen2, calculateDistancesArray } from './calculateDistance.js'
import saveDistancesToDisk from './saveDistancesToDisk.js'
import getCitiesArray from './getCities.js'

const buildDistancesArray = async (state) => {
	const stateCities = await getCitiesArray(state)
	const cities = stateCities.splice(0, 20)
	const distancesArray = calculateDistancen2(cities)
	saveDistancesToDisk(distancesArray, state)
	return distancesArray
}
export default buildDistancesArray
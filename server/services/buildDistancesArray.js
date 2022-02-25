import { calculateDistancesArray } from './calculateDistance.js'
import saveDistancesToDisk from './saveDistancesToDisk.js'
import getCitiesArray from './getCities.js'

const buildDistancesArray = async (state) => {
	const stateCities = await getCitiesArray(state)
	const distancesArray = calculateDistancesArray(stateCities.splice(0, 100))
	saveDistancesToDisk(distancesArray, state)
	return distancesArray
}
export default buildDistancesArray
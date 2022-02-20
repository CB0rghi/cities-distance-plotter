import { calculateDistancesArray } from './calculateDistance.js'
import readFileContent from './readCsvFileContent.js'
import filterCitiesByUF from './filterCitiesByUF.js'
import saveDistancesToDisk from './saveDistancesToDisk.js'

const buildDistancesArray = async (state) => {
	const brazilCities = await readFileContent('brazil_cities.csv')
	const spCities = filterCitiesByUF(brazilCities, state)
	const distancesArray = calculateDistancesArray(spCities)
	saveDistancesToDisk(distancesArray, state)
	return distancesArray
}
export default buildDistancesArray
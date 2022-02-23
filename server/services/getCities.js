
import fs from 'fs'
import readContent from './readCsvFileContent.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import filterCitiesByUF from './filterCitiesByUF.js'
import saveArrayToDisk from './saveArrayToDisk.js'
import readFileContent from './readCsvFileContent.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const buildCitiesArray = async (state) => {
	const brazilCities = await readFileContent('brazil_cities.csv')
	const stateCities = filterCitiesByUF(brazilCities, state)
	const dataPath = `cities/${state}.csv`
	saveArrayToDisk(stateCities, dataPath)
	return stateCities
}

const getCitiesArray = async (state) => {
	const filePath = `${__dirname}/../data/cities/${state}.csv`
	if(fs.existsSync(filePath)) {
		return await readContent(`cities/${state}.csv`)
	}  
	return await buildCitiesArray(state)
}
export default getCitiesArray 
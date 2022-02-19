import { getDistanceArray } from './services/calculateDistance.js'
import readFileContent from './services/readCsvFileContent.js'
import getDistanceFromDistancesArray from './services/getDistanceFromDistancesArray.js'
import filterCitiesByUF from './services/filterCitiesByUF.js'


(async () => {
	const brazilCities = await readFileContent('brazil_cities.csv')
	const spCities = filterCitiesByUF(brazilCities, 'SP')
	const distancesArray = getDistanceArray(spCities)
	const distanceBetweenSpRc = getDistanceFromDistancesArray({ distances: distancesArray, nameCityA: 'Sao Paulo', nameCityB: 'Rio Claro' })
	console.log(`A distância entre Rio Claro e SP é: ${distanceBetweenSpRc} KM`)
})()
import { getDistanceArray } from './services/calculateDistance.js'
import readFileContent from './services/readCsvFileContent.js'
import filterCitiesByUF from './services/filterCitiesByUF.js'
import nearestCities from './services/getNearestCities.js'


(async () => {
	const brazilCities = await readFileContent('brazil_cities.csv')
	const spCities = filterCitiesByUF(brazilCities, 'SP')
	const distancesArray = getDistanceArray(spCities)
	const cityName = 'Rio Claro'
	const nearestCount = 20
	const closestCities = nearestCities({ distancesArray, cityName, nearestCount })
	console.log(`Top ${nearestCount} cidades mais próximas à ${cityName}`)
	closestCities.forEach(item => {
		const { cityA, cityB, distance } = item
		console.log(`${cityA.nm_municipio} -> ${cityB.nm_municipio} = ${distance} KM`)
	})

})()
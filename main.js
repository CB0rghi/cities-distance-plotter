import fs from 'fs'
import { parse } from 'csv-parse/sync'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const readContent = async (file) => {
	console.log('Dirname', __dirname)
	const fileContent = await fs.promises.readFile(`${__dirname}/data/${file}`)
	const records = parse(fileContent, { columns: true })
	return records
}

const getStateCities = (cities, state) => {
	return cities.filter(city => city.cd_uf === state)
}


// JavaScript program to calculate Distance Between
// Two Points on Earth
function distance(lat1,
	lat2, lon1, lon2)
{
   
	// The math module contains a function
	// named toRadians which converts from
	// degrees to radians.
	lon1 =  lon1 * Math.PI / 180
	lon2 = lon2 * Math.PI / 180
	lat1 = lat1 * Math.PI / 180
	lat2 = lat2 * Math.PI / 180
   
	// Haversine formula
	let dlon = lon2 - lon1
	let dlat = lat2 - lat1
	let a = Math.pow(Math.sin(dlat / 2), 2)
                 + Math.cos(lat1) * Math.cos(lat2)
                 * Math.pow(Math.sin(dlon / 2),2)
               
	let c = 2 * Math.asin(Math.sqrt(a))
   
	// Radius of earth in kilometers. Use 3956
	// for miles
	let r = 6371
   
	// calculate the result
	return(c * r)
}

// Distance will be calculated based on central longitude and latitude
const getDistance = (cityA, cityB) => {
	return distance(cityA.lat_municipio, cityB.lat_municipio, cityA.long_municipio, cityB.long_municipio)
}

const distancesArray = []

const mountDistancesArray = (cities) => {
	const lastPosition = cities.length - 1
	for(let i = 0; i < cities.length; i++) {
		const leftCity = cities[i]
		const rigthCity = cities[lastPosition - i]
	}
}

(async () => {
	const brazilCities = await readContent('brazil_cities.csv')
	const spCities = getStateCities(brazilCities, 'SP')
	let auxID = 0
	// Add Id to each city
	const citiesWithID = spCities.map((city) => ({ ...city, ID: ++auxID}))

	const rioClaro = spCities.find(city => city.nm_municipio === 'Rio Claro')
	const sp = spCities.find(city => city.nm_municipio === 'Sao Paulo')
	const distance = getDistance(rioClaro, sp)
	mountDistancesArray(citiesWithID)
	console.log(`A distância entre Rio Claro e SP é: ${distance} KM`)

	// Add function to calculate distance between city a and city B
	// Add new data structure containing cityA, cityB and distance 
	// Iterate through cities, calculating distance and adding it to distances array
})()
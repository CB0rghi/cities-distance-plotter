import filterDistancesByCity from './filterDistancesByCity.js'

const filterNearestCities = ({ distancesArray, cityName, nearestCount }) => {
	const distances = filterDistancesByCity(distancesArray, cityName)
	const normalizedDistances = normalizeDistances(distances, cityName)

	const array = normalizedDistances
		.sort((a, b) => a.distance - b.distance)
		.splice(0, nearestCount)

	return array
}

const normalizeDistances = (filteredDistances, cityName) => {
	const destinations = new Set()
	const result = []
	let swap = 0
	let added = 0

	filteredDistances.forEach(data => {
		if(data.cityB == cityName){
			// the cityB is the origin. Swap!

			let cityName = data.cityA
			let cityLat = data.latA
			let cityLong = data.longA

			data.cityA = data.cityB
			data.latA = data.latB
			data.longA = data.longB

			data.cityB = cityName
			data.latB = cityLat
			data.longB = cityLong

			swap ++
		}

		let key = JSON.stringify(data)
		if(!destinations.has(key)){
			result.push(data)
			destinations.add(key)
			added++
		}
	})

	return result
}

export default filterNearestCities
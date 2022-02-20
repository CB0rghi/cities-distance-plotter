import getNearestCities from './services/getNearestCities.js'

(async () => {
	const closestCities = await getNearestCities('SP', 'Rio Claro', 10)
	console.log(closestCities)
})()
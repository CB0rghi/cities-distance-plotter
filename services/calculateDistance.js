export const getDistanceFromTwoPoints = ({ latA, latB, longA, longB }) => {
	// The math module contains a function
	// named toRadians which converts from
	// degrees to radians.
	longA =  longA * Math.PI / 180
	longB = longB * Math.PI / 180
	latA = latA * Math.PI / 180
	latB = latB * Math.PI / 180
   
	// Haversine formula
	let dlon = longB - longA
	let dlat = latB - latA
	let a = Math.pow(Math.sin(dlat / 2), 2)
                 + Math.cos(latA) * Math.cos(latB)
                 * Math.pow(Math.sin(dlon / 2),2)
               
	let c = 2 * Math.asin(Math.sqrt(a))
   
	// Radius of earth in kilometers. Use 3956
	// for miles
	let r = 6371
   
	// calculate the result
	return(c * r)
}

export const getDistanceFromTwoCities = ({ cityA, cityB }) => {
	const { lat_municipio: latA, long_municipio: longA } = cityA
	const { lat_municipio: latB, long_municipio: longB } = cityB
	return getDistanceFromTwoPoints({ latA, latB, longA, longB })
}

export const getDistanceArray = (cities) => {
	const distancesArray = []
	let lastPosition = cities.length - 1
	const middle = lastPosition / 2
	for(let i = 0; i <= middle; i++) {
		const leftCity = cities[i]
		const rightCity = cities[lastPosition - i]
		for(let j = i + 1; j <= lastPosition; j++) {
			const comparableCity = cities[j]
			const leftDistance =
      getDistanceFromTwoCities({ cityA: leftCity, cityB: comparableCity })
			const leftDistanceObj = {
				cityA: leftCity,
				cityB: comparableCity,
				distance: leftDistance
			}
			distancesArray.push(leftDistanceObj)
			if(j < lastPosition) {
				const rightDistance = getDistanceFromTwoCities({ cityA: rightCity, cityB: comparableCity })
				const rightDistanceObj = {
					cityA: rightCity,
					cityB: comparableCity,
					distance: rightDistance
				}
				distancesArray.push(rightDistanceObj)
			}
		}
		lastPosition--
	}
	return distancesArray
}
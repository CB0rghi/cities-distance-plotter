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

// 1 2 3 4 5 
//leftCity = 1
//rightCity = 5

//1
// 2 3 4 5

//5
// 2 3 4

//1 -> 2; 1 -> 3; 1 ->4 ; 1 -> 5
//5 -> 2; 5 -> 3; 5 -> 4

export const calculateDistancesArray = (cities) => {
	const distancesArray = []
	const addDistance = (distance, cityA, cityB) => {
		const distanceObj = {
			cityA: cityA.nm_municipio,
			cityB: cityB.nm_municipio,
			latA: cityA.lat_municipio,
			longA: cityA.long_municipio,
			latB: cityB.lat_municipio,
			longB: cityB.long_municipio,
			distance 
		}
		distancesArray.push(distanceObj)
	}

	let leftMainPointer = 0
	let rightMainPointer = cities.length - 1

	while(leftMainPointer < rightMainPointer){
		let leftInnerPointer  = leftMainPointer  + 1
		let rightInnerPointer = rightMainPointer - 1

		const leftInnerPointerMax  = rightMainPointer
		const rigthInnerPointerMax = leftMainPointer + 1

		const leftMainCity  = cities[leftMainPointer]
		const rightMainCity = cities[rightMainPointer]

		while(leftInnerPointer <= leftInnerPointerMax && rightInnerPointer >= rigthInnerPointerMax){
			const leftCity = cities[leftInnerPointer]
			const rightCity = cities[rightInnerPointer]

			const leftDistance = getDistanceFromTwoCities({ cityA: leftMainCity, cityB: leftCity })
			const rightDistance = getDistanceFromTwoCities({ cityA: rightMainCity, cityB: rightCity })

			addDistance(leftDistance, leftMainCity, leftCity)
			addDistance(rightDistance, rightMainCity, rightCity)

			leftInnerPointer  ++
			rightInnerPointer --
		}

		const leftCity = cities[leftInnerPointer]
		const leftDistance = getDistanceFromTwoCities({ cityA: leftMainCity, cityB: leftCity })
		addDistance(leftDistance, leftMainCity, leftCity)
    
		leftMainPointer  ++
		rightMainPointer --
	}
	
	return distancesArray
}

export const calculateDistancesArray_bkp = (cities) => {
	const distancesArray = []
	const addDistance = (distance, cityA, cityB) => {
		const distanceObj = {
			cityA: cityA.nm_municipio,
			cityB: cityB.nm_municipio,
			latA: cityA.lat_municipio,
			longA: cityA.long_municipio,
			latB: cityB.lat_municipio,
			longB: cityB.long_municipio,
			distance 
		}
		distancesArray.push(distanceObj)
	}

	let lastPosition = cities.length - 1

	const middle = lastPosition / 2
	for(let i = 0; i <= middle; i++) {
		const leftCity = cities[i]
		const rightCity = cities[lastPosition - i]

		for(let j = i + 1; j <= lastPosition; j++) {
			const comparableCity = cities[j]
			const leftDistance = getDistanceFromTwoCities({ cityA: leftCity, cityB: comparableCity })
			addDistance(leftDistance, leftCity, comparableCity)

			if(j < lastPosition) {
				const rightDistance = getDistanceFromTwoCities({ cityA: rightCity, cityB: comparableCity })
				addDistance(rightDistance, rightCity, comparableCity)
			}
		}
		lastPosition--
	}
	return distancesArray
}
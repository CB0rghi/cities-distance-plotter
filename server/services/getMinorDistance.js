import calculateMinorDistance from './calculateMinorDistance.js'

const getMinorDistance = async (distanceArray, state, sourceCity, destinyCity) => {
	return await calculateMinorDistance(distanceArray, state, sourceCity, destinyCity)
}
export default getMinorDistance
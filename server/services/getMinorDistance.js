import calculateMinorDistance from './calculateMinorDistance.js'

const getMinorDistance = async (state, sourceCity, destinyCity) => {
	return await calculateMinorDistance(state, sourceCity, destinyCity)
}
export default getMinorDistance
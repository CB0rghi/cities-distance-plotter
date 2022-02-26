import getMinorDistance from './getMinorDistance.js'

const getShortestPathTo = async (state, sourceCity, destinyCity) => {
	return getMinorDistance(state, sourceCity, destinyCity)
}
export default getShortestPathTo 
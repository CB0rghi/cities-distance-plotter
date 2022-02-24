import getDistancesArray from "./getDistancesArray.js"
import getMinorDistance from "./getMinorDistance.js"

const getShortestPathTo = async (state, sourceCity, destinyCity) => {
	const array = await getDistancesArray(state)
	return getMinorDistance(array, state, sourceCity, destinyCity)
}
export default getShortestPathTo 
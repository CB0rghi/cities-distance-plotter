import saveArrayToDisk from './saveArrayToDisk.js'

const saveDistancesToDisk = (distancesArray, state) => {
	const dataPath = `distances/${state}.csv`
	saveArrayToDisk(distancesArray, dataPath)
}
export default saveDistancesToDisk
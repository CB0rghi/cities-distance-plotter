import pkg from 'convert-array-to-csv'
const { convertArrayToCSV } = pkg
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const saveDistancesToDisk = (distancesArray, state) => {
	const convertedString = convertArrayToCSV(distancesArray)
	fs.writeFileSync(`${__dirname}/../data/distances/${state}.csv`, convertedString)
}
export default saveDistancesToDisk
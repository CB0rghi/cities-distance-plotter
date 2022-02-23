import pkg from 'convert-array-to-csv'
const { convertArrayToCSV } = pkg
import fs from 'fs'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const saveArrayToDisk = (array, dataPath) => {
	const convertedString = convertArrayToCSV(array)
	fs.writeFileSync(`${__dirname}/../data/${dataPath}`, convertedString)
}
export default saveArrayToDisk 
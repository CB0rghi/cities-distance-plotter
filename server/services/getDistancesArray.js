import fs from 'fs'
import readContent from './readCsvFileContent.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import buildDistancesArray from './buildDistancesArray.js'
const __dirname = dirname(fileURLToPath(import.meta.url))

const getDistancesArray = async (state) => {
	const filePath = `${__dirname}/../data/distances/${state}.csv`
	if(fs.existsSync(filePath)) {
		return buildDistancesArray(state)
	//	return await readContent(`distances/${state}.csv`)
	}  
	return buildDistancesArray(state)
}
export default getDistancesArray
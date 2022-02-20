import fs from 'fs'
import { parse } from 'csv-parse/sync'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url))

const readContent = async (file) => {
	const fileContent = await fs.promises.readFile(`${__dirname}/../data/${file}`)
	const records = parse(fileContent, { columns: true })
	return records
}
export default readContent
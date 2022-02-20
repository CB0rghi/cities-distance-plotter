import express from 'express'
import cors from 'cors'
import getNearestCities from './services/getNearestCities.js'

const app = express()
app.use(cors())

// HARDCODED FOR NOW
const state = 'SP'

app.get('/nearest-cities/:city/:count', async (req, res) => {
	const { city, count } = req.params
	const nearestCities = await getNearestCities(state, city, count)
	res.send(nearestCities)  
})

app.listen(3010)
console.log('Listenning on port 3010')
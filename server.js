import express from 'express'
const app = express()
const state = 'SP'
import getNearestCities from './services/getNearestCities.js'
app.get('/nearest-cities/:city/:count', async (req, res) => {
	const { city, count } = req.params
	const nearestCities = await getNearestCities(state, city, count)
	res.send(nearestCities)  
})

app.listen(3010)
console.log('Listenning on port 3010')
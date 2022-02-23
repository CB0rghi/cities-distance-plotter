import express from 'express'
import cors from 'cors'
import getNearestCities from './services/getNearestCities.js'
import getCitiesArray from './services/getCities.js'

const app = express()
app.use(cors())

app.get('/nearest-cities/:state/:city/:count', async (req, res) => {
	const { state, city, count } = req.params
	const nearestCities = await getNearestCities(state, city, count)
	res.send(nearestCities)  
})

app.get('/cities/:state', async (req, res) => {
	const { state } = req.params
	const stateCities = await getCitiesArray(state)
	res.send(stateCities)
})

app.listen(3010)
console.log('Listenning on port 3010')
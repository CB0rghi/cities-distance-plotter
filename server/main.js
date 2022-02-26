import calculateMinorDistance from './services/calculateMinorDistance.js'
(async() => {
	const state = 'SP'
	const from = 'Sao Paulo'
	const to = 'Rio Claro'
	const result = await calculateMinorDistance(state, from, to)
	console.log('Result =>', result)
})()
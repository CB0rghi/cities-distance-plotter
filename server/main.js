import calculateMinorDistance from './services/calculateMinorDistance.js'
(async() => {
	const state = 'SP'
	const from = 'Sao Paulo'
	const to = 'Sao Carlos'
	const result = await calculateMinorDistance(state, from, to)
	console.log('Result =>', result)
})()
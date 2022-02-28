import { buildGraph, ignoreDirectRoute } from './calculateMinorDistance.js'
import { performance } from 'perf_hooks'
import getDistancesArray from './getDistancesArray.js'
import bellmanFord from './bellmanFord.js'
import dijkstra from './dijkstra.js'
import saveArrayToDisk from './saveArrayToDisk.js'
import getCitiesArray from './getCities.js'

const generateMetrics = async (state) => {
	const buildGraphPerformances = []
	const djikstraPerformances = []
	const djikstraRelaxCounts = []
	const bellmanPerformances = []
	const bellmanRelaxCounts = []

	let distances = await getDistancesArray(state)
	const uniqueCities = await getCitiesArray(state)
	const graph = buildGraph(distances)

	// console.log(graph.getAllVertices().length)

	/* const vertices = graph.getAllVertices()

	vertices.forEach((v) => {
		console.log(v.getEdges().length)
	})
 */
	function calculateMetrics(array) {
		let sum = 0
		for (let i = 0; i < array.length; i++) {
			sum += parseFloat(array[i].milliseconds);
		}

		const avg = (sum / array.length) || 0;

		let varianca = 0;
		for (var i = 0; i < array.length; i++) {
			varianca += (avg - array[i].milliseconds) * (avg - array[i].milliseconds);
		}
		varianca = varianca / array.length;
		Math.sqrt(varianca);

		const desvioPadrao = Math.sqrt(varianca)

		return {
			media: avg,
			desvioPadrao
		}
	}

	function calculateMetricsNumber(array) {
		let sum = 0
		for (let i = 0; i < array.length; i++) {
			sum += parseInt(array[i]);
		}

		const avg = (sum / array.length) || 0;

		let varianca = 0;
		for (var i = 0; i < array.length; i++) {
			varianca += (avg - array[i]) * (avg - array[i]);
		}
		varianca = varianca / array.length;
		Math.sqrt(varianca);

		const desvioPadrao = Math.sqrt(varianca)

		return {
			media: avg,
			desvioPadrao: desvioPadrao
		}
	}

	async function startGraphAnalysis(cities) {
		await new Promise((resolve, reject) => {
			console.log('Starting graph analysis')
			cities.forEach(() => {
				const start = performance.now()
				buildGraph(distances)
				const duration = performance.now() - start
				buildGraphPerformances.push(duration.toFixed(4))
			})
			resolve()
		});
		/* const dataPath = `metrics/graph.csv`
		saveArrayToDisk(buildGraphPerformances, dataPath) */

		const { media, desvioPadrao } = calculateMetricsNumber(buildGraphPerformances)

		console.log('Graph average time: ', media)
		console.log('Graph desvio padrao time: ', desvioPadrao)

		console.log('Graph Analysis Finished!')
	}

	async function startDjikstraAnalysis(cities) {
		await new Promise((resolve, reject) => {
			console.log('Starting djikstra analysis')
			cities.forEach((c) => {
				const vertexA = graph.getVertexByKey(c.nm_municipio)
				const start = performance.now()
				const { relaxCount } = dijkstra(graph, vertexA)
				const duration = performance.now() - start
				djikstraPerformances.push(duration.toFixed(4))
				djikstraRelaxCounts.push(relaxCount)
			})
			resolve()
		});

		const metrics = calculateMetricsNumber(djikstraPerformances)
		const metrics2 = calculateMetricsNumber(djikstraRelaxCounts)

		console.log('Djikstra average time: ', metrics.media)
		console.log('Djikstra desvio padrao time: ', metrics.desvioPadrao)
		console.log('Djikstra relax count average: ', metrics2.media)
		console.log('Djikstra relax count desvio padrao: ', metrics.desvioPadrao)

		/* const dataPath = `metrics/djikstra.csv`
		saveArrayToDisk(djikstraPerformances, dataPath) */

		console.log('Djikstra Analysis Finished!')
	}

	const startBellmanFordAnalysis = async (cities) => {
		await new Promise((resolve, reject) => {
			console.log('Starting bellmanford analysis')
			cities.forEach((c) => {
				// console.log('calculating: ', d.nm_municipio)
				const vertexA = graph.getVertexByKey(c.nm_municipio)
				const start = performance.now()
				const { relaxCount } = bellmanFord(graph, vertexA)
				const duration = performance.now() - start
				bellmanPerformances.push(duration.toFixed(4))
				bellmanRelaxCounts.push(relaxCount)
			})
			resolve()
		});

		const metrics = calculateMetricsNumber(bellmanPerformances)
		const metrics2 = calculateMetricsNumber(bellmanRelaxCounts)

		console.log('BellmanFord average time: ', metrics.media)
		console.log('BellmanFord desvio padrao time: ', metrics.desvioPadrao)
		console.log('BellmanFord relax count average: ', metrics2.media)
		console.log('BellmanFord relax count desvio padrao: ', metrics2.desvioPadrao)

		/* const dataPath = `metrics/bellmanford.csv`
		saveArrayToDisk(bellmanPerformances, dataPath) */

		console.log('BellmanFord Analysis Finished!')
	}

	startGraphAnalysis(uniqueCities)
	startDjikstraAnalysis(uniqueCities)
	startBellmanFordAnalysis(uniqueCities.splice(0, 20))
}

generateMetrics('SP')


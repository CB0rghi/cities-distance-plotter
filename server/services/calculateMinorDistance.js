import Graph from '../shared/data-structures/graph/Graph.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import getCitiesArray from './getCities.js'
import getDistancesArray from './getDistancesArray.js'
import dijkstra from '../services/dijkstra.js'

const buildGraph = (routesArray) => {
	const graph = new Graph(true)

	routesArray.forEach(route => {
		graph.addVertex(new GraphVertex(route.cityA.replace(/\s*\"*\'*\-*/g, '')))
	})

	routesArray.forEach((route) => {
		const cleanedCity = route.cityA.replace(/\s*\"*\'*\-*/g, '')
		const vertice = graph.vertices[cleanedCity]
		const sourceRoutes = routesArray.filter(route => route.cityA === cleanedCity)

		sourceRoutes.forEach(route => {
			const cleanedCityB = route.cityB.replace(/\s*\"*\'*\-*/g, '')
			let destVertice = graph.getVertexByKey(cleanedCityB)

			if (!vertice) {
				graph.addVertex(new GraphVertex(cleanedCity))
			}

			if (!destVertice) {
				graph.addVertex(new GraphVertex(cleanedCityB))
				destVertice = graph.getVertexByKey(cleanedCityB)
			}
			const edge = new GraphEdge(vertice, destVertice, route.distance)
			graph.addEdge(edge)
		})
	})

	return graph
}

const calculateMinorDistance = async (state, sourceCity, destinyCity) => {
	// const cities = await getCitiesArray(state)
	const distanceArray = await getDistancesArray(state)

	/* const d1 = distanceArray.splice(0, 100)
	const d2 = distanceArray.splice(101, 200)

	const p1 = new Promise((resolve, reject) => {
		const graph = buildGraph(d1)
		console.log('Distances: ', distances)
		resolve(graph)
	}).then((r) => console.log('asdasdasd::> ', r)) */

	/* const p2 = new Promise(() => {
		const graph = buildGraph(d2)
		const vertexA = graph.getVertexByKey(sourceCity)
		const result = bellmanFord(graph, vertexA)
		const { distances, previousVertices } = result
		console.log('Distances: ', distances)
	}) */

	console.time('Build Graph')
	const graph = buildGraph(distanceArray)
	console.timeEnd('Build Graph')
	const vertexA = graph.getVertexByKey(sourceCity)
	console.time('Dijkstra')
	const result = dijkstra(graph, vertexA)
	console.timeEnd('Dijkstra')
	const printPath = (currentCity, path) => {
		if(currentCity === sourceCity)
			return path
		const previousCity = previousVertices[currentCity].value
		return `${path} => ${printPath(previousCity, path)}`
	}
	const { distances, previousVertices } = result
	// console.log('Previous ', previousVertices[destinyCity])
	// console.log('Distance', distances[destinyCity])
	const x = printPath(previousVertices[destinyCity.replace(' ','')].value, destinyCity)
	console.log('X', x)


	let path = `${destinyCity}`
	const previousVertice = previousVertices[destinyCity.replace(' ','')].value
	path = `${previousVertice} => ${path}`
	const pp = previousVertices[previousVertice]
	path = `${pp} => ${path}`
	console.log('Path', path)


	// console.log(`${destinyCity}`, distances)
	
	return {
		from: sourceCity,
		to: destinyCity,
		distance: 0,
		path
	}
}

calculateMinorDistance('SP', 'Adamantina', 'Aguai')

export default calculateMinorDistance
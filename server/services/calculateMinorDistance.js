import Graph from '../shared/data-structures/graph/Graph.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import getCitiesArray from './getCities.js'
import getDistancesArray from './getDistancesArray.js'
import dijkstra from '../services/dijkstra.js'

const buildGraph = (routesArray) => {
	const graph = new Graph(true)

	routesArray.forEach(route => {
		graph.addVertex(new GraphVertex(route.cityA.replace(/\s*\"*\'*\-*/g, "")))
	})

	routesArray.forEach((route) => {
		const cleanedCity = route.cityA.replace(/\s*\"*\'*\-*/g, "")
		const vertice = graph.vertices[cleanedCity]
		const sourceRoutes = routesArray.filter(route => route.cityA === cleanedCity)

		sourceRoutes.forEach(route => {
			const cleanedCityB = route.cityB.replace(/\s*\"*\'*\-*/g, "")
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
	const cities = await getCitiesArray(state)
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

	const path = `${sourceCity} -> X ... -> ${destinyCity}`
	const graph = buildGraph(distanceArray)
	const vertexA = graph.getVertexByKey(sourceCity)
	const result = dijkstra(graph, vertexA)
	const { distances, previousVertices } = result
	console.log(`${destinyCity}`, distances[destinyCity])
	
	return {
		from: sourceCity,
		to: destinyCity,
		distance: 0,
		path
	}
}

calculateMinorDistance('SP', 'Cafelandia', 'AguasDaPrata')

export default calculateMinorDistance
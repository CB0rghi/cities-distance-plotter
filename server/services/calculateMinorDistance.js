import Graph from '../shared/data-structures/graph/Graph.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import getCitiesArray from './getCities.js'
import getDistancesArray from './getDistancesArray.js'
import bellmanFord from '../services/bellmanFord.js'

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
	const path = `${sourceCity} -> X ... -> ${destinyCity}`
	const graph = buildGraph(distanceArray)
	const vertexA = graph.getVertexByKey('Adamantina')
	const result = bellmanFord(graph, vertexA)
	const { distances, previousVertices } = result
	console.log('Distances: ', distances)

	return {
		from: sourceCity,
		to: destinyCity,
		distance: 0,
		path
	}
}

calculateMinorDistance('SP', 'Adamantina', 'AguasDaPrata')

export default calculateMinorDistance
import Graph from '../shared/data-structures/graph/Graph.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import getCitiesArray from './getCities.js'
import getDistancesArray from './getDistancesArray.js'
import bellmanFord from '../services/bellmanFord.js'

const buildGraph = (cities, routesArray) => {
	const graph = new Graph(true)
	// const cities = [ 'A', 'B', 'C' ]
	cities.forEach(city => graph.addVertex(new GraphVertex(city)))

	cities.forEach((city) => {
		const sourceVertice = graph.vertices[city]
		const source = city
		// const sourceRoutes = mockArray.filter(route => route.cityA === source)
		const sourceRoutes = routesArray.filter(route => route.cityA === source)
	
		sourceRoutes.forEach(route => {
			const { cityB: destination } = route
			const destVertice = graph.getVertexByKey(destination)
			const edge = new GraphEdge(sourceVertice, destVertice, route.distance)
			sourceVertice.addEdge(edge)
		})
	})

	return graph
}

const calculateMinorDistance = async (state, sourceCity, destinyCity) => {
	const cities = await getCitiesArray(state)
	const distanceArray = await getDistancesArray(state)
	const path = `${sourceCity} -> X ... -> ${destinyCity}`
	const graph = buildGraph(cities, distanceArray)
	const vertexA = graph.getVertexByKey(sourceCity)
	const result = bellmanFord(graph, vertexA)
	console.log('Result\n', result) 
	const { distances } = result
	console.log('Minimum distance is: ', distances[destinyCity])

	return {
		from: sourceCity,
		to: destinyCity,
		distance: 0,
		path
	}
}

calculateMinorDistance('SP', 'Rio Claro', 'Bauru')

export default calculateMinorDistance
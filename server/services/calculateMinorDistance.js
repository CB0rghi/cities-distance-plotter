import Graph from '../shared/data-structures/graph/Graph.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import getCitiesArray from './getCities.js'
import getDistancesArray from './getDistancesArray.js'
import bellmanFord from '../services/bellmanFord.js'

const buildGraph = (cities, routesArray) => {
	const graph = new Graph(true)
	// const cities = [ 'A', 'B', 'C' ]	

	cities.forEach((city) => {
		const cleanedCities = city.nm_municipio.replace(/\s*\"*\'*\-*/g, "")
		
		graph.addVertex(new GraphVertex(cleanedCities))

		const sourceVertice = graph.vertices[cleanedCities]
		const source = cleanedCities
		// const sourceRoutes = mockArray.filter(route => route.cityA === source)
		const sourceRoutes = routesArray.filter(route => route.cityA === source)

		sourceRoutes.forEach(route => {
			const { cityB: destination } = route
			const destVertice = graph.getVertexByKey(destination.replace(/\s*\"*\'*\-*/g, ""))

			/* 
			* O array cities contém cidades q o array sourceRoutes nao contém, então caso
			* o destVertice seja undefined ele não será adicionado como vértice final do edge
			*
			* TO-DO: Verificar o pq dessa diferenca no array, talvez devemos corrigir os arrays
			* ao invés de adicionar essa condição
			*/
			if (destVertice) {
				const edge = new GraphEdge(sourceVertice, destVertice, route.distance)
				sourceVertice.addEdge(edge)
			}

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
	// console.log('NEIGHBORS ', graph.getVertexByKey('Adamantina').edges)
	const result = bellmanFord(graph, vertexA)
	// console.log('Result\n', result)
	const { distances } = result
	console.log('Minimum distance is: ', distances[destinyCity])

	return {
		from: sourceCity,
		to: destinyCity,
		distance: 0,
		path
	}
}

calculateMinorDistance('SP', 'RioClaro', 'Bauru')

export default calculateMinorDistance
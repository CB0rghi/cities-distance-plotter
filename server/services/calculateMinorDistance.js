import Graph from '../shared/data-structures/graph/Graph.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import getCitiesArray from './getCities.js'
import getDistancesArray from './getDistancesArray.js'
import dijkstra from '../services/dijkstra.js'

const clearString = (str) => (str.replace(/\s*"*'*-*/g, ''))

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

const ignoreDirectRoute = (distances, source, destiny) => {
	return distances.filter((distance) =>
		!(
			(
				distance.cityA === source && 
				distance.cityB === destiny
			) 
			||
			(
				distance.cityA === destiny &&
				distance.cityB === source
			)
		)
	)
}

const calculateMinorDistance = async (state, source, destiny) => {
	// const cities = await getCitiesArray(state)
	let distances = await getDistancesArray(state)
	distances = ignoreDirectRoute(distances, source, destiny)

	console.time('Build Graph')
	const graph = buildGraph(distances)
	// TODO: save graph on disk to reuse it
	console.timeEnd('Build Graph')
	const vertexA = graph.getVertexByKey(source)
	console.time('Dijkstra')
	const result = dijkstra(graph, vertexA)
	console.timeEnd('Dijkstra')

	const { previousVertices } = result

	const buildPreviousPath = (currentCity, path) => {
		if(currentCity === source)
			return path
		const previousCity = previousVertices[currentCity].value
		return `${buildPreviousPath(previousCity, path)} => ${currentCity}`
	}

	const getFullPath = () => {
		const lastCity = previousVertices[clearString(destiny)].value
		const previousPath = buildPreviousPath(lastCity, source)
		return `${previousPath} => ${destiny}`
	}

	const distance = result.distances[clearString(destiny)]
	const path = getFullPath()
	// TODO: Save minimum path to file (to prevent it from caculating again in the future)
	console.log(`Minimum route from ${source} to ${destiny}\n${path} (${distance} km)`)

	return {
		from: source,
		to: destiny,
		distance: 0,
		path
	}
}

calculateMinorDistance('SP', 'Araraquara', 'Guaimbe')
export default calculateMinorDistance
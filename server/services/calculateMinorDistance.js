import Graph from '../shared/data-structures/graph/Graph.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import getDistancesArray from './getDistancesArray.js'
import dijkstra from '../services/dijkstra.js'

export const buildGraph = (routesArray) => {
	const graph = new Graph(true)
	const addVertices = () => {
		routesArray.forEach(({ cityA }) => {
			graph.addVertex(new GraphVertex(cityA))
		})
	}

	const addEdges = () => {
		for (let i = 0; i < routesArray.length; i++) {
			const route = routesArray[i]
			const { cityA, cityB, distance } = route
			const sourceVertice = graph.vertices[cityA]
			const destVertice = graph.getVertexByKey(cityB)
			const edge = new GraphEdge(sourceVertice, destVertice, distance)
			graph.addEdge(edge)
		}
	}

	addVertices()
	addEdges()
	return graph
}

export const ignoreDirectRoute = (distances, source, destiny) => {
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
	let distances = await getDistancesArray(state)
	distances = ignoreDirectRoute(distances, source, destiny)

	console.time('Build Graph')
	const graph = buildGraph(distances)
	console.timeEnd('Build Graph')
	const vertexA = graph.getVertexByKey(source)
	console.time('Dijkstra')
	const result = dijkstra(graph, vertexA)
	console.timeEnd('Dijkstra')

	const { previousVertices } = result
	const previousDistances = []

	const getDistance = (previousEdges, currentCity) => {
		return previousEdges.find((edge) => edge.endVertex.value == currentCity).weight
	}

	const buildPreviousPath = (currentCity, path) => {
		if (currentCity === source) {
			return path
		}
		const previousCity = previousVertices[currentCity].value
		previousDistances.push(getDistance(previousVertices[currentCity].getEdges(), currentCity))
		return `${buildPreviousPath(previousCity, path)} => ${currentCity}`
	}

	const getFullPath = () => {
		previousDistances.push(getDistance(previousVertices[destiny].getEdges(), destiny))
		const lastCity = previousVertices[destiny].value
		const previousPath = buildPreviousPath(lastCity, source)
		return `${previousPath} => ${destiny}`
	}

	const distance = result.distances[destiny]
	const path = getFullPath()

	console.log({
		from: source,
		to: destiny,
		distance,
		path,
		previousDistances
	})
	console.log('--------------')

	return {
		from: source,
		to: destiny,
		distance,
		path,
		previousDistances
	}
}

export default calculateMinorDistance
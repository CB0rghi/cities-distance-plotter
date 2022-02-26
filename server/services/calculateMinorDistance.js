import Graph from '../shared/data-structures/graph/Graph.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import getDistancesArray from './getDistancesArray.js'
import dijkstra from '../services/dijkstra.js'

const buildGraph = (routesArray) => {
	const graph = new Graph(true)
	const addVertices = () => {
		routesArray.forEach(({ cityA }) => {
			graph.addVertex(new GraphVertex(cityA))
		})
	}

	const addEdges = () => {
		for(let i = 0; i < routesArray.length; i++) {
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

	const buildPreviousPath = (currentCity, path) => {
		if(currentCity === source)
			return path
		const previousCity = previousVertices[currentCity].value

		return `${buildPreviousPath(previousCity, path)} => ${currentCity}`
	}

	const getFullPath = () => {
		const lastCity = previousVertices[destiny].value
		const previousPath = buildPreviousPath(lastCity, source)
		return `${previousPath} => ${destiny}`
	}

	const distance = result.distances[destiny]
	const path = getFullPath()

	return {
		from: source,
		to: destiny,
		distance,
		path
	}
}

export default calculateMinorDistance
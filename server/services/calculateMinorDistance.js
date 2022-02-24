import Graph from "../shared/data-structures/graph/Graph.js"
import GraphVertex from "../shared/data-structures/graph/GraphVertex.js"
import GraphEdge from "../shared/data-structures/graph/GraphEdge.js"
import getCitiesArray from "./getCities.js"
import bellmanFord from "../services/bellmanFord.js"

const buildGraph = async (array, state, sourceCity) => {
	const dirtCitiesArray = await getCitiesArray(state)
	const cities = dirtCitiesArray.map((city) => city.nm_municipio.replace(/\s*\"*\'*\-*/g, ""))
	const graph = new Graph(true);

	const vertices = []

	for (let i = 0; i < cities.length; i++) {
		// console.log(cities[i])
		const vertex = new GraphVertex(cities[i])
		graph.addVertex(vertex)
		vertices.push(vertex)
		// console.log(graph.getVertexByKey(vertex.getKey()))
	}

	for (let j = 0; j < vertices.length; j++) {
		const filteredCitiesA = array.filter((city) => city.cityA === vertices[j].value)

		for (let k = 0; k < filteredCitiesA.length; k++) {

			if (vertices[k].getKey() === sourceCity) {
				vertices.splice(k, 1)
			}

			const findedCity = filteredCitiesA.find((city) => {
				// console.log(`(${city.cityB} === ${vertices[k]}) && (${city.cityA} === ${vertices[j]})`)
				if ((city.cityB === vertices[k]) && (city.cityA === vertices[j])) {
					return true
				}
				return false
			})

			if (findedCity) {
				console.log(findedCity)
				// console.log(`${vertices[j].value.city} -- ${vertices[k].value.city} -- ${findedCity.distance}`)
				const edge = new GraphEdge(vertices[j], vertices[k], findedCity.distance)
				const graphV = graph.getVertexByKey(vertices[j].getKey())
				/* console.log(graphV) */
				graphV.addEdge(edge)
				/* console.log(graphV) */
			}

		}
	}
	return graph
}

const calculateMinorDistance = async (distanceArray, state, sourceCity, destinyCity) => {
	const shortestDistance = 0
	const path = `${sourceCity} -> X ... -> ${destinyCity}`

	const graph = await buildGraph(distanceArray, state, sourceCity)
	// console.log(graph)

	const vertexA = graph.getVertexByKey(sourceCity)
	console.log(vertexA.getEdges())

	// const result = bellmanFord(graph, vertexA);
	/* console.log(result.distances[0])
	console.log(result) */

	// console.log(graph.getAllVertices())

	return {
		from: sourceCity,
		to: destinyCity,
		distance: 0,
		path
	}
}

export default calculateMinorDistance
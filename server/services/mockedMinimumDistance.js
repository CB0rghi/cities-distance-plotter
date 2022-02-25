import Graph from '../shared/data-structures/graph/Graph.js'
import bellmanFord from './bellmanFord.js'
import GraphEdge from '../shared/data-structures/graph/GraphEdge.js'
import GraphVertex from '../shared/data-structures/graph/GraphVertex.js'

const mockArray = [
	{ cityA: 'A', cityB: 'B', distance: 1 },
	{ cityA: 'A', cityB: 'C', distance: 3 },
	{ cityA: 'B', cityB: 'C', distance: 1 }
]

const graph = new Graph(true)
const cities = [ 'A', 'B', 'C' ]
cities.forEach(city => graph.addVertex(new GraphVertex(city)))
console.log('Vertices', graph.vertices)

cities.forEach((city) => {
	const vertice = graph.vertices[city]
	const source = city
	const sourceRoutes = mockArray.filter(route => route.cityA === source)
	
	sourceRoutes.forEach(route => {
		const destVertice = graph.getVertexByKey(route.cityB)
		const edge = new GraphEdge(vertice, destVertice, route.distance)
		vertice.addEdge(edge)
	})
})

const vertexA = graph.getVertexByKey('A')
const result = bellmanFord(graph, vertexA)
console.log('Result', result)
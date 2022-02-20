import { useEffect, useState } from "react"
import { DefaultNode, Graph } from "@visx/network"

export const background = '#272b4d';
const basePos = {
  x: 300,
  y: 550 
}

const CitiesPlotter = (props) => {
  const { cities } = props
  const width = 1000
  const height = 1000
  const [graph, setGraph] = useState([])

  useEffect(() => {
    //on load
    const nodes = cities.map((city, index) => ({
      x: (parseFloat(city.latA) + (2 * index)) + basePos.x,
      y: parseFloat(city.longA) + (2 * index) + basePos.x
    }))
    nodes.push(basePos)
    // Também n funciona /\
    // Coloquei 10 p testar
    console.log('Nodes', nodes)

    const links = []
    for(let i = 0; i < cities.length; i++)
    {
      const obj = {
        source: basePos,
        target: nodes[i]
      }
      links.push(obj)
    }
    console.log('Links', links)
//
    const graph = {
      nodes,
      links,
    };
    setGraph(graph)

  }, [cities])

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} rx={14} fill={background} />
      <Graph
        graph={graph}
        top={20}
        left={100}
        nodeComponent={({ node: { color } }) =>
          color ? <DefaultNode fill={color} /> : <DefaultNode />
        }
        linkComponent={({ link: { source, target, dashed } }) => (
          <line
            x1={source.x}
            y1={source.y}
            x2={target.x}
            y2={target.y}
            strokeWidth={2}
            stroke="#999"
            strokeOpacity={0.6}
            strokeDasharray={dashed ? '8,4' : undefined}
          />
        )}
      />
    </svg>
  )
}
export default CitiesPlotter
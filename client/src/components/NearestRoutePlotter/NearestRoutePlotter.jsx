import React, { useEffect, useState } from "react"
import ReactFlow from 'react-flow-renderer'
import useCityStore from "../../stores/cityStore";

export const background = '#272b4d';

const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

const ShortestRoutePlotter = () => {
  const { loading, sourceCity, shortestRoute, distances } = useCityStore(state => ({ sourceCity: state.sourceCity, loading: state.loading, shortestRoute: state.shortestRoute, distances: state.distances }))
  const [elements, setElements] = useState([])

  useEffect(() => {
    if(!shortestRoute) return
    const baseX = 50
    const baseY = 150
    const dislocationX = 250
    const dislocationY = 100
    const cities = shortestRoute.split('=>').map(city => city.trim())

    const firstNode = cities[0]
    const firstVertice = {
        id: '0',
        type: 'input',
        data: { label: firstNode },
        position: {
          x: baseX, y: baseY
        }
    }
    
    const mountElements = () => {
      const elements = [firstVertice]
      const addNode = (city, index, x, y) => {
        const node = {
          id: index.toString(),
          type: index === cities.length - 1 ? 'output' : 'default',
          data: { label: city },
          position: { x, y }
        }
        elements.push(node)
      }
      let currentX = baseX
      let currentY = baseY
      let positive = true

      for (let i = 1; i < cities.length; i++) {
        const current = cities[i]
        if(i % 5 !== 0) {
          if(positive) {
            currentX += dislocationX
          } else {
            currentX -= dislocationX
          }
        }
        else {
          positive = !positive
          currentY += dislocationY
        }
        addNode(current, i, currentX, currentY)

        const edge = {
          id: `e-${i-1}${i}`,
          source: (i - 1).toString(),
          target: i.toString(),
          style: { stroke: '#000' },
          type: 'smoothstep',
          animated: true,
          label: `${Number(distances[cities.length - 1 - i]).toFixed(2)} Km`,
        }
        elements.push(edge)
      }
      console.log('Elements', elements)
      setElements(elements)
    }
    mountElements()
  }, [shortestRoute, sourceCity, distances])

  const render = () => {
    if (loading || elements.length === 0) return null
    return <ReactFlow elements={elements} onLoad={onLoad} />
  }

  return (
    <div className="w-full h-full">
      {render()}
    </div>
  )
}
export default ShortestRoutePlotter
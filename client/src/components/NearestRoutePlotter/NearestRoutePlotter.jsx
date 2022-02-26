import React, { useEffect, useState } from "react"
import ReactFlow from 'react-flow-renderer'
import useCityStore from "../../stores/cityStore";

export const background = '#272b4d';

const ShortestRoutePlotter = () => {
  const { loading, sourceCity, shortestRoute} = useCityStore(state => ({ sourceCity: state.sourceCity, loading: state.loading, shortestRoute: state.shortestRoute}))
  const [elements, setElements] = useState([])
  console.log('Plotter')

  useEffect(() => {
    if(!shortestRoute) return
    const baseX = 450 
    const dislocationY = 60
    const cities = shortestRoute.split('=>').map(city => city.trim())
    const mountElements = () => {
      const elements = []
      const firstItem = cities[0]
      elements.push({
        id: '0',
        type: 'input',
        data: { label: firstItem },
        position: { x: baseX, y: 0 }
      })

      for(let i = 1; i < cities.length; i++) {
        const current = cities[i]
        elements.push({ 
          id: i.toString(),
          type: i === cities.length - 1 ? 'output' : 'default',
          data: { label: current },
          position: { x: baseX, y: dislocationY * i }
        })        
        const edge = {
          id: `e-${i-1}${i}`,
          source: i - 1,
          target: i
        }
        elements.push(edge)
      }      
      console.log('Elements', elements)
      setElements(elements)
    }
    mountElements()
  }, [shortestRoute, sourceCity])

  const render = () => {
    if(loading || elements.length === 0) return null
    return <ReactFlow elements={elements} />
  }

  return (
  <div className="w-full h-full">
    {render()}
  </div>
  )
}
export default ShortestRoutePlotter
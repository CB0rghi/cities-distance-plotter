import React, { useEffect, useState } from "react"
import ReactFlow from 'react-flow-renderer'
import useCityStore from "../../stores/cityStore";

export const background = '#272b4d';
const CitiesPlotter = (props) => {
  const { distances } = props
  const { loading, selectedCity } = useCityStore(state => ({ selectedCity: state.selectedCity, loading: state.loading}))
  const [elements, setElements] = useState([])

  useEffect(() => {
    const isOdd = (number) => (number % 2 === 0)
    const getOtherCityName = (cityA, cityB) => {
      if(cityA === selectedCity) return cityB
      return cityA
    }

    if(distances.length === 0) return

    let leftCount = 0, rightCount = 0
    let line = 1
    const baseX = 450 
    const baseY = 0
    const dislocationX = 180
    const dislocationY = 60
    const maxPerLine = 4

    const secondaryElements = distances.map((distance, index) => {
      const { cityA, cityB } = distance
      const otherCity = getOtherCityName(cityA, cityB)
      const getPosition = (id) => {
        let xPos = 0
        
        if(((id - 1) % maxPerLine) === 0)
        {
          leftCount = 0
          rightCount = 0
          line++
        }

        const yPos = line > 1 ? (line) * dislocationY : dislocationY
        const multiplier = dislocationX
        if(isOdd(id)) {
          leftCount++
          xPos = baseX - (multiplier*leftCount)
        } else {
          rightCount++
          xPos = baseX + (multiplier*rightCount)
        }
        const pos = { x: xPos, y: yPos }
        return pos
      }
      const id = (index + 1).toString()
      return {
        id,
        type: 'output',
        data: {label: otherCity},
        position: getPosition(id)
      }
    })

    const firstElement = {
      id: '0',
      type: 'input',
      data: { label: selectedCity },
      position: { x: baseX, y: baseY}

    }

    const nodes = [firstElement, ...secondaryElements]

    const edges = secondaryElements.map((element) => {

      return {
        id: `e0-${element.id}`,
        source: '0',
        target: element.id
      }
    })
    const elements = [...nodes, ...edges]
    setElements(elements)
  }, [distances, selectedCity])

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
export default CitiesPlotter
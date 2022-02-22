import { useEffect, useState } from "react"
import { DefaultNode, Graph } from "@visx/network"
import ReactFlow from 'react-flow-renderer'
import useCityStore from "../../stores/cityStore";


const fixed = [
  {
    id: '1',
    type: 'input', // input node
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];

export const background = '#272b4d';
const CitiesPlotter = (props) => {
  const { distances } = props
  const selectedCity = useCityStore(state => state.selectedCity)
  const [elements, setElements] = useState([])

  useEffect(() => {
    const isOdd = (number) => (number % 2 === 0)
    const getOtherCityName = (cityA, cityB) => {
      if(cityA === selectedCity) return cityB
      return cityA
    }

    if(distances.length === 0) return

    let leftCount = 0, rightCount = 0
    const baseX = 350 
    const baseY = 25
    const dislocationX = 180
    const dislocationY = 100
    const maxPerLine = 4

    const secondaryElements = distances.map((distance, index) => {
      const { cityA, cityB } = distance
      const otherCity = getOtherCityName(cityA, cityB)
      const getPosition = (id) => {
        let xPos = 0
        if((id - 1) % maxPerLine === 0)
        {
          console.log('Resetou', id)
          leftCount = 0
          rightCount = 0
        }

        const currentLine = parseInt(id/(maxPerLine + 1))
        const yPos = currentLine > 0 ? (currentLine + 1) * dislocationY : dislocationY
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

  return (
  <div className="w-full h-full">
    {elements.length > 0 && <ReactFlow elements={elements} /> }
  </div>
  )
}
export default CitiesPlotter
import React from 'react'
import './App.css';
import Loader from './components/Loader/Loader';
import NearestRoutePloter from './components/NearestRoutePlotter/NearestRoutePlotter'
import NearestRouteForm from './components/NearestRouteForm/Index';
import useCityStore from './stores/cityStore';
function App() {
  const { shortestRoute, loading, totalDistance } = useCityStore(state => ({ shortestRoute: state.shortestRoute, loading: state.loading, totalDistance: state.totalDistance }))

  const loader = () => {
    if (loading) {
      return <Loader />
    }
    return null
  }
  return (
    <div className='h-screen w-full flex'>
      <div className='w-full absolute text-center pt-24'>
       <NearestRouteForm className='h-full w-full absolute' />
        {totalDistance ? <span className='text-3xl font-bold'> Distância Total: {`${Number(totalDistance).toFixed(2)} Km`}</ span> : null}
      </div>
      

      {Boolean(shortestRoute) &&
        (
          <div className='flex flex-col w-full h-full'>
            <div className='flex items-center'>
              {loader()}
            </div>
            <NearestRoutePloter />
          </div>
        )
      }
    </div>
  );
}

export default App;

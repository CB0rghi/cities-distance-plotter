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
      <NearestRouteForm className='h-full' />

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
      <div className='h-full flex' style={{ position: 'absolute', width: '100%', justifyContent: 'flex-end', zIndex: '-1' }}>
        <div style={{ marginRight: 5 }}> Distância total: </div>
        <div> {` ${Number(totalDistance).toFixed(2)} Km`} </div>
      </div>

    </div>
  );
}

export default App;

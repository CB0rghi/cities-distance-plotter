import React from 'react'
import './App.css';
import Loader from './components/Loader/Loader';
import NearestCitiesForm from './components/NearestCitiesForm/Index';
import NearestRoutePloter from './components/NearestRoutePlotter/NearestRoutePlotter'
import NearestCitiesPlotter from './components/NearestCitiesPlotter/NearestCitiesPlotter'
import NearestRouteForm from './components/NearestRouteForm/Index';
import useCityStore from './stores/cityStore';
function App() {
  const { shortestRoute, loading } = useCityStore(state => ({shortestRoute: state.shortestRoute, loading: state.loading }))

  const loader = () => {
    if(loading)
    {
      return <Loader />
    }
    return null
  }
  return (
    <div className='h-screen w-full flex'>
      <NearestRouteForm className='w-full h-full' />
      
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

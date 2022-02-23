import React from 'react'
import './App.css';
import Loader from './components/Loader/Loader';
import NearestCitiesForm from './components/NearestCitiesForm/Index';
import NearestCitiesPlotter from './components/NearestCitiesPlotter/NearestCitiesPlotter'
import useCityStore from './stores/cityStore';
function App() {
  const { distances, loading } = useCityStore(state => ({distances: state.distances, loading: state.loading }))

  const loader = () => {
    if(loading)
    {
      return <Loader />
    }
    return null
  }
  return (
    <div className='h-screen w-full flex'>
      <NearestCitiesForm className='w-full h-full'/>
      
      {!!distances.length && 
        (
        <div className='flex flex-col w-full h-full'>
          <div className='flex items-center'>
            <strong className='text-left ml-20 p-6 pr-2 text-xl'>Cidades Próximas </strong>
            {loader()}
          </div>
          <NearestCitiesPlotter distances={distances}/>
        </div>
        )
      }
    </div>
  );
}

export default App;

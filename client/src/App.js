import { useEffect } from 'react';
import './App.css';
import NearestCitiesForm from './components/NearestCitiesForm/Index';
import NearestCitiesPlotter from './components/NearestCitiesPlotter/NearestCitiesPlotter'
import useCityStore from './stores/cityStore';
function App() {
  const distances = useCityStore(state => state.distances)
  useEffect(() => {
    console.log('Cities were changed', distances)
  }, [distances])
  return (
    <div className='h-screen w-full flex'>
      <NearestCitiesForm className='w-full h-full'/>
      <NearestCitiesPlotter distances={distances}/>
    </div>
  );
}

export default App;

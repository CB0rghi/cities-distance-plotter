import { useEffect } from 'react';
import './App.css';
import NearestCitiesForm from './components/NearestCitiesForm/Index';
import useCityStore from './stores/cityStore';
function App() {
  const cities = useCityStore(state => state.cities)
  useEffect(() => {
    console.log('Cities were changed', cities)
  }, [cities])
  return (
    <NearestCitiesForm/>
  );
}

export default App;

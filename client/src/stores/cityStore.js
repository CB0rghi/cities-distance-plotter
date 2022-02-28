import create from 'zustand'

const useCityStore = create(set => ({
  distances: [],
  loading: false,
  selectedCity: '',
  sourceCity: '',
  destinyCity: '',
  shortestRoute: '',
  totalDistance: 0,

  clear: () => set({cities: []}),
  selectCity: (city) => set(state => ({...state, selectedCity: city})),
  setDestiny: (city) => set(state => ({...state, destinyCity: city})),
  setSource: (city) => set(state => ({...state, sourceCity: city})),
  setDistances: (distances) => set(state => ({ ...state, distances })),
  setTotalDistance: (value) => set(state => ({ ...state, totalDistance: value })),
  setShortestRoute: (path) => set(state => ({...state, shortestRoute: path})),
  setLoading: (value) => set(state => ({ ...state, loading: value }))
}))

export default useCityStore
import create from 'zustand'

const useCityStore = create(set => ({
  distances: [],

  selectedCity: '',
  clear: () => set({cities: []}),
  selectCity: (city) => set(state => ({...state, selectedCity: city})),
  setDistances: (distances) => set(state => ({ ...state, distances }))
}))

export default useCityStore
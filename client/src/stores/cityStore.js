import create from 'zustand'

const useCityStore = create(set => ({
  distances: [],
  loading: false,
  selectedCity: '',

  clear: () => set({cities: []}),
  selectCity: (city) => set(state => ({...state, selectedCity: city})),
  setDistances: (distances) => set(state => ({ ...state, distances })),
  setLoading: (value) => set(state => ({ ...state, loading: value }))
}))

export default useCityStore
import create from 'zustand'

const useCityStore = create(set => ({
  cities: [],

  clear: () => set({cities: []}),
  setCities: (cities) => set(state => ({ ...state, cities }))
}))

export default useCityStore
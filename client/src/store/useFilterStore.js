import { create } from 'zustand'

export const useFilterStore = create((set) => ({
  // Advanced filters modal state
  showAdvancedFilters: false,
  setShowAdvancedFilters: (show) => set({ showAdvancedFilters: show }),

  // Selected basic filters (search, location)
  selectedFilters: [], // Initialize as an array
  setSelectedFilters: (filters) => set({ selectedFilters: filters }),
  removeFilter: (filter) => 
    set((state) => ({
      selectedFilters: state.selectedFilters.filter((f) => f.type !== filter.type)
    })),

  // Advanced filters state
  advancedFilters: {
    experience: "4 - 6 Years",
    salary: "$6000 - $8000",
    jobType: ["Full Time"],
    education: ["Graduation"],
    skills: "Mid Level",
  },
  setAdvancedFilters: (filters) => set({ advancedFilters: filters }),
}))
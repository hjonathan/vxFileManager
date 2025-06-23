import { ref } from 'vue'

export const useFileManager = () => {
  const viewMode = ref('stacked')  // Stacked, Grid
  const previewMode = ref(false)
  const selectedItem = ref(null)

  const toogleViewMode = () => {
    viewMode.value = viewMode.value === 'stacked' ? 'grid' : 'stacked'
  }

  const tooglePreviewMode = () => {
    previewMode.value = !previewMode.value
  }

  const setPreviewMode = (value) => {
    previewMode.value = value
  }

  const setSelectedItem = (item) => {
    selectedItem.value = item
  }

  const getSelectedItem = () => {
    return selectedItem.value
  }
  
  // Current Item selected
  const currentItem = ref(null)

  const setCurrentItem = (item) => {
    currentItem.value = item
  }
  const getCurrentItem = () => {
    return currentItem.value
  }

  // Last Item selected
  const lastItem = ref(null)

  const setLastItem = (item) => {
    lastItem.value = item
  }

  const getLastItem = () => {
    return lastItem.value
  }


  // History functions
  const history = ref([])

  const setHistory = (item) => {
    history.value.push(item)
  }

  const goTo = (item) => {
    if (!item) {
      history.value = []
      return
    }

    const index = history.value.findIndex(i => i.id === item.id)
    if (index !== -1) {
      history.value = history.value.slice(0, index + 1)
    }

    if(index === -1){
      history.value.push(item)
    }
  }

  const getHistory = () => {
    return history.value
  }

  const getHistoryByIndex = (index) => {
    return history.value[index]
  }

  const getLastHistory = () => {
    return history.value[history.value.length - 1]
  }
  
  const getCurrentPath = () => {
    if(history.value.length > 0){ 
      const path = history.value.map(item => item.name).join('/')
      return "/" + path
    }
    return '/'
  }

  const getParentCurrentFolder = () => {
    if(history.value.length - 2 > 0){
      return history.value[history.value.length - 2]
    }
    return null
  }

  return {
    viewMode,
    toogleViewMode,
    previewMode,
    setPreviewMode,
    tooglePreviewMode,
    selectedItem,
    setSelectedItem,
    getSelectedItem,
    history,
    setHistory,
    getHistory,
    getHistoryByIndex,
    getLastHistory,
    getCurrentPath,
    getParentCurrentFolder,
    lastItem,
    setLastItem,
    getLastItem,
    currentItem,
    setCurrentItem,
    getCurrentItem,
    goTo
  }
}
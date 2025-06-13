import { ref } from 'vue'

export const useFileManager = () => {
  const viewMode = ref('stacked')  // Stacked, Grid
  const previewMode = ref(false)
  const previewItem = ref(null)

  const toogleViewMode = () => {
    viewMode.value = viewMode.value === 'stacked' ? 'grid' : 'stacked'
  }

  const tooglePreviewMode = () => {
    previewMode.value = !previewMode.value
  }

  const setPreviewMode = (value) => {
    previewMode.value = value
  }

  const setPreviewItem = (item) => {
    previewItem.value = item
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

  const getHistory = () => {
    return history.value
  }

  const getHistoryByIndex = (index) => {
    return history.value[index]
  }

  const getHistoryByPath = (path) => {
    return history.value.find(item => item.path === path)
  }

  return {
    viewMode,
    toogleViewMode,
    previewMode,
    setPreviewMode,
    tooglePreviewMode,
    previewItem,
    setPreviewItem,
    history,
    setHistory,
    getHistory,
    getHistoryByIndex,
    getHistoryByPath,
    lastItem,
    setLastItem,
    getLastItem,
    currentItem,
    setCurrentItem,
    getCurrentItem
  }
}
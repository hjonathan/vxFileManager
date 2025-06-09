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

  return {
    viewMode,
    toogleViewMode,
    previewMode,
    setPreviewMode,
    tooglePreviewMode,
    previewItem,
    setPreviewItem
  }
}
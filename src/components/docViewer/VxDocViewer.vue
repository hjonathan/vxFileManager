<template>
  <div class="doc-viewer">
    <div class="doc-controls mb-4 flex items-center gap-4">
      <button 
        @click="prevPage" 
        :disabled="currentPage <= 1"
        class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50"
      >
        Anterior
      </button>
      <button 
        @click="nextPage" 
        :disabled="currentPage >= totalPages"
        class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50"
      >
        Siguiente
      </button>
      <span class="text-sm text-gray-400">Página {{ currentPage }} de {{ totalPages }}</span>
      <div class="flex items-center gap-2">
        <button 
          @click="zoomOut" 
          class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
        >
          Zoom Out
        </button>
        <button 
          @click="resetZoom" 
          class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
        >
          Tamaño Real
        </button>
        <button 
          @click="zoomIn" 
          class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
        >
          Zoom In
        </button>
        <span class="text-sm text-gray-400">{{ Math.round(scale * 100) }}%</span>
      </div>
    </div>
    
    <div class="doc-container" ref="docContainer">
      <div v-if="loading" class="flex items-center justify-center h-64">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
      <div v-else-if="error" class="text-red-500 p-4">
        {{ error }}
      </div>
      <div v-else class="doc-content" :style="{ transform: `scale(${scale})` }">
        <div class="page" v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import mammoth from 'mammoth'

const props = defineProps({
  docSource: {
    type: [String, Object, Uint8Array],
    required: true
  }
})

const content = ref('')
const loading = ref(true)
const error = ref(null)
const scale = ref(1.0)
const docContainer = ref(null)
const currentPage = ref(1)
const totalPages = ref(1)

const loadDocument = async () => {
  console.log('loadDocument')
  loading.value = true
  error.value = null
  
  try {
    let result
    if (typeof props.docSource === 'string') {
      const response = await fetch(props.docSource)
      const arrayBuffer = await response.arrayBuffer()
      result = await mammoth.convertToHtml({ arrayBuffer })
    } else if (props.docSource instanceof Uint8Array) {
      result = await mammoth.convertToHtml({ arrayBuffer: props.docSource })
    } else {
      throw new Error('Formato de documento no soportado')
    }

    content.value = result.value
    
    // Calcular el número total de páginas después de que el contenido se haya renderizado
    setTimeout(() => {
      const pageHeight = 29.7 * 37.8 // altura A4 en píxeles
      const contentHeight = docContainer.value?.querySelector('.page')?.offsetHeight || 0
      totalPages.value = Math.ceil(contentHeight / pageHeight)
    }, 100)
  } catch (err) {
    error.value = 'Error al cargar el documento: ' + err.message
    console.error('Error loading document:', err)
  } finally {
    loading.value = false
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    const pageHeight = 29.7 * 37.8 * scale.value
    docContainer.value?.scrollTo({
      top: (currentPage.value - 1) * pageHeight,
      behavior: 'smooth'
    })
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    const pageHeight = 29.7 * 37.8 * scale.value
    docContainer.value?.scrollTo({
      top: (currentPage.value - 1) * pageHeight,
      behavior: 'smooth'
    })
  }
}

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 3.0)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5)
}

const resetZoom = () => {
  scale.value = 1.0
}

// Watch for changes in document source
watch(() => props.docSource, () => {
  loadDocument()
})

onMounted(() => {
  loadDocument()
})
</script>

<style scoped>
.doc-viewer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #1a1a1a;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.doc-container {
  flex: 1;
  overflow: auto;
  padding: 2rem;
  display: flex;
  justify-content: center;
  scroll-snap-type: y mandatory;
}

.doc-content {
  overflow: auto;
  transform-origin: top center;
  width: 21cm;
  min-height: 29.7cm;
  margin: 0 auto;
}

.page {
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm;
  margin: 1cm auto;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  scroll-snap-align: start;
  page-break-after: always;
  box-sizing: border-box;
}

/* Estilos para el contenido del documento */
.page :deep(h1) {
  font-size: 24pt;
  margin-bottom: 0.5em;
  font-family: 'Times New Roman', Times, serif;
}

.page :deep(h2) {
  font-size: 18pt;
  margin-bottom: 0.5em;
  font-family: 'Times New Roman', Times, serif;
}

.page :deep(p) {
  margin-bottom: 1em;
  line-height: 1.6;
  font-size: 12pt;
  font-family: 'Times New Roman', Times, serif;
}

.page :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 1em;
  font-size: 12pt;
}

.page :deep(th),
.page :deep(td) {
  border: 1px solid #ddd;
  padding: 8px;
}

.page :deep(img) {
  max-width: 100%;
  height: auto;
}

/* Estilos para listas */
.page :deep(ul),
.page :deep(ol) {
  margin-bottom: 1em;
  padding-left: 2em;
  font-size: 12pt;
}

.page :deep(li) {
  margin-bottom: 0.5em;
}

/* Estilos para citas */
.page :deep(blockquote) {
  margin: 1em 0;
  padding-left: 1em;
  border-left: 4px solid #ddd;
  font-style: italic;
}

@media print {
  .page {
    margin: 0;
    box-shadow: none;
    page-break-after: always;
  }
}
</style> 
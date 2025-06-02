<template>
  <div class="pdf-viewer">
    <div class="pdf-controls mb-4 flex items-center gap-4">
      <button 
        @click="prevPage" 
        :disabled="currentPage <= 1"
        class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50"
      >
        Previous
      </button>
      <button 
        @click="nextPage" 
        :disabled="currentPage >= totalPages"
        class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50"
      >
        Next
      </button>
      <span class="text-sm text-gray-400">Page {{ currentPage }} of {{ totalPages }}</span>
      <div class="flex items-center gap-2">
        <button 
          @click="zoomOut" 
          class="rounded bg-gray-700 px-3 py-1 text-sm text-white hover:bg-gray-600"
        >
          Zoom Out
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
    
    <div class="pdf-container" ref="pdfContainer">
      <canvas ref="pdfCanvas" class="mx-auto"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// Configurar el worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'

const props = defineProps({
  pdfSource: {
    type: [String, Object, Uint8Array],
    required: true
  }
})

const pdfCanvas = ref(null)
const pdfContainer = ref(null)
const scale = ref(1.0)
const currentPage = ref(1)
const totalPages = ref(0)
let pdfDoc = null

const loadPdf = async () => {
  try {
    // Load the PDF document
    pdfDoc = await pdfjsLib.getDocument(props.pdfSource).promise
    totalPages.value = pdfDoc.numPages
    renderPage()
  } catch (error) {
    console.error('Error loading PDF:', error)
  }
}

const renderPage = async () => {
  if (!pdfDoc) return

  try {
    const page = await pdfDoc.getPage(currentPage.value)
    const canvas = pdfCanvas.value
    const context = canvas.getContext('2d')

    const viewport = page.getViewport({ scale: scale.value })
    canvas.height = viewport.height
    canvas.width = viewport.width

    const renderContext = {
      canvasContext: context,
      viewport: viewport
    }

    await page.render(renderContext).promise
  } catch (error) {
    console.error('Error rendering page:', error)
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 3.0)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5)
}

// Watch for changes in current page or scale
watch([currentPage, scale], () => {
  renderPage()
})

// Watch for changes in PDF source
watch(() => props.pdfSource, () => {
  loadPdf()
})

onMounted(() => {
  console.log('onMounted')
  loadPdf()
})
</script>

<style scoped>
.pdf-viewer {
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: #1a1a1a;
  padding: 1rem;
}

.pdf-container {
  display: flex;
  justify-content: center;
  min-height: 500px;
  overflow: auto;
}

canvas {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  background-color: white;
}
</style> 
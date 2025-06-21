<template>
  <div class="p-4 w-full overflow-hidden bg-gray-800">
    <div class="w-full h-full overflow-hidden bg-gray-800">
      <div class="pdf-controls mb-4 flex justify-between items-center gap-2">
        <div class="flex items-center gap-4">
          <button @click="prevPage" :disabled="currentPage <= 1"
            class="rounded bg-gray-700 px-1 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50 hover:cursor-pointer">
            <ChevronLeftIcon class="size-4" />
          </button>

          <span class="text-sm text-white">{{ currentPage }} / {{ totalPages }}</span>

          <button @click="nextPage" :disabled="currentPage >= totalPages"
            class="rounded bg-gray-700 px-1 py-1 text-sm text-white hover:bg-gray-600 disabled:opacity-50 hover:cursor-pointer">
            <ChevronRightIcon class="size-4" />
          </button>
        </div>


        <div class="flex items-center text-sm  gap-4 text-white">
          <button @click="zoomOut" class="rounded p-1 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer">
            <MagnifyingGlassMinusIcon class="size-4" />
          </button>

          <span class="text-sm text-white">{{ Math.round(scale * 100) }}%</span>

          <button @click="zoomIn" class="rounded p-1 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer">
            <MagnifyingGlassPlusIcon class="size-4" />
          </button>

        </div>
      </div>

      <div class="h-full overflow-scroll" ref="pdfContainer">
        <canvas ref="pdfCanvas" class="mx-auto"></canvas>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/vue/24/outline'
import * as pdfjsLib from 'pdfjs-dist'

// Configurar el worker
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs'

const props = defineProps({
  data: {
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
    pdfDoc = await pdfjsLib.getDocument(props.data).promise
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
// watch(() => props.pdfSource, () => {
//   loadPdf()
// })

onMounted(() => {
  loadPdf()
})
</script>

<style scoped>
canvas {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  background-color: white;
}
</style>
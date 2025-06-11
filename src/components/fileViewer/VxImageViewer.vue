<template>
  <div class="p-4 w-full overflow-hidden bg-gray-800">
    <div class="w-full h-full overflow-hidden bg-gray-800 flex flex-col">
      <!-- Controles de zoom -->
      <div class="flex justify-end items-center text-sm gap-4 text-white mb-4">
        <button @click="zoomOut" class="rounded p-1 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer">
          <MagnifyingGlassMinusIcon class="size-4" />
        </button>

        <span class="text-sm text-white">{{ Math.round(scale * 100) }}%</span>

        <button @click="zoomIn" class="rounded p-1 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer">
          <MagnifyingGlassPlusIcon class="size-4" />
        </button>

        <button @click="resetZoom" class="rounded p-1 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer">
          <ArrowPathIcon class="size-4" />
        </button>
      </div>

      <!-- Contenedor de la imagen -->
      <div class="flex h-full w-full overflow-auto relative justify-center items-center" ref="imageContainer" @wheel="handleWheel">
        <div class="flex justify-center items-start"
          :style="{ transform: `scale(${scale})` }">
          <img :src="data" 
               @load="onImageLoad" 
               :style="{ 
                 maxHeight: '80vh',
                 objectFit: 'contain',
                 transition: 'transform 0.2s ease-out'
               }"
               class="select-none"
               alt="Imagen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

const props = defineProps({
  data: {
    type: String,
    required: true
  }
})

const scale = ref(1.0)
const imageContainer = ref(null)

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 3.0)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.5)
}

const resetZoom = () => {
  scale.value = 1.0
}

const handleWheel = (event) => {
  if (event.ctrlKey) {
    event.preventDefault()
    if (event.deltaY < 0) {
      zoomIn()
    } else {
      zoomOut()
    }
  }
}

const onImageLoad = () => {
  resetZoom()
}
</script>

<style scoped>
img {
  user-select: none;
  -webkit-user-drag: none;
}
</style> 
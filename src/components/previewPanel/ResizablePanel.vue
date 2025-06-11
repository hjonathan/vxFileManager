<template>
  <div :style="{ width: `${width}px` }">
    <div class="absolute top-0 bottom-0 w-1 start-0 cursor-ew-resize hover:bg-blue-100" @mousedown="startResize">
    </div>
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const width = ref(400) // Default width
const isResizing = ref(false)

const startResize = (e) => {
  isResizing.value = true
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
}

const handleMouseMove = (e) => {
  if (!isResizing.value) return
  const newWidth = window.innerWidth - e.clientX
  if (newWidth > 200 && newWidth < window.innerWidth * 0.8) {
    width.value = newWidth
  }
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
}

onUnmounted(() => {
  document.removeEventListener('mousemove', handleMouseMove)
  document.removeEventListener('mouseup', stopResize)
})

</script>
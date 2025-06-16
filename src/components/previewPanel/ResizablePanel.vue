<template>
  <div ref="resizablePanel" :style="{ width: `${width}px` }" :class="`min-w-[${minw}px] max-w-[${maxw}px]`">
    <div v-if="position === 'left'" class="z-20 absolute top-0 bottom-0 w-1 end-0 cursor-ew-resize hover:bg-blue-100" @mousedown="startResize">
    </div>
    <slot></slot>
    <div v-if="position === 'right'" class="z-20 absolute top-0 bottom-0 w-1 start-0 cursor-ew-resize hover:bg-blue-100" @mousedown="startResize">
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  position: {
    type: String,
    default: 'right'
  },
  w: {
    type: [Number, String],
    default: 400
  },
  minw: {
    type: [Number, String],
    default: 200
  },
  maxw: {
    type: [Number, String],
    default: 800
  }
})

const width = ref(props.w) // Default width
const isResizing = ref(false)
const initialX = ref(0)
const initialWidth = ref(0)
const resizablePanel = ref(null)

const startResize = (e) => {
  isResizing.value = true
  initialX.value = e.clientX
  initialWidth.value = width.value
  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', stopResize)
}

const handleMouseMove = (e) => {
  if (!isResizing.value) return

  const deltaX = e.clientX - initialX.value
  const newWidth = props.position === 'right' 
  ? initialWidth.value - deltaX 
  : initialWidth.value + deltaX

  if (newWidth >= props.minw && newWidth <= props.maxw) {
    width.value = newWidth;
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
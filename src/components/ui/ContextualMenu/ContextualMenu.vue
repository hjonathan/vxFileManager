<template>
  <div
       class="fixed z-[1000] bg-white border border-gray-200 rounded-lg shadow-lg min-w-[200px] max-w-[300px] overflow-hidden"
       :style="{ left: event.clientX + 'px', top: event.clientY + 'px' }"
       @click.stop>
    <div class="py-1">
      <div v-for="item in menuItems" 
           :key="item.id"
           class="flex items-center px-4 py-2 cursor-pointer transition-colors relative hover:bg-gray-100"
           :class="{ 'opacity-50 cursor-not-allowed': item.disabled, 'h-px !py-0 bg-gray-300 my-1 p-0 cursor-default': item.separator }"
           @click.prevent.stop="handleItemClick(item)">
        <div v-if="item.icon" class="mr-2 w-4 h-4 flex items-center justify-center">
          <component :is="item.icon" />
        </div>
        <span class="flex-1 text-sm text-gray-700">{{ item.label }}</span>
        <div v-if="item.shortcut" class="ml-4 text-xs text-gray-400 dark:text-gray-500">{{ item.shortcut }}</div>
        <div v-if="item.children" class="ml-2 text-gray-400 dark:text-gray-500">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Props
const props = defineProps({
  menuItems: {
    type: Array,
    default: () => []
  },
  event: {
    type: Object,
    default: () => ({ clientX: 0, clientY: 0 })
  }
})

// Emits
const emit = defineEmits(['item-click', 'close'])

// Methods
const handleItemClick = (item) => {
  if (item.disabled) return
  
  if (item.action) {
    item.action()
  }
  
  emit('item-click', item)
  emit('close')
}

// Close menu when clicking outside
const handleClickOutside = (event) => {
    emit('close')
}

// Close menu on escape key
const handleKeyDown = (event) => {
  if (event.key === 'Escape' && props.isVisible) {
    emit('close')
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
})
</script>
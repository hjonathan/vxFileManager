<template>
  <div>
      <slot name="header" :isExpanded="isExpanded" :toggleExpanded="toggleExpanded" >
      </slot>
    <div v-show="isExpanded">
      <slot name="content" >
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  enable: {
    type: Boolean,
    default: false
  }
})

const isExpanded = ref(false)

const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped></style>
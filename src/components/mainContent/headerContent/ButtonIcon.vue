<template>
  <button type="button"
    class="relative shrink-0 rounded-md bg-white p-1 text-gray-400
      hover:bg-gray-100 hover:cursor-pointer
      hover:text-gray-500 focus:ring-2 focus:ring-indigo-500
      focus:ring-offset-2 focus:outline-hidden">
    <span class="absolute -inset-1.5"></span>
    <span class="sr-only">{{ srOnly }}</span>
    <slot />
  </button>
</template>

<script setup>
const props = defineProps({
  srOnly: {
    type: String,
    required: false
  }
})
</script>
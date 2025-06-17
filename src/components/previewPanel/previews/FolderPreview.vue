<template>
  <div class="flex flex-1 flex-col p-8 items-center">
    <FolderIconVx class="size-40 flex-none" />

    <dl class="mt-1 flex flex-col justify-center items-center space-y-1">
      <span class="mt-6 text-lg font-medium text-gray-900 hover:underline mb-2">{{ data.name }}</span>
      <dt class="sr-only">Type</dt>
      <dd class="text-sm text-gray-500" v-html="data.qtip"></dd>
    </dl>
  </div>
</template>

<script setup>
import { FolderIconVx } from '../../icons'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
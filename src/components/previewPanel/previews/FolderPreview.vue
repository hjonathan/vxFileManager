<template>
  <div class="flex flex-1 flex-col p-8 items-center">
    <FolderIconVx class="size-40 flex-none" />

    <dl class="mt-1 flex flex-col justify-center items-center space-y-1">
      <span class="mt-6 text-lg font-medium text-gray-900 hover:underline mb-2">{{ data.name }}</span>
      <dt class="sr-only">Title</dt>
      <dd class="text-sm text-gray-500">{{ data.type }}</dd>
      <dt class="sr-only">Type</dt>
      <dd class="text-sm text-gray-500">{{ data.size }}</dd>
      <!-- <dd class="mt-3">
          <span
            class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">{{ data.lastModifiedBy }}</span>
        </dd> -->
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
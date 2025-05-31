<template>
  <li class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
    <div class="flex min-w-0 gap-x-4 items-center">
      <slot name="select" />
      <slot name="image" />
      <div class="min-w-0 flex-auto">
        <p class="text-sm/6 font-semibold text-gray-900">
          <a href="#">
            <span class="absolute inset-x-0 -top-px bottom-0"></span>
            {{ data.name }}
          </a>
        </p>
        <p class="mt-1 flex text-xs/5 text-gray-500">
          <a :href="'mailto:' + data.description"
            class="relative truncate hover:underline">{{ data.type }}</a>
        </p>
      </div>
    </div>
    <div class="flex shrink-0 items-center gap-x-4">
      <div class="hidden sm:flex sm:flex-col sm:items-end">
        <p class="text-sm/6 text-gray-900">{{ data?.lastModifiedBy }}</p>
        <p class="mt-1 text-xs/5 text-gray-500">Last modified <time :datetime="data.lastModified">{{ data?.lastModified }}</time></p>
      </div>
      <svg class="size-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
        data-slot="icon">
        <path fill-rule="evenodd"
          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
          clip-rule="evenodd" />
      </svg>
    </div>
  </li>
</template>

<script setup>
import { ContentType, FolderType } from '../../../mainHandler/types'

const props = defineProps({
  data: {
    type: [ContentType, FolderType],
    required: true
  }
})

console.log(props.data)
</script>

<style scoped></style>
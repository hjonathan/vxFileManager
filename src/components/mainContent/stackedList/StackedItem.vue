<template>
  <li :class="data.selected ? 'bg-gray-100' : ''"
    class="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
    <div class="flex min-w-0 gap-x-4 items-center">
      <slot name="select" />
      <slot name="image" />
      <div class="min-w-0 flex-auto">
        <p class="text-sm/6 font-semibold text-gray-900 line-clamp-2 truncate">
          <a href="#">
            <span class="absolute inset-x-0 -top-px bottom-0"></span>
            {{ data.name }}
          </a>
        </p>
        <p class="mt-1 flex text-xs/5 text-gray-500">
          <a :href="'mailto:' + data.description" class="relative truncate hover:underline">{{ data.type }}</a>
        </p>
      </div>
    </div>

    <div class="flex shrink-0 items-center gap-x-4">
      <div class="flex flex-col hidden sm:flex sm:flex-col sm:items-end">
        <p class="mt-1 text-xs/5 text-gray-500"><time :datetime="data.lastModified">{{ formattedDate }}</time>
        </p>
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
import { computed } from 'vue'
import { ContentType, FolderType } from '../../../mainHandler/types'
import { dateFormat } from '../../config/globalVariables'
import dayjs from 'dayjs'

const data = defineModel('data', {
  type: [ContentType, FolderType],
  required: true
})

const formattedDate = computed(() => {
  return data.value?.appDocCreateDate
  return dayjs(data.value.appDocCreateDate).format(dateFormat)
})
</script>

<style scoped></style>
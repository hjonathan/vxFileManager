<template>
  <ul role="list" class="divide-y divide-gray-100">
    <li v-for="(file, index) in data" :key="file.name" class="relative flex justify-between gap-x-6 py-5">
      <div class="flex min-w-0 gap-x-4">
        <DocumentIcon class="size-12 flex-none rounded-full text-gray-200" />
        <div class="min-w-0 flex-auto">
          <p class="text-sm/6 font-semibold text-gray-900">
            {{ file.name }}
          </p>
          <p class="mt-1 flex text-xs/5 text-gray-500">
            {{ file.size }}
          </p>
        </div>
      </div>
      <div class="flex shrink-0 items-center gap-x-4">
        <div class="hidden sm:flex sm:flex-col sm:items-end">
          <p class="text-sm/6 text-gray-900">{{ file.type }}</p>
          <p class="mt-1 text-xs/5 text-gray-500">
            {{ file.lastModified }}
          </p>
        </div>
        <XMarkIcon class="size-5 flex-none text-gray-400 cursor-pointer hover:bg-gray-100 rounded-lg p-1" aria-hidden="true" @click="removeFile(file, index)" />
      </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import { DocumentIcon, XMarkIcon } from '@heroicons/vue/20/solid'

const data = defineModel('data', {
  type: Array,
  default: () => null,
  props: {
    name: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: ''
    },
    lastModified: {
      type: Number,
      default: 0
    }
  }
})

const emit = defineEmits(['update:data'])

const removeFile = (file, index) => {  
  fileArray.splice(index, 1)
  data.value = fileArray
}
</script>
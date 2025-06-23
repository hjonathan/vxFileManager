<template>
  <nav class="flex text-xs w-full text-gray-500" aria-label="Breadcrumb">
    <ol role="list" class="mx-auto flex w-full max-w-(--breakpoint-xl)">
      <li class="flex">
        <div class="flex items-center">
          <a href="#" class="hover:text-gray-500" @click="goToDirectory(null)">
            <HomeIcon class="size-5 shrink-0" aria-hidden="true" />
            <span class="sr-only">Home</span>
          </a>
        </div>
      </li>
      <li v-for="page in history" :key="page.name" class="flex">
        <div class="flex items-center">
          <svg class="h-full w-4 shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none"
            fill="currentColor" aria-hidden="true">
            <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
          </svg>
          <a @click="goToDirectory(page)" class="mx-4 font-medium hover:text-gray-700 cursor-pointer whitespace-nowrap" :aria-current="page.current ? 'page' : undefined">{{ page.name }}</a>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { HomeIcon } from '@heroicons/vue/20/solid'

const emit = defineEmits(['event'])
const props = defineProps({
  fileManager: {
    type: Object,
    required: true,
  },
})

const { history } = props.fileManager

const goToDirectory = (page) => {
  emit('event', {
    type: 'go-to-directory',
    data: page
  })
}

const pages = [
  { name: 'Projects', href: '#', current: false },
  { name: 'Project Nero', href: '#', current: true },
]
</script>
<template>
  <!-- Sticky search header -->
  <HeaderContent />

  <main class="lg:pr-96">
    <!-- <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h1 class="text-base/7 font-semibold">Deployments</h1> -->

    <!-- Sort dropdown -->
    <!-- <div class="relative">
        <button type="button" class="flex items-center gap-x-1 text-sm/6 font-medium" id="sort-menu-button"
          aria-expanded="false" aria-haspopup="true">
          Sort by
          <svg class="size-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd"
              d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z"
              clip-rule="evenodd" />
          </svg>
        </button> -->
    <StackedList :data="data" v-if="typeView === 'stacked'" v-model:selectMode="selectMode" @event="onEvent" />
    <GridView v-if="typeView === 'grid'" v-model:selectMode="selectMode" />
  </main>

  <!-- Activity feed -->
  <aside
    class="bg-black/10 lg:fixed lg:top-16 lg:right-0 lg:bottom-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
    <header class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <h2 class="text-base/7 font-semibold">Activity feed</h2>
      <a href="#" class="text-sm/6 font-semibold text-indigo-400">View all</a>
    </header>
    <ul role="list" class="divide-y divide-white/5">
      <li class="px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center gap-x-3">
          <img
            src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="" class="size-6 flex-none rounded-full bg-gray-800">
          <h3 class="flex-auto truncate text-sm/6 font-semibold text-white">Michael Foster</h3>
          <time datetime="2023-01-23T11:00" class="flex-none text-xs text-gray-600">1h</time>
        </div>
        <p class="mt-3 truncate text-sm text-gray-500">Pushed to <span class="text-gray-400">ios-app</span> (<span
            class="font-mono text-gray-400">2d89f0c8</span> on <span class="text-gray-400">main</span>)</p>
      </li>

      <!-- More items... -->
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import GridView from './gridView/GridView.vue'
import HeaderContent from './headerContent/HeaderContent.vue'
import StackedList from './stackedList/StackedList.vue'
import { ContentType, FolderType } from '../../mainHandler/types'

const emit = defineEmits(['event'])
const props = defineProps({
  data: {
    type: Array,
    required: true,
    props: [ContentType, FolderType]
  }
})


const typeView = ref('stacked')

const selectMode = ref(false)

const onEvent = (event) => {
  emit('event', event)
}
</script>

<style scoped></style>
<template>
  <div class="flex h-auto relative items-center">
    <MagnifyingGlassIcon class="absolute h-5 w-5 m-2 text-gray-400" />
    <input type="text" name="search"
      @keyup.enter="onChangeSearch"
      class="block w-full rounded-lg py-1.5 bg-gray-100 px-10 outline-1 -outline-offset-1 outline-gray-200 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      placeholder="Search">
    <div class="absolute right-2">
      <kbd
        class="inline-flex items-center rounded-sm border border-gray-200 px-1 font-sans text-xs text-gray-400">Enter</kbd>
    </div>
  </div>
</template>

<script setup>
import {
  MagnifyingGlassIcon
} from '@heroicons/vue/24/outline'

const emit = defineEmits(["change"]);

const onChangeSearch = (event) => {
  emit('change', event.target.value)
}
</script>
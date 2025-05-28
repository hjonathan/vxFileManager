<template>
  <ul role="list" class="-mx-2 space-y-1">
    <li v-for="item in items" :key="item.name">
      <a href="#"
        :class="[
          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
          item.current ? 'text-white' : 'hover:bg-gray-100'
        ]">
        <component :is="item.icon" class="size-6 shrink-0" />
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>
<template>
  <ExpansionPanel :enable="enable">
    <template #header="{ isExpanded, toggleExpanded }">
      <div class="flex items-center justify-between">
        <div class="text-xs/6 font-semibold text-gray-400">{{ title }}</div>
        <svg 
          @click="toggleExpanded"
          class="w-5 h-5 hover:cursor-pointer hover:bg-gray-100 rounded-full transition-transform duration-200" :class="{ 'rotate-180': isExpanded }" viewBox="0 0 20 20"
          fill="currentColor">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </div>
    </template>
    <template #content>
      <ul role="list" class="-mx-2 mt-2 space-y-1">
        <li v-for="item in items" :key="item.name">
          <ItemHome :item="item" @event="onEvent" />
        </li>
      </ul>
    </template>
  </ExpansionPanel>
</template>

<script setup>
import ExpansionPanel from '../../base/ExpansionPanel.vue'
import ItemHome from './item/ItemHome.vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  enable: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array,
    required: true,
    props: {
      name: {
        type: String,
        required: true,
      },
    },
  },
})
const emit = defineEmits(['event'])

const onEvent = (event) => {
  emit('event', event)
}
</script>

<style scoped></style>

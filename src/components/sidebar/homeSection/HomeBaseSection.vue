<template>
  <ExpansionPanel :enable="enable" :default-expanded="true">
    <template #header="{ isExpanded, toggleExpanded }">
      <div class="flex items-center justify-between">
        <div class="text-xs font-semibold">{{ title }}</div>
        <div class="flex flex-row gap-x-2 items-center">
          <ArrowPathIcon
            @click="onClickRefresh"
            class="w-5 h-5 hover:cursor-pointer hover:bg-gray-100 rounded-full transition-transform duration-200 items-center" />

          <svg @click="toggleExpanded"
            class="w-6 h-6 hover:cursor-pointer hover:bg-gray-100 rounded-full transition-transform duration-200"
            :class="{ 'rotate-180': isExpanded }" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clip-rule="evenodd" />
          </svg>
        </div>

      </div>
    </template>
    <template #content>
      <ul role="list" class="-mx-2">
        <li v-for="(item, index) in items" :key="index">
          <ItemHome v-model:item="items[index]" @event="onEvent" />
        </li>
      </ul>
    </template>
  </ExpansionPanel>
</template>

<script setup>
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
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
})
const emit = defineEmits(['event'])

const items = defineModel('items', {
  type: Array,
  required: true,
})

const onEvent = (event) => {
  emit('event', event)
}

/**
 * Refresh the items on navigator
 */
const onClickRefresh = () => {
  emit('event', {
    type: "refresh-navigator",
  })
}
</script>

<style scoped></style>

<template>
  <ExpansionPanel>
    <template #header="{ isExpanded, toggleExpanded }">
      <div class="flex items-center justify-start">
        <svg v-if="item.total > 0" @click="() => {
            toggleExpanded();
            onClickExpand();
        }"
          class="w-5 h-5 hover:cursor-pointer hover:bg-gray-100 rounded-full transition-transform duration-200"
          :class="{ '-rotate-90': !isExpanded }" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
        <span v-else class="w-5 h-5">&nbsp;</span>
        <a class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 ">
          <FolderIcon class="size-6 shrink-0" />
          <span class="truncate">{{ item.name }}</span>
        </a>
      </div>
    </template>
    <template #content v-if="data.length">
      <ul role="list" class="ml-2 mt-2 space-y-1">
        <li v-for="subItem in data" :key="subItem.name">
          <ItemHome :item="subItem" @event="onEvent" />
        </li>
      </ul>
    </template>
  </ExpansionPanel>
</template>
<script setup>
import { ref, inject } from 'vue'
import ExpansionPanel from '../../../base/ExpansionPanel.vue'
import ItemHome from './ItemHome.vue'
import {
  FolderIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['event'])

const { expandFolderHandler } = inject('provider')

const data = ref([])

const onClickExpand = () => {
  emit('event', {
    type: "expand-folder",
    data: props.item
  })

  debugger

  data.value = expandFolderHandler(props.item)
}
</script>
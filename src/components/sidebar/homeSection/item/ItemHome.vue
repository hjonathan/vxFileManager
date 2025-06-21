<template>
  <ExpansionPanel>
    <template #header="{ isExpanded, toggleExpanded }">
      <div class="flex w-full items-center justify-start">
        <svg v-if="isExpandable" @click.prevent.stop="() => {
          toggleExpanded();
          onClickExpand();
        }" class="w-6 h-6 hover:cursor-pointer hover:bg-gray-100 rounded-full transition-transform duration-200"
          :class="{ '-rotate-90': !isExpanded }" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
        <span v-else class="w-6 h-6">&nbsp;</span>
        <a @click.prevent.stop="onClickGetContent" :class="{ 'text-blue-500': item.active }"
          class="group flex w-full gap-x-3 rounded-md px-2 py-1 text-sm/6 font-semibold hover:bg-gray-100 hover:cursor-pointer truncate">
          <FolderIconVx class="size-6 shrink-0" />
          <span class="truncate">{{ item.name }}</span>
        </a>
      </div>
    </template>
    <template #content v-if="data.length">
      <ul role="list" class="ml-3 mt-2 space-y-1">
        <li v-for="(subItem, i) in data" :key="subItem.name + i">
          <ItemHome :item="subItem" @event="onEvent" />
        </li>
      </ul>
    </template>
  </ExpansionPanel>
</template>
<script setup>
import { ref, inject, nextTick } from 'vue'
import ExpansionPanel from '../../../base/ExpansionPanel.vue'
import ItemHome from './ItemHome.vue'
import { FolderType } from '../../../../mainHandler/types'
import { FolderIconVx, DocumentIconVx } from '../../../ui/icons/index'


const item = defineModel('item', {
  type: FolderType,
  required: true,
})
const emit = defineEmits(['event'])
const { expandHomeHandler } = inject('provider')
const data = ref([])

const isExpandable = ref(true)

const onClickExpand = async () => {
  data.value = await expandHomeHandler({ data: item.value })
  item.value.children = data.value

  if (data.value.length === 0) {
    isExpandable.value = false
  }

  nextTick(() => {
    emit('event', {
      type: "expand-folder",
      data: item
    })
  })

}

const onClickGetContent = () => {
  emit('event', {
    type: "get-content",
    data: item,
  })
}

const onEvent = (event) => {
  emit('event', event)
}
</script>
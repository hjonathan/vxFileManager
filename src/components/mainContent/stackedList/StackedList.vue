<template>
  <ul role="list"
    class="divide-y divide-gray-100 bg-white shadow-xs ring-1 ring-gray-900/5 sm:rounded-xl">
    <StackedItem v-for="(item, index) in data" :key="item.name" :data="item" @click="handleClick(item, index)">
      <template #select v-if="selectMode">
        <div class="group grid size-4 grid-cols-1">
          <input id="comments" aria-describedby="comments-description" name="comments" type="checkbox" checked=""
            class="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
          <svg
            class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
            viewBox="0 0 14 14" fill="none">
            <path class="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
            <path class="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </template>
      <template #image>
        <StackedIcon :item="item" />
      </template>
    </StackedItem>
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import StackedItem from './StackedItem.vue'
import StackedIcon from './StackedIcon.vue'
import { ContentType, FolderType } from '../../../mainHandler/types'

const selectMode = defineModel('selectMode')

const emit = defineEmits(['event'])
const data = defineModel('data', {
  type: Array,
  required: true,
  props: [ContentType, FolderType]
})

const clicks = ref(0);
const delay = 200;


const onDoubleClickStage = (item, index) => {
  console.log('onClickItem', item)
  if (item.type === 'Directory') {
    emit('event', {
      type: 'get-content',
      data: data.value[index]
    })
    emit('event', {
      type: 'close-preview-mode',
    })
  }
}

const onClickItem = (item, index) => {
  emit('event', {
    type: 'open-preview-mode',
    data: data.value[index]
  })
}

const handleClick = (item, index) => {
  clicks.value += 1;
  if (clicks.value === 1) {
    setTimeout(() => {
      if (clicks.value === 1) {
        onClickItem(item, index)
      } else if (clicks.value === 2) {
        onDoubleClickStage(item, index)
      }
      clicks.value = 0;
    }, delay);
  }
};
</script>

<style scoped></style>
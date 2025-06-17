<template>
  <ul role="list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
    <ItemView v-for="item in data"
      :key="item.name"
      :data="item"
      @click="handleClick(item)"
      >
      <template #image>
        <GridIcon :item="item" />
      </template>
    </ItemView>

    <!-- More people... -->
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import ItemView from './ItemView.vue'
import { ContentType, FolderType } from '../../../mainHandler/types'
import GridIcon from './GridIcon.vue'

const data = defineModel('data', {
  type: [ContentType, FolderType],
  required: true
})

const emit = defineEmits(['event'])

const clicks = ref(0);
const delay = 200;

const onDoubleClickStage = (item) => {
  console.log('ondblClickItem', item)
  if (item.type === 'Directory') {
    emit('event', {
      type: 'get-content',
      data: item
    })
    emit('event', {
      type: 'close-preview-mode',
    })
  }
}

const onClickItem = (item) => {
  emit('event', {
    type: 'open-preview-mode',
    data: item
  })
}

const handleClick = (item) => {
  clicks.value += 1;
  if (clicks.value === 1) {
    setTimeout(() => {
      if (clicks.value === 1) {
        onClickItem(item)
      } else if (clicks.value === 2) {
        onDoubleClickStage(item)
      }
      clicks.value = 0;
    }, delay);
  }
};
</script>

<style scoped></style>
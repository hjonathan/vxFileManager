<template>
  <div @contextmenu.prevent.stop="e=>handleContextMenu(e)">
    <ContextualMenu
      v-if="showContextMenu"
      :event="event"
      @item-click="e=>handleMenuItemClick(e, emit, itemContextMenu)"
      @close="hideMenu"
      :menu-items="menuOptionsBuilder(itemContextMenu)" />
    <ul role="list"
      class="flex flex-wrap gap-4">
      <ItemView class="flex w-40 h-60"
        v-for="(item, index) in data" :key="item.name" :data="item" @click="handleClick(item)"
        @contextmenu.prevent.stop="e=>handleContextMenu(e, item, index)">
        <template #image>
          <GridIcon :item="item" />
        </template>
      </ItemView>
    </ul>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import ItemView from './ItemView.vue'
import { ContentType, FolderType } from '../../../mainHandler/types'
import GridIcon from './GridIcon.vue'
import { handleMenuItemClick, menuOptionsBuilder, openDirectory, openPreviewMode } from '../MainContentHandler'
import ContextualMenu from '../../ui/ContextualMenu/ContextualMenu.vue'

const data = defineModel('data', {
  type: [ContentType, FolderType],
  required: true
})

const emit = defineEmits(['event'])

const clicks = ref(0);
const delay = 200;
const event = ref()
const showContextMenu = ref(false)
const itemContextMenu = ref()

const handleContextMenu = (e, item, index) => {
  itemContextMenu.value =  data.value[index] ? data.value[index] : {type: 'content-main'}
  e.preventDefault()
  event.value = e
  nextTick(() => {
    showContextMenu.value = true
  })
}

const hideMenu = () => {
  showContextMenu.value = false
}

const onDoubleClickStage = (item) => {
  if (item.type === 'Directory') {
    emit('event', {
      type: 'get-content',
      data: item,
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
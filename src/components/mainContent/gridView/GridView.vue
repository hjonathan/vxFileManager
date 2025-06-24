<template>
  <div @contextmenu.prevent="e=>handleContextMenu(e)">
    <ContextualMenu
      v-if="showContextMenu"
      :event="event"
      @item-click="e=>handleMenuItemClick(e, emit, itemContextMenu)"
      @close="hideMenu"
      :menu-items="menuOptionsBuilder(itemContextMenu)" />
    <ul role="list"
      class="flex flex-wrap gap-4">
      <template v-for="(item, index) in data" :key="item.name">
        <ItemView class="flex w-40 h-60"
          v-model:data="data[index]" @click="e=>handleClick(e, data[index], index)"
          @contextmenu="e=>handleContextMenu(e, data[index], index)">
          <template #image>
            <GridIcon :item="item" />
          </template>
        </ItemView>
      </template>
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

const handleContextMenu = async (e, item, index) => {
  e.stopPropagation()
  e.preventDefault()
  itemContextMenu.value =  data.value[index] ? data.value[index] : {type: 'content-main'}
  if (item) {
    selectItem(item, index)
  }
  event.value = e
  nextTick(() => {
    showContextMenu.value = true
  })
}

const selectItem = async (item, index) => {
  await emit('event', {
    type: 'select-item',
    data: data.value[index]
  })
}

const hideMenu = () => {
  showContextMenu.value = false
  // emit('event', {
  //   type: 'deselect-item',
  // })
}

const onDoubleClickStage = async (item, index) => {
  await selectItem(item, index)
  if (item.type === 'Directory') {
    openDirectory(emit, data.value[index])
  }
}

const onClickItem = (item, index) => {
  selectItem(item, index)
  //openPreviewMode(emit)
}

const handleClick = (e, item, index) => {
  if(e){
    e.preventDefault()
  }
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
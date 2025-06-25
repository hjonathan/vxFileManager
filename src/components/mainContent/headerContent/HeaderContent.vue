<template>
  <nav class="shadow-sm sticky top-0 z-50 w-full mx-auto px-4">
      <div class="flex h-16 justify-between">
        <div ref="navbar" class="flex py-4 w-full overflow-x-auto navbar-scrollbar">
          <NavigationBar :fileManager="fileManager" @event="e => emit('event', e)" class="w-full overflow-x-auto" @wheel.prevent="wheelHandler"/>
        </div>
        <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
          <HeaderSearch class="w-60" @change="onChangeSearch" />
        </div>
        <div class="hidden lg:ml-4 lg:flex lg:items-center">

          <ButtonIcon @click="emit('event', { type: 'show-create-folder-modal' })">
            <FolderPlusIcon class="size-6" />
          </ButtonIcon>

          <ButtonIcon @click="emit('event', { type: 'show-upload-files-modal' })">
            <ArrowUpTrayIcon class="size-6" />
          </ButtonIcon>

          <ButtonIcon @click="emit('event', { type: 'refresh-folder' })">
            <ArrowPathIcon class="size-6" />
          </ButtonIcon>

          <ButtonIcon @click="emit('event', { type: 'toogle-view-mode' })">
            <ViewColumnsIcon class="size-6" :class="{ 'text-indigo-500': viewMode === 'grid' }" />
          </ButtonIcon>

          <ButtonIcon @click="emit('event', { type: 'toogle-preview-mode' })">
            <InformationCircleIcon class="size-6" :class="{ 'text-indigo-500': previewMode }" />
          </ButtonIcon>
        </div>
      </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { BellIcon, UserIcon, Cog6ToothIcon, ViewColumnsIcon, InformationCircleIcon, FolderPlusIcon, ArrowPathIcon, ArrowUpTrayIcon } from '@heroicons/vue/24/outline'
import HeaderSearch from './HeaderSearch.vue'
import ButtonIcon from './ButtonIcon.vue'
import NavigationBar from '../../navbar/NavigationBar.vue'

const emit = defineEmits(['event'])

const props = defineProps({
  fileManager: {
    type: Object,
    required: true
  }
})

const { viewMode, previewMode } = props.fileManager

const navbar = ref(null)

const onChangeSearch = (search) => {
  emit('event', { type: 'search', data: search })
}

const wheelHandler = (e) => {
  if (e.deltaY > 0) {
    e.currentTarget.scrollLeft += 20;
  } else {
    e.currentTarget.scrollLeft -= 20;
  }
}
</script>

<style>
.navbar-scrollbar {
  scrollbar-width:none;

  ::-webkit-scrollbar {
    width: 20px;
    height: 1px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
}
}
</style>
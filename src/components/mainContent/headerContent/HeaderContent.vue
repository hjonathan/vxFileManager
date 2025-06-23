<template>
  <nav class="bg-white shadow-sm sticky top-0 z-50">
    <div class="mx-auto px-4">
      <div class="flex h-16 justify-between">
        <div class="flex py-4">
          <NavigationBar :fileManager="fileManager" @event="e => emit('event', e)" />
        </div>
        <div class="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
          <HeaderSearch class="w-60" />
        </div>
        <div class="hidden lg:ml-4 lg:flex lg:items-center">
          <ButtonIcon @click="emit('event', { type: 'show-create-folder-modal' })">
            <FolderPlusIcon class="size-6" />
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
    </div>
  </nav>
</template>

<script setup>
import { BellIcon, UserIcon, Cog6ToothIcon, ViewColumnsIcon, InformationCircleIcon, FolderPlusIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
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
</script>
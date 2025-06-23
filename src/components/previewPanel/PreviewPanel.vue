<template>
  <!-- right-0 top-0 absolute // for floating panel -->
  <aside
    class="flex flex-col bg-white w-full h-full text-sm
       border-r border-black/10 transition-transform duration-300 ease-in-out overflow-hidden border-l border-gray-200">
    <header @click="isExpanded = !isExpanded"
      class="flex items-center justify-between border-b border-white/5 px-4 py-4 hover:cursor-pointer">
      <h2 class="text-base/7 font-semibold">
        Information
      </h2>
      <XMarkIcon class="size-5 flex-none" @click="onEvent({ type: 'close-preview-mode' })" />
    </header>


    <div v-if="selectedItem"  class="flex flex-1 flex-col items-center gap-y-4 h-full">
      <FolderIconVx  v-if="selectedItem.type == 'Directory'" class="size-40 flex-none" />
      <component v-else :is="componentsFactory[typeComputed]" :data="dataComputed" class="h-[50%]" />


      <dl class="mt-1 flex flex-col space-y-2  w-full px-4 font-medium text-gray-500">

        <span class="flex flex-col justify-start" v-if="selectedItem?.name">
          <span class="text-emerald-500">Name</span>
          <span>{{ selectedItem?.name }}</span>
        </span>

        <span class="flex flex-col justify-start" v-if="selectedItem?.appDocCreateDate">
          <span class="text-emerald-500">Updated at</span>
          <span>{{ selectedItem?.appDocCreateDate }}</span>
        </span>

        <span class="flex flex-col justify-start" v-if="selectedItem?.appDocTags">
          <span class="text-emerald-500">Tag</span>
          <span>{{ selectedItem?.appDocTags }}</span>
        </span>

        <span class="flex flex-col justify-start" v-if="selectedItem?.owner">
          <span class="text-emerald-500">Owner</span>
          <span>{{ selectedItem?.owner }}</span>
        </span>

        <span class="flex flex-col justify-start" v-if="selectedItem?.type">
          <span class="text-emerald-500">Type</span>
          <span>{{ selectedItem?.type }}</span>
        </span>
      </dl>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { FolderIconVx } from '../ui/icons/index'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import VxPdfViewer from './fileViewer/VxPdfViewer.vue'
import VxDocViewer from './fileViewer/VxDocViewer.vue'
import VxImageViewer from './fileViewer/VxImageViewer.vue'
import { urlFormat } from '../utils/urlFormat'

const emit = defineEmits(["event"]);

const props = defineProps({
  fileManager: {
    type: Object,
    required: true
  }
})

const componentsFactory = {
  'doc': VxDocViewer,
  'image': VxImageViewer,
  'pdf': VxPdfViewer,
}

const { selectedItem } = props.fileManager
const pdfFile = ref()
const docFile = ref()
const imageFile = ref()

const typeComputed = computed(() => {
  if (selectedItem?.value?.type === 'Directory') {
    return 'directory'
  } else if (selectedItem?.value?.type === 'PDF File') {
    return 'pdf'
  } else if (selectedItem?.value?.type === 'Word Document') {
    return 'doc'
  } else if (selectedItem?.value?.type === '**MIME_DES_JPEG**' || selectedItem?.value?.type === 'PNG Picture' || selectedItem?.value?.type === 'JPG Picture') {
    return 'image'
  }
})

const dataComputed = computed(() => {
  if (selectedItem?.value?.type === 'Directory') {
    return selectedItem.value
  } else if (selectedItem?.value?.type === 'PDF File') {
    return urlFormat(selectedItem.value.downloadLink)
  } else if (selectedItem?.value?.type === 'Word Document') {
    return urlFormat(selectedItem.value.downloadLink)
  } else if (selectedItem?.value?.type === '**MIME_DES_JPEG**' || selectedItem?.value?.type === 'PNG Picture' || selectedItem?.value?.type === 'JPG Picture') {
    return urlFormat(selectedItem.value.downloadLink)
  }
})

const onEvent = (event) => {
  emit('event', event)
}

</script>
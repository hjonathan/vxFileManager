<template>
  <!-- right-0 top-0 absolute // for floating panel -->
  <aside
    class="flex flex-col bg-white w-full h-full
       border-r border-black/10 transition-transform duration-300 ease-in-out overflow-hidden border-l border-gray-200">
    <header @click="isExpanded = !isExpanded"
      class="flex items-center justify-between border-b border-white/5 px-4 py-4 hover:cursor-pointer">
      <h2 class="text-base/7 font-semibold">
        Information
      </h2>
      <XMarkIcon class="size-5 flex-none" @click="onEvent({ type: 'close-preview-mode' })" />
    </header>

    <!-- <FolderPreview :data="data" /> -->

    <!-- <input type="file" @change="handleFileUpload" accept=".pdf" />
    <input type="file" @change="handleDocFileUpload" accept=".doc,.docx" />
    <input type="file" @change="handleImageFileUpload" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.ico,.webp" /> -->
    <!-- <VxDocViewer v-if="docFile" :docSource="docFile" class="h-[50%]" />
     
      <VxImageViewer v-if="imageFile" :imageSrc="imageFile" class="h-[50%]" /> -->

    <component v-if="previewItem" :is="componentsFactory[typeComputed]" :data="dataComputed" class="h-[50%]"/>

    <!-- <VxPdfViewer  :data="pdfFile" class="h-[50%]" /> -->

  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import FolderPreview from './previews/FolderPreview.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import VxPdfViewer from '../fileViewer/VxPdfViewer.vue'
import VxDocViewer from '../fileViewer/VxDocViewer.vue'
import VxImageViewer from '../fileViewer/VxImageViewer.vue'
import { urlFormat } from '../utils/urlFormat'

const emit = defineEmits(["event"]);

const props = defineProps({
  fileManager: {
    type: Object,
    required: true
  }
})

const componentsFactory = {
  'directory': FolderPreview,
  'doc': VxDocViewer,
  'image': VxImageViewer,
  'pdf': VxPdfViewer,
  // 'Audio': VxAudioViewer
}
console.log('previewItem', props.fileManager)

const { previewItem } = props.fileManager
const pdfFile = ref('http://localhost:8100/sysworkflow/en/lurana/cases/cases_ShowDocument?a=88922262668465b04bc71d7037241065&v=1&p=1')
const docFile = ref()
const imageFile = ref()

const typeComputed = computed(() => {
  console.log('previewItem TYPE', previewItem.value.type)
  if (previewItem?.value?.type === 'Directory') {
    return 'directory'
  } else if (previewItem?.value?.type === 'PDF File') {
    return 'pdf'
  } else if (previewItem?.value?.type === 'Word Document') {
    return 'doc'
  } else if (previewItem?.value?.type === '**MIME_DES_JPEG**' || previewItem?.value?.type === 'PNG Picture' || previewItem?.value?.type === 'JPG Picture') {
    return 'image'
  }
})

const dataComputed = computed(() => {
  if (previewItem?.value?.type === 'Directory') {
    return previewItem.value
  } else if (previewItem?.value?.type === 'PDF File') {
    console.log('previewItem.value.downloadLink', window.location.href + previewItem.value.downloadLink)
    return  urlFormat(previewItem.value.downloadLink)
  } else if (previewItem?.value?.type === 'Word Document') {
    return urlFormat(previewItem.value.downloadLink)
  } else if (previewItem?.value?.type === '**MIME_DES_JPEG**' || previewItem?.value?.type === 'PNG Picture' || previewItem?.value?.type === 'JPG Picture') {
    return urlFormat(previewItem.value.downloadLink)
  }
})

const handleDocFileUpload = async (event) => {
  const file = event.target.files[0];
  if (file) {
    const arrayBuffer = await file.arrayBuffer();
    docFile.value = new Uint8Array(arrayBuffer);
  }
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    pdfFile.value = URL.createObjectURL(file);
  }
};

const handleImageFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = [URL.createObjectURL(file)];
  }
};

const onEvent = (event) => {
  emit('event', event)
}

</script>
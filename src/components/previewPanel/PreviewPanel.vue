<template>
  <!-- right-0 top-0 absolute // for floating panel -->
  <aside
    class="flex flex-col bg-white  h-full
       border-r border-black/10 transition-transform duration-300 ease-in-out overflow-hidden border-l border-gray-200">
    <header @click="isExpanded = !isExpanded"
      class="flex items-center justify-between border-b border-white/5 px-4 py-4 hover:cursor-pointer">
      <h2 class="text-base/7 font-semibold">
        Information
      </h2>
      <XMarkIcon class="size-5 flex-none" @click="onEvent({ type: 'close-preview-mode' })" />
    </header>

    <!-- <FolderPreview :data="data" /> -->

    <input type="file" @change="handleFileUpload" accept=".pdf" />
    <input type="file" @change="handleDocFileUpload" accept=".doc,.docx" />
    <input type="file" @change="handleImageFileUpload" accept=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.ico,.webp" />
    <VxDocViewer v-if="docFile" :docSource="docFile" class="h-[50%]" />
    <VxPdfViewer v-if="pdfFile" :pdfSource="pdfFile" class="h-[50%]" />
    <VxImageViewer v-if="imageFile" :imageSrc="imageFile" class="h-[50%]" />

  </aside>
</template>

<script setup>
import { ref } from 'vue'
import FolderPreview from './previews/FolderPreview.vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import VxPdfViewer from '../fileViewer/VxPdfViewer.vue'
import VxDocViewer from '../fileViewer/VxDocViewer.vue'
import VxImageViewer from '../fileViewer/VxImageViewer.vue'

const emit = defineEmits(["event"]);

const data = ref({
  name: 'Folder 1',
  type: 'Folder',
  size: '100MB'
})

const pdfFile = ref()
const docFile = ref()
const imageFile = ref()

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
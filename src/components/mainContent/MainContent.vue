<template>
  <!-- Sticky search header -->
  <HeaderContent @event="onEvent" :fileManager="fileManager" />

  <main class="flex w-full relative h-full overflow-hidden">
    <div class="w-full h-full overflow-scroll">
      <StackedList :data="data" class="h-full w-full" v-if="viewMode === 'stacked'" v-model:selectMode="selectMode"
        @event="onEvent" />
      <GridView class="w-full p-4" v-if="viewMode === 'grid'" v-model:selectMode="selectMode" :data="data" @event="onEvent" />
    </div>
    <ResizablePanel v-if="previewItem && previewMode" class="flex relative">
      <PreviewPanel @event="onEvent" :fileManager="fileManager" :previewMode="previewMode" />
    </ResizablePanel>

  </main>
</template>

<script setup>
import { ref } from "vue";
import GridView from "./gridView/GridView.vue";
import HeaderContent from "./headerContent/HeaderContent.vue";
import StackedList from "./stackedList/StackedList.vue";
import { ContentType, FolderType } from "../../mainHandler/types";
import PreviewPanel from "../previewPanel/PreviewPanel.vue";
import ResizablePanel from "../previewPanel/ResizablePanel.vue";

const emit = defineEmits(["event"]);
const props = defineProps({
  data: {
    type: Array,
    required: true,
    props: [ContentType, FolderType],
  },
  fileManager: {
    type: Object,
    required: true,
  },
});

const { viewMode, previewMode, previewItem } = props.fileManager;
const isExpanded = ref(false);

const pdfFile = ref(null);

const docFile = ref(null);

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

const selectMode = ref(false);

const onEvent = (event) => {
  emit("event", event);
};
</script>

<style scoped></style>

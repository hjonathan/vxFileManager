<template>
  <!-- Sticky search header -->
  <HeaderContent
    @event="onEvent"
    :fileManager="fileManager" />

  <main class="w-full relative h-full">
    <StackedList
      :data="data"
      class="h-full w-full"
      v-if="viewMode === 'stacked'"
      v-model:selectMode="selectMode"
      @event="onEvent" />
    <GridView
      class="h-full w-full p-4"
      v-if="viewMode === 'grid'"
      v-model:selectMode="selectMode"
      :data="data"
      />
    <aside
      class="flex flex-col bg-black/10 absolute h-full right-0 top-0"
      :class="{ 'w-96': previewMode, 'w-0': !previewMode }">
      <header
        @click="isExpanded = !isExpanded"
        class="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8 hover:cursor-pointer">
        <h2
          v-if="isExpanded"
          class="text-base/7 font-semibold">
          Activity feed
        </h2>
        <button class="text-sm/6 font-semibold text-indigo-400">
          <svg
            class="h-5 w-5"
            :class="{ 'rotate-180': !isExpanded }"
            viewBox="0 0 20 20"
            fill="currentColor">
            <path
              fill-rule="evenodd"
              d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </header>

      <!-- <div v-if="isExpanded">
      <div>
        <input type="file" @change="handleDocFileUpload" accept=".doc,.docx" />
        <VxDocViewer v-if="docFile" :docSource="docFile" />
      </div>
    </div> -->
    </aside>
  </main>

  <!-- Activity feed -->
  <!-- <aside
    class="bg-black/10 lg:fixed lg:top-16 lg:right-0 lg:bottom-0 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5"
    :class="{ 'lg:w-96': previewMode, 'lg:w-0': !previewMode }"
  > -->
</template>

<script setup>
import { ref } from "vue";
import GridView from "./gridView/GridView.vue";
import HeaderContent from "./headerContent/HeaderContent.vue";
import StackedList from "./stackedList/StackedList.vue";
import { ContentType, FolderType } from "../../mainHandler/types";
import VxDocViewer from "../docViewer/VxDocViewer.vue";

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

const { viewMode, previewMode } = props.fileManager;
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
  console.log("onEvent", event);
  emit("event", event);
};
</script>

<style scoped></style>

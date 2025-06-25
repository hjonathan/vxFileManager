<template>
  <HeaderContent @event="onEvent" :fileManager="fileManager" class="w-full overflow-hidden" />
  <main class="flex w-full relative h-full overflow-hidden">
    <div 
      ref="scrollContainer" 
      class=" flex flex-col w-full h-full overflow-y-auto"
      @scroll="handleScroll">
      <StackedList v-model:data="data" class="w-full h-full" v-if="viewMode === 'stacked'" v-model:selectMode="selectMode"
        @event="onEvent" />
      <GridView v-model:data="data" class="w-full h-full p-4" v-if="viewMode === 'grid'" v-model:selectMode="selectMode" @event="onEvent" />
      <!-- Elemento sentinela para detectar cuando llegamos al final -->
      <div ref="sentinel" class="h-1 w-full"></div>
    </div>
    <ResizablePanel v-if="selectedItem && previewMode" class="flex relative" :w="1000" :minw="200" :maxw="1500">
      <PreviewPanel @event="onEvent" :fileManager="fileManager" :previewMode="previewMode" />
    </ResizablePanel>
    <ContextualMenu
      v-if="showContextMenu"
      :event="event"
      @item-click="e=>handleMenuItemClick(e, emit, itemContextMenu)"
      @close="hideMenu"
      :menu-items="menuOptionsBuilder(itemContextMenu)" />
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import GridView from "./gridView/GridView.vue";
import HeaderContent from "./headerContent/HeaderContent.vue";
import StackedList from "./stackedList/StackedList.vue";
import { ContentType, FolderType } from "../../mainHandler/types";
import PreviewPanel from "../previewPanel/PreviewPanel.vue";
import ResizablePanel from "../previewPanel/ResizablePanel.vue";

const emit = defineEmits(["event"]);
const props = defineProps({
  fileManager: {
    type: Object,
    required: true,
  },
});

const data = defineModel('data', {
  type: Array,
  required: true,
  props: [ContentType, FolderType],
});

const { viewMode, previewMode, selectedItem } = props.fileManager;
const showContextMenu = ref(false);
const selectMode = ref(false);
const scrollContainer = ref(null);
const sentinel = ref(null);
const isLoading = ref(false);

// Función que se ejecuta cuando el scroll llega al final
const onScrollToBottom = () => {
  emit("event", { type: "load-more" });
};

// Función para manejar el scroll del contenedor
const handleScroll = (event) => {
  return;
  const { scrollTop, scrollHeight, clientHeight } = event.target;
  // Mantener un registro de la posición anterior del scroll
  const lastScrollTop = event.target.lastScrollTop || 0;
  
  // Determinar la dirección del scroll
  const isScrollingDown = scrollTop > lastScrollTop;
  
  // Actualizar la última posición conocida
  event.target.lastScrollTop = scrollTop;

  // Solo continuar si el scroll va hacia abajo
  if (!isScrollingDown) {
    return;
  }
  
  // Detectar cuando está cerca del final (con un margen de 50px)
  const isNearBottom = scrollTop + clientHeight >= scrollHeight - 50;
  
  if (isNearBottom && !isLoading.value) {
    console.log('Scroll detectado cerca del final');
    isLoading.value = true;
    onScrollToBottom();
    
    // Resetear el flag después de un tiempo para evitar múltiples llamadas
    setTimeout(() => {
      isLoading.value = false;
      console.log('Flag reset - puede cargar más elementos de nuevo');
    }, 2000); // 2 segundos de cooldown
  }
};

const onEvent = (event) => {
  emit("event", event);
};
</script>
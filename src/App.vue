<template>
  <div class="flex h-full w-full">
    <ResizablePanel class="flex relative border-r border-gray-200" position="left" :w="300" :minw="200" :maxw="400">
      <Sidebar :key="keyRefresh" @event="onEvent" v-model:data="dataNavigator" />
    </ResizablePanel>

    <div class="flex flex-col h-full w-full overflow-hidden">
      <MainContent :key="keyRefresh" class="w-full h-full relative overflow-hidden" v-model:data="dataContentMain"
        @event="onEvent" :fileManager="fileManager" />
    </div>
    <ModalFileManager v-model="showModal" :type="modalType" @event="onEvent" />
  </div>
</template>

<script setup>
import { provide, ref, onMounted, nextTick } from 'vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import MainContent from './components/mainContent/MainContent.vue'
import { expandHomeHandler, getFolderContent, deleteItemRequest, createFolderRequest, uploadFilesRequest, searchRequest } from './mainHandler/folderHandler'
import { useFileManager } from './components/composable/FileManager'
import ResizablePanel from './components/previewPanel/ResizablePanel.vue'
import ModalFileManager from './components/modals/ModalFileManager.vue'

//Variables
const dataContentMain = ref([])
const dataNavigator = ref([])
const fileManager = useFileManager()
const keyRefresh = ref(0)

const showModal = ref(false)
const modalType = ref(null)

const closeModal = () => {
  showModal.value = false
}

const updateNavigator = async () => {
  const response = await expandHomeHandler()
  dataNavigator.value = response
}

const updateContentMain = async (event) => {
  const response = await getFolderContent(event?.data?.value)
  dataContentMain.value = response.items
}

const refreshNavigator = async () => {
  await updateNavigator()
  await updateContentMain()

  // Update the key to refresh the components
  keyRefresh.value++
}

const refreshCurrentFolder = async () => {
  const currentFolder = fileManager.getLastHistory()
  await updateDataContentMain(currentFolder)
}

const updateDataContentMain = async (itemSelected) => {
  const response = await getFolderContent(itemSelected)
  dataContentMain.value = response.items
}

const updateCurrentItem = (itemSelected) => {
  // Update the last item
  const currentItem = fileManager.getCurrentItem();

  fileManager.setLastItem(currentItem)
  fileManager.setCurrentItem(itemSelected)
}

/**
 * Click on a folder to get the content
 * @param {*} event ref variable (Its necessary to use .value to get the value of the ref)
 */
const onClickGetContent = async (event) => {
  const itemSelected = fileManager.getSelectedItem()
  await updateDataContentMain(itemSelected)
  updateCurrentItem(itemSelected)

  // Update the navigator history
  fileManager.goTo(itemSelected)
  activateItemInNavigator(dataNavigator.value, itemSelected);
}

/**
 * Find the item in the children and deactivate the other items
 * @param items - The items to search in
 * @param itemSelected - The item to search for
 * @returns The item if found, otherwise null
 */

const activateItemInNavigator = (items, itemSelected) => {
  for (const item of items) {
    // Set active to false for all items first
    item.active = false;

    // If this is the selected item, set it to active
    if (item.id === itemSelected?.id) {
      item.active = true;
    }

    // Recursively process children if they exist
    if (item.children?.length) {
      activateItemInNavigator(item.children, itemSelected);
    }
  }
  return null;
}

const goToDirectory = async (event) => {
  fileManager.setPreviewMode(false)
  const itemSelected = event.data?.value ?? event.data

  await updateDataContentMain(itemSelected)
  updateCurrentItem(itemSelected)

  // Update the navigator history
  fileManager.goTo(itemSelected)
  activateItemInNavigator(dataNavigator.value, itemSelected);
}

const onClickExpandFolder = (event) => {
  const itemSelected = fileManager.getLastHistory()

  nextTick(() => {
    activateItemInNavigator(dataNavigator.value, itemSelected);
  })
}

const showDeleteItemModal = async (event) => {
  modalType.value = 'delete-item'
  nextTick(() => {
    showModal.value = true
  })
}

const deleteItem = async (event) => {
  const itemSelected = fileManager.getSelectedItem()
  const folderPath = fileManager.getLastHistory()

  deleteItemRequest({
    item: itemSelected,
    folderPath: folderPath
  })
  fileManager.setSelectedItem(null)
  showModal.value = false

  // Refresh the current folder
  refreshCurrentFolder()
}

const showCreateFolderModal = async (event) => {
  modalType.value = 'create-folder'

  nextTick(() => {
    showModal.value = true
  })
}

const createFolder = async (event) => {
  const currentFolder = fileManager.getLastHistory()

  const response = await createFolderRequest({
    folderId: currentFolder ? currentFolder.id : 'root',
    folderPath: fileManager.getCurrentPath(),
    folderParentId: currentFolder ? currentFolder.id : '/',
    folderName: event.data.value
  })
  showModal.value = false

  // Refresh the current folder
  refreshCurrentFolder()
}

const showUploadFilesModal = () => {
  modalType.value = 'upload-files'

  nextTick(() => {
    showModal.value = true
  })
}

const uploadFiles = async (event) => {
  const currentFolder = fileManager.getLastHistory()
  const response = await uploadFilesRequest({
    folderId: currentFolder ? currentFolder.id : 'root',
    files: event.data
  })

  showModal.value = false

  // Refresh the current folder
  refreshCurrentFolder()
}

const downloadFile = async (event) => {
  const itemSelected = fileManager.getSelectedItem()
  const origin = window.location.origin
  const pathname = window.location.pathname.split('/').slice(0, -2).join('/')
  const downloadLink = itemSelected.downloadLink.split('/').slice(1).join('/')
  const url = origin+ pathname + "/" + downloadLink
  
  fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const blobUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = itemSelected.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(blobUrl)
    })
}

const search = async (event) => {
  const currentFolder = fileManager.getLastHistory()
  const search = event.data
  const response = await searchRequest({search, folderId: currentFolder ? currentFolder.id : 'root'})

  dataContentMain.value = response.items
}

const selectItem = (event) => {
  deselectItem()
  const itemSelected = event.data
  itemSelected.selected = true
  fileManager.setSelectedItem(itemSelected)
}

const deselectItem = () => {
  const itemSelected = fileManager.getSelectedItem()
  if (itemSelected) {
    itemSelected.selected = false
  }
  fileManager.setSelectedItem(null)
}

const events = {
  'expand-folder': onClickExpandFolder,
  'show-delete-item-modal': showDeleteItemModal,
  'show-create-folder-modal': showCreateFolderModal,
  'show-upload-files-modal': showUploadFilesModal,
  'get-content': onClickGetContent,
  'toogle-view-mode': fileManager.toogleViewMode,
  'toogle-preview-mode': fileManager.tooglePreviewMode,
  'refresh-navigator': refreshNavigator,
  'close-preview-mode': () => fileManager.setPreviewMode(false),
  'open-preview-mode': () => {fileManager.setPreviewMode(true)},
  'go-to-directory': goToDirectory,
  'close-modal': closeModal,
  'delete-item': deleteItem,
  'create-folder': createFolder,
  'refresh-folder': refreshCurrentFolder,
  'upload-files': uploadFiles,
  'download-file': downloadFile,
  'search': search,
  'select-item': selectItem,
  'deselect-item': deselectItem
}

const onEvent = (event) => {
  events[event.type](event)
}

provide('provider', {
  expandHomeHandler: expandHomeHandler,
  getFolderContent: getFolderContent
})

onMounted(async () => {
  await updateNavigator()
  await updateContentMain()
})
</script>

<style>
.theme-svg-primary {
    fill: #4dbbff;
    stroke: #4dbbff;
}

.theme-text-primary {
    color: #4dbbff;
}

.theme-item-selected {
  background-color: #009dffac;
}
</style>
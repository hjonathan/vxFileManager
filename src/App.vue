<template>
  <div class="flex h-full w-full">
    <div class="relative z-50 xl:hidden" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>

      <div class="fixed inset-0 flex">
        <div class="relative mr-16 flex w-full max-w-xs flex-1">
          <div class="absolute top-0 left-full flex w-16 justify-center pt-5">
            <button type="button" class="-m-2.5 p-2.5">
              <span class="sr-only">Close sidebar</span>
              <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                aria-hidden="true" data-slot="icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Sidebar component, swap this element with another sidebar if you like -->
          <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
            <div class="flex h-16 shrink-0 items-center">
              <img class="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="Your Company">
            </div>
            <nav class="flex flex-1 flex-col">
              <ul role="list" class="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" class="-mx-2 space-y-1">
                    <li>
                      <!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
                      <a href="#"
                        class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
                        <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" aria-hidden="true" data-slot="icon">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                        </svg>
                        Projects
                      </a>
                    </li>
                    <li>
                      <a href="#"
                        class="group flex gap-x-3 rounded-md bg-gray-800 p-2 text-sm/6 font-semibold text-white">
                        <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" aria-hidden="true" data-slot="icon">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M21.75 17.25v-.228a4.5 4.5 0 0 0-.12-1.03l-2.268-9.64a3.375 3.375 0 0 0-3.285-2.602H7.923a3.375 3.375 0 0 0-3.285 2.602l-2.268 9.64a4.5 4.5 0 0 0-.12 1.03v.228m19.5 0a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3m19.5 0a3 3 0 0 0-3-3H5.25a3 3 0 0 0-3 3m16.5 0h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Z" />
                        </svg>
                        Deployments
                      </a>
                    </li>
                    <li>
                      <a href="#"
                        class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
                        <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" aria-hidden="true" data-slot="icon">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                        Activity
                      </a>
                    </li>
                    <li>
                      <a href="#"
                        class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
                        <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" aria-hidden="true" data-slot="icon">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                        </svg>
                        Domains
                      </a>
                    </li>
                    <li>
                      <a href="#"
                        class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
                        <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" aria-hidden="true" data-slot="icon">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
                        </svg>
                        Usage
                      </a>
                    </li>
                    <li>
                      <a href="#"
                        class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
                        <svg class="size-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                          stroke="currentColor" aria-hidden="true" data-slot="icon">
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                          <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        Settings
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <div class="text-xs/6 font-semibold text-gray-400">Your teams</div>
                  <ul role="list" class="-mx-2 mt-2 space-y-1">
                    <li>
                      <!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
                      <a href="#"
                        class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
                        <span
                          class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">P</span>
                        <span class="truncate">Planetaria</span>
                      </a>
                    </li>
                    <li>
                      <a href="#"
                        class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
                        <span
                          class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">P</span>
                        <span class="truncate">Protocol</span>
                      </a>
                    </li>
                    <li>
                      <a href="#"
                        class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-gray-400 hover:bg-gray-800 hover:text-white">
                        <span
                          class="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">T</span>
                        <span class="truncate">Tailwind Labs</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="-mx-6 mt-auto">
                  <a href="#"
                    class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800">
                    <img class="size-8 rounded-full bg-gray-800"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="">
                    <span class="sr-only">Your profile</span>
                    <span aria-hidden="true">Tom Cook</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
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
import { expandHomeHandler, getFolderContent, deleteFolderRequest, createFolderRequest } from './mainHandler/folderHandler'
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
  console.log("refreshCurrentFolder", currentFolder)
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
  const itemSelected = event.data?.value ?? event.data

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
  await onClickGetContent(event);

  activateItemInNavigator(dataNavigator.value, itemSelected);
}

const onClickExpandFolder = (event) => {
  const itemSelected = fileManager.getLastHistory()

  nextTick(() => {
    activateItemInNavigator(dataNavigator.value, itemSelected);
  })
}

const showDeleteFolderModal = async (event) => {
  modalType.value = 'delete-folder'
  fileManager.setSelectedItem(event.data)  
  nextTick(() => {
    showModal.value = true
  })
}

const deleteFolder = async (event) => {
  const itemSelected = fileManager.getSelectedItem()
  deleteFolderRequest(itemSelected)
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
    folderId: currentFolder? currentFolder.id : 'root',
    folderPath: fileManager.getCurrentPath(),
    folderParentId: currentFolder? currentFolder.id : '/',
    folderName: event.data.value
  })
  showModal.value = false

  // Refresh the current folder
  refreshCurrentFolder()
}

const events = {
  'expand-folder': onClickExpandFolder,
  'show-delete-folder-modal': showDeleteFolderModal,
  'show-create-folder-modal': showCreateFolderModal,
  'get-content': onClickGetContent,
  'toogle-view-mode': fileManager.toogleViewMode,
  'toogle-preview-mode': fileManager.tooglePreviewMode,
  'refresh-navigator': refreshNavigator,
  'close-preview-mode': () => fileManager.setPreviewMode(false),
  'open-preview-mode': (event) => {
    fileManager.setPreviewMode(true)
    fileManager.setSelectedItem(event.data)
  },
  'go-to-directory': goToDirectory,
  'close-modal': closeModal,
  'delete-folder': deleteFolder,
  'create-folder': createFolder,
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
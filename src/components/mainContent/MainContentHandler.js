import { fileMenu, directoryMenu, contentMainMenu } from './ContextualMenu'

export const menuOptionsBuilder = (item) => {
  if (!item) {
    return []
  }
  if (item.type === 'Directory') {
    return directoryMenu()
  }
  if (item.type === 'content-main') {
    return contentMainMenu()
  }
  else {
    return fileMenu()
  }
}

export const openDirectory = (emit, item) => {
  emit('event', {
    type: 'get-content',
    data: item,
  })
  emit('event', {
    type: 'close-preview-mode',
  })
}

export const deleteItem = (emit, item) => {
  emit('event', {
    type: 'show-delete-item-modal',
    data: item,
  })
}

export const openPreviewMode = (emit, item) => {
  emit('event', {
    type: 'open-preview-mode',
    data: item
  })
}

export const createFolder = (emit, item) => {
  emit('event', {
    type: 'show-create-folder-modal',
    data: item
  })
}

export const refreshCurrentFolder = (emit, item) => {
  emit('event', {
    type: 'refresh-folder',
  })
}

export const showUploadFilesModal = (emit, item) => {
  emit('event', {
    type: 'show-upload-files-modal',
  })
}

export const downloadFile = (emit, item) => {
  emit('event', {
    type: 'download-file',
    data: item
  })
}

const handlerContextualMenu = {
  open: openDirectory,
  delete: deleteItem,
  information: openPreviewMode,
  'create-folder': createFolder,
  'refresh-folder': refreshCurrentFolder,
  'upload-files': showUploadFilesModal,
  download: downloadFile,
}

export const handleMenuItemClick = (menuOption, emit, item) => {
  handlerContextualMenu[menuOption.id](emit, item)
}
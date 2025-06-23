import { fileMenu, directoryMenu, contentMainMenu } from '../config/ContextualMenu'

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

const handler = {
  open: openDirectory,
  delete: deleteItem,
  information: openPreviewMode,
  'create-folder': createFolder,
}

export const handleMenuItemClick = (menuOption, emit, item) => {
  handler[menuOption.id](emit, item)
}
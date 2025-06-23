export const deleteItemModalConfig = (emit)=>{
  return {
    type: 'delete-item',
    title: 'Delete',
    description: 'Do you want to deleted selected(1) items?',
    buttonLabel: 'Delete',
    buttonCancelLabel: 'Cancel',
    buttonHandler: (emit)=>{
      emit('event', {
        type: 'delete-item'
      })
    },
    buttonCancelHandler: (emit)=>{
      emit('event', {
        type: 'close-modal'
      })
    },
  }
}

export const createFolderModalConfig = (emit)=>{
  return {
    type: 'create-folder',
    title: 'Create Folder',
    buttonLabel: 'Create',
    buttonCancelLabel: 'Cancel',
    buttonHandler: (emit, data)=>{
      emit('event', {
        type: 'create-folder',
        data: data
      })
    },
    buttonCancelHandler: (emit)=>{
      emit('event', {
        type: 'close-modal'
      })
    },
  }
}

export const uploadFilesModalConfig = (emit)=>{
  return {
    type: 'upload-files',
    title: 'Upload Files',
    buttonLabel: 'Upload',
    buttonCancelLabel: 'Cancel',
    buttonHandler: (emit, data)=>{
      emit('event', {
        type: 'upload-files',
        data
      })
    },
    buttonCancelHandler: (emit)=>{
      emit('event', {
        type: 'close-modal'
      })
    },
  }
}

const config = {
  'delete-item': deleteItemModalConfig,
  'create-folder': createFolderModalConfig,
  'upload-files':uploadFilesModalConfig
}

export const modalConfigBuilder = (modalType)=>{
  if(config[modalType]){  
    return config[modalType]()
  }
  return null
}
export const deleteFolderModal = (emit)=>{
  return {
    type: 'delete-folder',
    title: 'Delete Folder',
    description: 'Do you want to deleted selected(1) items?',
    buttonLabel: 'Delete',
    buttonCancelLabel: 'Cancel',
    buttonHandler: (emit)=>{
      emit('event', {
        type: 'delete-folder'
      })
    },
    buttonCancelHandler: (emit)=>{
      emit('event', {
        type: 'close-modal'
      })
    },
  }
}

export const createFolderModal = (emit)=>{
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

const config = {
  'delete-folder': deleteFolderModal,
  'create-folder': createFolderModal
}

export const modalConfigBuilder = (modalType)=>{
  if(config[modalType]){  
    return config[modalType]()
  }
  return null
}
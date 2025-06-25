import { $t } from '../config/globalVariables'

export const deleteItemModalConfig = (emit)=>{
  return {
    type: 'delete-item',
    title: $t('ID_DELETE'),
    description: $t('ID_DELETE_DESCRIPTION'),
    buttonLabel: $t('ID_DELETE'),
    buttonCancelLabel: $t('ID_CANCEL'),
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
    title: $t('ID_CREATE_FOLDER'),
    buttonLabel: $t('ID_CREATE'),
    buttonCancelLabel: $t('ID_CANCEL'),
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
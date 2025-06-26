import { $t } from '../config/globalVariables'

export const directoryMenu =  ()=> {
  return [
    { 
      id: 'open',
      label: $t('ID_OPEN'),
    },
    { 
      id: 'delete',
      label: $t('ID_DELETE'),
    },
    { 
      id: 'information',
      label: $t('ID_INFORMATION'),
    },
    { 
      id: 'move',
      label: $t('ID_MOVE'),
    },
  ]
}

export const contentMainMenu =  ()=> {
  return [
    { 
      id: 'create-folder',
      label: $t('ID_CREATE_FOLDER'),
    },
    {   
      id: 'refresh-folder',
      label: $t('ID_REFRESH_LABEL'),
    },
    { 
      id: 'upload-files',
      label: $t('ID_UPLOAD'),
    },
  ]
}

export const fileMenu =  ()=> {
  return [
    { 
      id: 'information',
      label: $t('ID_INFORMATION'),
    },
    { 
      id: 'download',
      label: $t('ID_DOWNLOAD'),
    },
    { 
      id: 'delete',
      label: $t('ID_DELETE'),
    },
  ]
}
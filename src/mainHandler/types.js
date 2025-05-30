export const FolderType = {
  id: String,
  uuid: String,
  name: String,
  type: String, // folder or file
  isFile: Boolean,
  createAt: String,
  writable: Boolean,
  chmodable: Boolean,
  readable: Boolean,
  deletable: Boolean,
};

export const FolderSourcResponse = {
  id: String,
  folderID: String,
  text: String,// Notused
  cls: String, // Not used
  draggable: Boolean, // Not used
  name: String,
  type: String,
  is_file: Boolean,
  appDocCreateDate: String,
  qtip: String, // Not used
  is_writable: Boolean,
  is_chmodable: Boolean,
  is_readable: Boolean,
  is_deletable: Boolean,
}

// {
//     "text": "Proceso de Créditos",
//     "id": "48549865067f0b56a524912018348299",
//     "folderID": "48549865067f0b56a524912018348299",
//     "cls": "folder",
//     "draggable": true,
//     "name": "Proceso de Créditos",
//     "type": "Directory",
//     "is_file": false,
//     "appDocCreateDate": "2025-04-05 00:45:30",
//     "qtip": "<strong>Directory: </strong>Proceso de Créditos<br /><strong>Create Date:</strong> 2025-04-05 00:45:30",
//     "is_writable": true,
//     "is_chmodable": true,
//     "is_readable": true,
//     "is_deletable": true
// }

export const mapFolderSourceToFolderType = (sourceArray) => {
  return sourceArray.map(source => {
    return {
      id: source.id,
      uuid: source.folderID,
      name: source.name,
      type: source.type,
      isFile: source.is_file,
      createAt: source.appDocCreateDate,
      writable: source.is_writable,
      chmodable: source.is_chmodable,
      readable: source.is_readable,
      deletable: source.is_deletable
    }
  })
};
export const FolderType = {
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


export const ContentType = {
    text: String,
    name: String,
    type: String,
    icon: String,
    appdocid: String,
    id: String,
    cls: String,
    leaf: Boolean,
    is_file: Boolean,
    docVersion: Number,
    appUid: String,
    usrUid: String,
    appDocType: String,
    appDocCreateDate: String,
    appDocPlugin: String,
    appDocTags: String,
    appDocTitle: String,
    qtip: String,
    appDocComment: String,
    appDocFileName: String,
    appLabel: String,
    proTitle: String,
    appDocVersionable: Number,
    owner: String,
    owner_firstname: String,
    owner_lastname: String,
    deletelabel: String,
    downloadLabelDOWNLOAD: String,
    downloadLinkDOWNLOAD: String,
    downloadLabel: String,
    downloadLink: String,
    downloadLabel1: String,
    downloadLink1: String,
    appDocUidVersion: String,
    is_readable: Boolean,
    outDocGenerate: String
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
  return sourceArray
};

export const mapContentSourceToContentType = (sourceArray) => {
  return sourceArray;
};


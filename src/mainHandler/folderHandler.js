import { generateRandomEntries } from './randomDataGenerator';
import { generateRandomContent } from './randomContentGenerator';
import { mapFolderSourceToFolderType, mapContentSourceToContentType } from './types';
import { getFolders } from '../api';

export const expandHomeHandler = async (event) => {
  // const folderContents = generateRandomEntries(10, 0.5);
  // return mapFolderSourceToFolderType(folderContents);

  const params = new URLSearchParams();
  params.append('action', 'expandNode');
  params.append('sendWhat', 'dirs');
  params.append('renderTree', '1');
  params.append('node', !event ? 'root' : event.data.id);

  const folders = await getFolders({ params });
  return folders;
};

export const getFolderContent = async (data) => {
  const params = new URLSearchParams();
  params.append('start', '0');
  params.append('limit', '25');
  params.append('dir', !data ? 'root' : data.id);
  params.append('node', !data ? 'root' : data.id);
  params.append('option', 'gridDocuments');
  params.append('action', 'expandNode');
  params.append('sendWhat', 'both');


  const content = await getFolders({ params });
  return content;

};

export const getFilesHandler = async (event) => {

  const params = new URLSearchParams();
  params.append('start', '0');
  params.append('limit', '25');
  params.append('dir', !event ? 'root' : event.data.id);
  params.append('node', !event ? 'root' : event.data.id);
  params.append('option', 'gridDocuments');
  params.append('action', 'expandNode');
  params.append('sendWhat', 'files');

  const files = await getFolders({ params });
  return files;
};

export const deleteItemRequest = async ({ item, folderPath }) => {
  const params = new URLSearchParams();
  params.append('option', item.type === 'Directory' ? 'directory' : 'documents');
  params.append('dir', folderPath ? folderPath.id : 'root');
  params.append('item', item.id);
  params.append('selitems[]', item.id);
  params.append('action', 'delete');

  const response = await getFolders({ params });
  return response;
}

export const createFolderRequest = async ({
  folderPath,
  folderId,
  folderParentId,
  folderName
}) => {
  const params = new URLSearchParams();
  params.append('option', 'new');
  params.append('action', 'appFolderSave');
  params.append('dir', folderId);
  params.append('confirm', 'true');
  params.append('FOLDER_PATH', folderPath);
  // params.append('form[FOLDER_UID]', id);
  params.append('form[FOLDER_PARENT_UID]', folderParentId);
  params.append('form[FOLDER_NAME]', folderName);

  const response = await getFolders({ params });
  return response;
}


export const uploadFilesRequest = async ({
  folderId,
  files
}) => {
  const formData = new FormData();

  for (const file of files) {
    formData.append('uploadedFile[]', file);
  }

  formData.append('overwrite_files', 'on');
  formData.append('option', 'standardupload');
  formData.append('action', 'uploadExternalDocument');
  formData.append('dir', folderId);

  formData.append('requestType', 'xmlhttprequest');
  formData.append('confirm', 'true');
  formData.append('docUid', '-1');
  formData.append('appId', '00000000000000000000000000000000');

  const response = await getFolders({ params: formData, multipart: true });
  return response;
}

export const searchRequest = async ({search, folderId}) => {
  const params = new URLSearchParams();
  params.append('start', '0');
  params.append('limit', '25');
  params.append('dir', folderId);
  params.append('node', folderId);
  params.append('option', 'gridDocuments');
  params.append('sendWhat', 'both');
  params.append('action', 'expandNode');
  params.append('search', search);

  const response = await getFolders({ params });
  return response;
}
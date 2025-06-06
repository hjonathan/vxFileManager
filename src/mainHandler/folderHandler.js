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
  
  const folders = await getFolders({params});
  return folders;
};

export const getFolderHandler = async (event) => {
  console.log('getFolderHandler', event)

  const [folders, files] = await Promise.all([
    expandHomeHandler(event),
    getFilesHandler(event)
  ]);

  console.log('folders', folders)
  console.log('files', files)

  return [...folders, ...files.items]

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

  const files = await getFolders({params});
  return files;
};

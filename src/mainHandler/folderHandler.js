import { generateRandomEntries } from './randomDataGenerator';
import { generateRandomContent } from './randomContentGenerator';
import { mapFolderSourceToFolderType, mapContentSourceToContentType } from './types';

export const expandHomeHandler = (event) => {
  const folderContents = generateRandomEntries(10, 0.5);
  return mapFolderSourceToFolderType(folderContents);
};

export const getFolderHandler = (event) => {
  const randomCount = Math.floor(Math.random() * 10) + 1;
  const contents = generateRandomContent(randomCount);
  const folderContents = generateRandomEntries(10, 0.5);
  const arrayGlobal = [...folderContents, ...contents]
  return mapContentSourceToContentType(arrayGlobal);

};
